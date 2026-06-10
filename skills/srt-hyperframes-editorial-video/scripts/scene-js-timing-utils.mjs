const TIMELINE_METHODS = new Map([
  ["to", 2],
  ["from", 2],
  ["fromTo", 3],
  ["set", 2],
  ["call", 2],
  ["add", 1],
  ["addLabel", 1],
]);

function lineNumberAt(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function findMatchingParen(source, openIndex) {
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "/" && next === "/") {
      const end = source.indexOf("\n", index + 2);
      if (end === -1) return -1;
      index = end;
      continue;
    }

    if (char === "/" && next === "*") {
      const end = source.indexOf("*/", index + 2);
      if (end === -1) return -1;
      index = end + 1;
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}

function splitTopLevelArgs(argsSource) {
  const args = [];
  let start = 0;
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = 0; index < argsSource.length; index += 1) {
    const char = argsSource[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "(" || char === "[" || char === "{") depth += 1;
    if (char === ")" || char === "]" || char === "}") depth -= 1;
    if (char === "," && depth === 0) {
      args.push(argsSource.slice(start, index).trim());
      start = index + 1;
    }
  }

  const finalArg = argsSource.slice(start).trim();
  if (finalArg) args.push(finalArg);
  return args;
}

function isAllowedScenePosition(position) {
  return /^at\s*\(/.test(position) || /^cue\s*\(/.test(position);
}

function isNumericPosition(position) {
  return /^["']?\d+(?:\.\d+)?["']?$/.test(position);
}

function parseScenePosition(position) {
  const atMatch = position.match(/^at\s*\(\s*(\d+(?:\.\d+)?)\s*\)/);
  if (atMatch) {
    return { type: "at", ms: Number(atMatch[1]) };
  }

  const cueMatch = position.match(/^cue\s*\(\s*(\d+)\s*(?:,\s*(-?\d+(?:\.\d+)?))?\s*\)/);
  if (cueMatch) {
    return {
      type: "cue",
      index: Number(cueMatch[1]),
      offsetMs: cueMatch[2] === undefined ? 0 : Number(cueMatch[2]),
    };
  }

  return null;
}

function extractScopedSelector(targetArg) {
  const match = targetArg.match(/^q\s*\(\s*([`"'])(.*?)\1\s*\)$/s);
  return match ? match[2] : null;
}

const STATE_PROPS = ["opacity", "autoAlpha", "color", "borderColor", "backgroundColor", "scale", "scaleX", "scaleY", "x", "y"];
const ENTRANCE_STATE_PROPS = ["opacity", "autoAlpha", "scale", "scaleX", "scaleY", "x", "y"];

function extractTweenProps(propsArg, propNames = STATE_PROPS) {
  const tracked = new Set();
  for (const prop of propNames) {
    const pattern = new RegExp(`\\b${prop}\\s*:`);
    if (pattern.test(propsArg)) tracked.add(prop);
  }
  return tracked;
}

function collectStateTweens(source) {
  const tweens = [];
  const callPattern = /\btl\.(to|from|fromTo|set)\s*\(/g;
  let match;

  while ((match = callPattern.exec(source)) !== null) {
    const method = match[1];
    const openIndex = source.indexOf("(", match.index);
    const closeIndex = findMatchingParen(source, openIndex);
    if (closeIndex === -1) continue;

    const args = splitTopLevelArgs(source.slice(openIndex + 1, closeIndex));
    const positionIndex = TIMELINE_METHODS.get(method);
    if (args.length <= positionIndex) continue;

    const selector = extractScopedSelector(args[0]);
    const position = parseScenePosition(args[positionIndex].trim());
    if (!selector || !position) continue;

    const propsArgs = method === "fromTo" ? [args[1], args[2]] : [args[1]];
    const props = new Set();
    for (const propsArg of propsArgs) {
      for (const prop of extractTweenProps(propsArg || "")) props.add(prop);
    }
    if (props.size === 0) continue;

    tweens.push({
      method,
      selector,
      props,
      position,
      line: lineNumberAt(source, match.index),
    });
  }

  return tweens;
}

function cueMayRunBeforeAt(cuePosition, atPosition) {
  if (cuePosition.type !== "cue" || atPosition.type !== "at") return false;
  if (cuePosition.index !== 0) return false;
  return cuePosition.offsetMs < atPosition.ms;
}

function validateCueSkeletonStateCollisions(source, { sceneId = "scene", filePath = "" } = {}) {
  const errors = [];
  const tweens = collectStateTweens(source);

  for (const cueTween of tweens) {
    if (cueTween.position.type !== "cue") continue;
    for (const atTween of tweens) {
      if (atTween.position.type !== "at") continue;
      if (cueTween.selector !== atTween.selector) continue;
      if (!cueMayRunBeforeAt(cueTween.position, atTween.position)) continue;

      const sharedProps = [...cueTween.props].filter((prop) => atTween.props.has(prop));
      if (sharedProps.length === 0) continue;

      errors.push(
        `${sceneId} ${cueTween.selector} is controlled by cue(0, ${cueTween.position.offsetMs}) at line ${cueTween.line} before a later skeleton at(${atTween.position.ms}) at line ${atTween.line} for ${sharedProps.join(", ")}; move the skeleton tween earlier or delay the cue to avoid state flicker${filePath ? ` in ${filePath}` : ""}`,
      );
    }
  }

  return errors;
}

function positionIsAtZero(position) {
  return position?.type === "at" && position.ms === 0;
}

function selectorHasAtZeroSet(tweens, selector, props) {
  return tweens.some((tween) => {
    if (tween.method !== "set") return false;
    if (tween.selector !== selector) return false;
    if (!positionIsAtZero(tween.position)) return false;
    return [...props].every((prop) => tween.props.has(prop));
  });
}

function collectDelayedEntranceTweens(source) {
  const tweens = [];
  const callPattern = /\btl\.(from|fromTo)\s*\(/g;
  let match;

  while ((match = callPattern.exec(source)) !== null) {
    const method = match[1];
    const openIndex = source.indexOf("(", match.index);
    const closeIndex = findMatchingParen(source, openIndex);
    if (closeIndex === -1) continue;

    const args = splitTopLevelArgs(source.slice(openIndex + 1, closeIndex));
    const positionIndex = TIMELINE_METHODS.get(method);
    if (args.length <= positionIndex) continue;

    const selector = extractScopedSelector(args[0]);
    const position = parseScenePosition(args[positionIndex].trim());
    if (!selector || !position || positionIsAtZero(position)) continue;

    const fromPropsArg = args[1] || "";
    const entranceProps = extractTweenProps(fromPropsArg, ENTRANCE_STATE_PROPS);
    if (entranceProps.size === 0) continue;

    tweens.push({
      method,
      selector,
      props: entranceProps,
      position,
      line: lineNumberAt(source, match.index),
    });
  }

  return tweens;
}

function formatPosition(position) {
  if (position.type === "at") return `at(${position.ms})`;
  if (position.type === "cue") return `cue(${position.index}, ${position.offsetMs})`;
  return "unknown position";
}

function validateDelayedEntranceInitialStates(source, { sceneId = "scene", filePath = "" } = {}) {
  const errors = [];
  const stateTweens = collectStateTweens(source);
  const delayedEntranceTweens = collectDelayedEntranceTweens(source);

  for (const tween of delayedEntranceTweens) {
    if (selectorHasAtZeroSet(stateTweens, tween.selector, tween.props)) continue;

    const props = [...tween.props].join(", ");
    errors.push(
      `${sceneId} ${tween.selector} uses tl.${tween.method} with entrance state props (${props}) at ${formatPosition(tween.position)} on line ${tween.line}, but has no matching tl.set(..., at(0)) initial state; delayed from/fromTo can show the CSS final state before animating and cause flicker${filePath ? ` in ${filePath}` : ""}`,
    );
  }

  return errors;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function validateScopedSelectorUsage(source, { sceneId = "scene", filePath = "" } = {}) {
  const errors = [];
  const selectorStringMisuseProps = [
    "querySelector",
    "querySelectorAll",
    "getElementById",
    "getElementsByClassName",
    "getElementsByTagName",
    "textContent",
    "innerText",
    "innerHTML",
    "value",
    "style",
    "classList",
    "dataset",
    "setAttribute",
    "getAttribute",
    "appendChild",
    "removeChild",
    "addEventListener",
  ];
  const misuseAlternation = selectorStringMisuseProps.join("|");
  const directMutationPattern = new RegExp(`\\bq\\s*\\([^)]*\\)\\s*\\.\\s*(${misuseAlternation})\\b`, "g");
  let directMatch;

  while ((directMatch = directMutationPattern.exec(source)) !== null) {
    const line = lineNumberAt(source, directMatch.index);
    errors.push(
      `${sceneId} q(...) returns a scoped selector string, not a DOM element; do not use .${directMatch[1]} directly at line ${line}${filePath ? ` in ${filePath}` : ""}`,
    );
  }

  const qAssignments = [];
  const assignmentPattern = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*q\s*\(/g;
  let assignmentMatch;
  while ((assignmentMatch = assignmentPattern.exec(source)) !== null) {
    qAssignments.push({
      name: assignmentMatch[1],
      line: lineNumberAt(source, assignmentMatch.index),
    });
  }

  for (const assignment of qAssignments) {
    const usagePattern = new RegExp(
      `\\b${escapeRegExp(assignment.name)}\\s*\\.\\s*(${misuseAlternation})\\b`,
      "g",
    );
    let usageMatch;
    while ((usageMatch = usagePattern.exec(source)) !== null) {
      const line = lineNumberAt(source, usageMatch.index);
      errors.push(
        `${sceneId} variable "${assignment.name}" is assigned from q(...) at line ${assignment.line}, so it is a selector string; use document.querySelector(q(...)) before using .${usageMatch[1]} at line ${line}${filePath ? ` in ${filePath}` : ""}`,
      );
    }
  }

  return errors;
}

function validateRiskySelectors(source, { sceneId = "scene", filePath = "" } = {}) {
  const warnings = [];
  const qSelectorPattern = /\bq\s*\(\s*([`"'])(.*?)\1\s*\)/gs;
  let match;

  while ((match = qSelectorPattern.exec(source)) !== null) {
    const selector = match[2];
    if (/\[data-anim\s*=/.test(selector) && /:nth-of-type\s*\(/.test(selector)) {
      warnings.push(
        `${sceneId} selector "${selector}" combines data-anim with :nth-of-type at line ${lineNumberAt(source, match.index)}; nth-of-type counts tag siblings, not matching data-anim elements, so this often misses GSAP targets${filePath ? ` in ${filePath}` : ""}`,
      );
    }
  }

  return warnings;
}

function validateSceneParameterContract(source, { sceneId = "scene", filePath = "" } = {}) {
  const errors = [];
  const storyboardProps = [
    "segments",
    "startTime",
    "duration",
    "displayDuration",
    "relativeStart",
    "relativeDuration",
  ];
  const storyboardPropAlternation = storyboardProps.join("|");
  const sceneDataPattern = new RegExp(`\\bscene\\s*\\.\\s*(${storyboardPropAlternation})\\b`, "g");
  let sceneDataMatch;

  while ((sceneDataMatch = sceneDataPattern.exec(source)) !== null) {
    const line = lineNumberAt(source, sceneDataMatch.index);
    errors.push(
      `${sceneId} registerEdScene parameter "scene" is the DOM element, not storyboard data; use cue(...) for timing or storyScene.${sceneDataMatch[1]} for read-only metadata instead of scene.${sceneDataMatch[1]} at line ${line}${filePath ? ` in ${filePath}` : ""}`,
    );
  }

  const destructurePattern = /registerEdScene\s*\(\s*["'][^"']+["']\s*,\s*\(\s*\{([^}]*)\}/s;
  const destructureMatch = destructurePattern.exec(source);
  if (destructureMatch) {
    const params = destructureMatch[1];
    if (/\bstoryboard\b/.test(params)) {
      const line = lineNumberAt(source, destructureMatch.index);
      errors.push(
        `${sceneId} registerEdScene receives storyScene for storyboard metadata, not "storyboard"; use ({ tl, scene, storyScene, at, cue, q }) at line ${line}${filePath ? ` in ${filePath}` : ""}`,
      );
    }
  }

  return errors;
}

export function validateSceneJsTiming(source, { sceneId = "scene", filePath = "" } = {}) {
  const errors = [];
  const warnings = [];
  const callPattern = /\btl\.(to|from|fromTo|set|call|add|addLabel)\s*\(/g;
  let match;

  while ((match = callPattern.exec(source)) !== null) {
    const method = match[1];
    const openIndex = source.indexOf("(", match.index);
    const closeIndex = findMatchingParen(source, openIndex);
    if (closeIndex === -1) {
      errors.push(`${sceneId} ${method} call has unmatched parentheses${filePath ? ` in ${filePath}` : ""}`);
      continue;
    }

    const args = splitTopLevelArgs(source.slice(openIndex + 1, closeIndex));
    const positionIndex = TIMELINE_METHODS.get(method);
    const line = lineNumberAt(source, match.index);
    const label = `${sceneId} tl.${method} at line ${line}`;
    if (args.length <= positionIndex) {
      errors.push(`${label} must pass an explicit position with at(...) or cue(...)`);
      continue;
    }

    const position = args[positionIndex].trim();
    if (isAllowedScenePosition(position)) continue;

    if (isNumericPosition(position)) {
      errors.push(`${label} uses a numeric timeline position (${position}); use at(...) or cue(...) so global time stays script-owned`);
      continue;
    }

    if (/\b(startTime|displayDuration|relativeStart|relativeDuration)\b/.test(position)) {
      errors.push(`${label} computes timing from storyboard fields directly; use at(...) or cue(...)`);
      continue;
    }

    errors.push(`${label} position must start with at(...) or cue(...), got: ${position}`);
  }

  if (!/\btl\.(to|from|fromTo|set|call|add|addLabel)\s*\(/.test(source)) {
    warnings.push(`${sceneId} scene JS does not add any timeline animations`);
  }

  errors.push(...validateScopedSelectorUsage(source, { sceneId, filePath }));
  errors.push(...validateSceneParameterContract(source, { sceneId, filePath }));
  errors.push(...validateCueSkeletonStateCollisions(source, { sceneId, filePath }));
  errors.push(...validateDelayedEntranceInitialStates(source, { sceneId, filePath }));
  warnings.push(...validateRiskySelectors(source, { sceneId, filePath }));

  return { valid: errors.length === 0, errors, warnings };
}
