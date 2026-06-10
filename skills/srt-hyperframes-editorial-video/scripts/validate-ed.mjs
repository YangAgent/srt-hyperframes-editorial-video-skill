#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateSceneJsTiming } from "./scene-js-timing-utils.mjs";

const file = process.argv[2] || "index.html";
const storyboardPathArg = process.argv[3] || "";
const html = fs.readFileSync(file, "utf8");
const errors = [];
const warnings = [];
const projectDir = path.dirname(path.resolve(file));
const skillDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function has(pattern) {
  return pattern.test(html);
}

function stripTags(value) {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function countChinese(value) {
  return (value.match(/[\u3400-\u9fff]/g) || []).length;
}

function pushUnique(target, message) {
  if (!target.includes(message)) target.push(message);
}

function readAttr(attrs, name) {
  const match = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match ? match[2] : "";
}

function parseNumberAttr(attrs, name) {
  const value = readAttr(attrs, name);
  if (!value) return NaN;
  return Number(value);
}

function hasClass(attrs, className) {
  return readAttr(attrs, "class")
    .split(/\s+/)
    .filter(Boolean)
    .includes(className);
}

function formatSeconds(ms) {
  return (ms / 1000).toFixed(3).replace(/\.?0+$/, "");
}

function validateTextHierarchy(sourceHtml, sourceCss, label = "index.html") {
  const localWarnings = [];
  const riskyNamePattern = /\b(?:bottom-caption|footer-caption|footnote|final-label)\b/i;
  if (riskyNamePattern.test(sourceHtml) || riskyNamePattern.test(sourceCss)) {
    localWarnings.push(
      `${label} uses footnote-like naming (bottom-caption/footer-caption/footnote/final-label); content text should live in headline, subline, node text, result label, or callout`,
    );
  }

  const tagPattern = /<([a-z][\w:-]*)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let tagMatch;
  while ((tagMatch = tagPattern.exec(sourceHtml)) !== null) {
    const attrs = tagMatch[2] || "";
    const body = stripTags(tagMatch[3] || "");
    if (!body) continue;
    const classMatch = attrs.match(/\bclass\s*=\s*["']([^"']+)["']/i);
    const classes = classMatch ? classMatch[1] : "";
    const hasChineseSentence = countChinese(body) >= 6;
    if (/\blabel-mono\b/.test(classes) && hasChineseSentence) {
      pushUnique(
        localWarnings,
        `${label} has .label-mono carrying Chinese content text "${body.slice(0, 28)}"; use headline/subline/node text/result label/callout instead of mono meta`,
      );
    }
    if (/\bed-ghost-type\b/.test(classes) && countChinese(body) > 0) {
      pushUnique(
        localWarnings,
        `${label} has .ed-ghost-type containing Chinese text "${body.slice(0, 28)}"; ghost type should use an English word, short English phrase, or Latin acronym`,
      );
    }
    if (/\b(?:final-label|caption)\b/.test(classes) && /\blabel-mono\b/.test(classes)) {
      pushUnique(
        localWarnings,
        `${label} combines label-mono with caption/source/final-label classes; reserve mono for kicker, source, unit, index, or short meta only`,
      );
    }
    if (/\bsource\b/.test(classes) && /\blabel-mono\b/.test(classes) && hasChineseSentence) {
      pushUnique(
        localWarnings,
        `${label} uses source + label-mono for Chinese content text "${body.slice(0, 28)}"; source should be real meta, not SRT copy`,
      );
    }
  }

  const classedTagPattern = /<([a-z][\w:-]*)\b(?=[^>]*\bclass\s*=\s*["'][^"']+["'])([^>]*)>([\s\S]*?)<\/\1>/gi;
  let classedMatch;
  while ((classedMatch = classedTagPattern.exec(sourceHtml)) !== null) {
    const attrs = classedMatch[2] || "";
    const body = stripTags(classedMatch[3] || "");
    if (!body) continue;
    const classMatch = attrs.match(/\bclass\s*=\s*["']([^"']+)["']/i);
    const classes = classMatch ? classMatch[1] : "";
    const hasChineseSentence = countChinese(body) >= 6;
    if (/\blabel-mono\b/.test(classes) && hasChineseSentence) {
      const message = `${label} has .label-mono carrying Chinese content text "${body.slice(0, 28)}"; use headline/subline/node text/result label/callout instead of mono meta`;
      pushUnique(localWarnings, message);
    }
    if (/\bed-ghost-type\b/.test(classes) && countChinese(body) > 0) {
      pushUnique(
        localWarnings,
        `${label} has .ed-ghost-type containing Chinese text "${body.slice(0, 28)}"; ghost type should use an English word, short English phrase, or Latin acronym`,
      );
    }
    if (/\bsource\b/.test(classes) && /\blabel-mono\b/.test(classes) && hasChineseSentence) {
      const message = `${label} uses source + label-mono for Chinese content text "${body.slice(0, 28)}"; source should be real meta, not SRT copy`;
      pushUnique(localWarnings, message);
    }
  }

  const directClassTextPattern =
    /<([a-z][\w:-]*)\b([^>]*\bclass\s*=\s*["'][^"']*(?:label-mono|ed-ghost-type)[^"']*["'][^>]*)>([^<]+)</gi;
  let directMatch;
  while ((directMatch = directClassTextPattern.exec(sourceHtml)) !== null) {
    const attrs = directMatch[2] || "";
    const body = stripTags(directMatch[3] || "");
    const classMatch = attrs.match(/\bclass\s*=\s*["']([^"']+)["']/i);
    const classes = classMatch ? classMatch[1] : "";
    if (countChinese(body) >= 6) {
      const message = `${label} has .label-mono carrying Chinese content text "${body.slice(0, 28)}"; use headline/subline/node text/result label/callout instead of mono meta`;
      if (/\blabel-mono\b/.test(classes)) pushUnique(localWarnings, message);
    }
    if (/\bed-ghost-type\b/.test(classes) && countChinese(body) > 0) {
      pushUnique(
        localWarnings,
        `${label} has .ed-ghost-type containing Chinese text "${body.slice(0, 28)}"; ghost type should use an English word, short English phrase, or Latin acronym`,
      );
    }
    if (/\bsource\b/.test(classes) && /\blabel-mono\b/.test(classes) && countChinese(body) >= 6) {
      const message = `${label} uses source + label-mono for Chinese content text "${body.slice(0, 28)}"; source should be real meta, not SRT copy`;
      pushUnique(localWarnings, message);
    }
  }

  const cssRulePattern = /([^{}]+)\{([^{}]*)\}/g;
  let ruleMatch;
  while ((ruleMatch = cssRulePattern.exec(sourceCss)) !== null) {
    const selector = ruleMatch[1].trim();
    const body = ruleMatch[2];
    if (!/(caption|final-label|source|meta)/i.test(selector)) continue;
    const fontSizeMatch = body.match(/font-size\s*:\s*([0-9.]+)px/i);
    if (fontSizeMatch && Number(fontSizeMatch[1]) < 30) {
      localWarnings.push(
        `${label} selector "${selector}" uses ${fontSizeMatch[1]}px for caption/source/meta-like text; content text should be at least var(--type-body-min) or moved to headline/subline/node/result/callout`,
      );
    }
    if (/font-size\s*:\s*var\(\s*--type-(?:kicker|meta)\s*\)/i.test(body) && /(caption|final-label)/i.test(selector)) {
      localWarnings.push(
        `${label} selector "${selector}" uses small meta scale for caption/final-label; SRT content should not be footnote-style copy`,
      );
    }
  }

  return localWarnings;
}

function validateStructuralConnectorMotion(sourceJs, label = "scene.js") {
  const localWarnings = [];
  const structuralTargetPattern =
    /(?:data-anim\s*=\s*["'`](?:impact-band|impact-path|connector|timeline-rail)["'`]|["'`](?:impact-band|impact-path|connector|timeline-rail)["'`]|[-\w]*(?:impact-band|impact-path|connector|timeline-rail)[-\w]*)/gi;
  let match;
  while ((match = structuralTargetPattern.exec(sourceJs)) !== null) {
    const windowText = sourceJs.slice(match.index, match.index + 900);
    if (!/(?:gsap|tl)\s*\.\s*(?:to|from|fromTo|set)\b|q\s*\(/.test(windowText)) continue;
    if (/\b(?:repeat|yoyo)\s*:/.test(windowText)) {
      pushUnique(
        localWarnings,
        `${label} animates structural connector "${match[0].slice(0, 40)}" with repeat/yoyo; connector or impact band should settle after draw and use glow/opacity/marker for ambient motion`,
      );
    }
  }
  return localWarnings;
}

function readStoryboard() {
  const candidate = storyboardPathArg
    ? path.resolve(storyboardPathArg)
    : path.join(projectDir, "storyboard.json");
  if (!fs.existsSync(candidate)) return null;
  return JSON.parse(fs.readFileSync(candidate, "utf8"));
}

function sceneIdToNumber(sceneId) {
  const match = /^scene_(\d{3})$/.exec(sceneId);
  return match ? match[1] : "";
}

if (!has(/data-composition-id=["']main["']/)) {
  errors.push('missing root data-composition-id="main"');
}

if (!has(/window\.__timelines\s*\[\s*["']main["']\s*\]\s*=/)) {
  errors.push('missing window.__timelines["main"] registration');
}

if (!has(/gsap\.timeline\s*\(\s*\{[^}]*paused\s*:\s*true/)) {
  errors.push("GSAP timeline must be created with paused:true");
}

if (has(/repeat\s*:\s*-1/)) {
  errors.push("repeat:-1 is forbidden in HyperFrames renderable timelines");
}

if (has(/setTimeout\s*\(|setInterval\s*\(|async\s+function|Promise\s*\./)) {
  warnings.push("timeline may include async/timer logic; keep timeline construction synchronous");
}

const themeFile = path.join(projectDir, ".theme");
const tokensFile = path.join(projectDir, "styles", "tokens.css");
if (fs.existsSync(themeFile)) {
  const theme = fs.readFileSync(themeFile, "utf8").trim();
  if (!fs.existsSync(path.join(skillDir, "themes", theme, "tokens.css"))) {
    errors.push(`unknown theme in .theme: ${theme}`);
  }
  if (!fs.existsSync(tokensFile)) {
    errors.push("missing styles/tokens.css in generated project");
  }
}

const localStyleBlocks = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n");
const inlineStyles = [...html.matchAll(/style=["']([^"']*)["']/g)].map((m) => m[1]).join("\n");
const colorSources = `${localStyleBlocks}\n${inlineStyles}`;
const hexes = [...colorSources.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0].toLowerCase());
for (const hex of hexes) {
  warnings.push(`hardcoded hex in inline/style block; prefer theme tokens: ${hex}`);
}

warnings.push(...validateTextHierarchy(html, localStyleBlocks, path.basename(file)));

const storyboard = readStoryboard();
if (storyboard) {
  if (!Array.isArray(storyboard.scenes) || storyboard.sceneCount !== storyboard.scenes.length) {
    errors.push("storyboard has invalid scenes / sceneCount");
  } else {
    const durationMatch = html.match(/data-duration=["']([^"']+)["']/);
    const htmlDurationMs = durationMatch ? Math.round(Number(durationMatch[1]) * 1000) : NaN;
    if (!Number.isFinite(htmlDurationMs)) {
      errors.push("root composition missing numeric data-duration");
    } else if (htmlDurationMs !== storyboard.totalDuration) {
      errors.push(`data-duration must match storyboard totalDuration (${storyboard.totalDuration}ms), got ${htmlDurationMs}ms`);
    }

    for (const scene of storyboard.scenes) {
      const sectionPattern = new RegExp(`<section\\b([^>]*)\\bid=["']${scene.id}["']([^>]*)>`);
      const sectionMatch = html.match(sectionPattern);
      if (!sectionMatch || !hasClass(`${sectionMatch[1]} ${sectionMatch[2]}`, "ed-scene")) {
        errors.push(`missing .ed-scene section for ${scene.id}`);
      } else {
        const sectionAttrs = `${sectionMatch[1]} ${sectionMatch[2]}`;
        const nextScene = storyboard.scenes[storyboard.scenes.indexOf(scene) + 1];
        const displayDuration = nextScene ? nextScene.startTime - scene.startTime : scene.duration;
        const expectedClipDuration = nextScene ? Math.max(1, displayDuration - 1) : displayDuration;
        const dataStart = parseNumberAttr(sectionAttrs, "data-start");
        const dataDuration = parseNumberAttr(sectionAttrs, "data-duration");
        const trackIndex = readAttr(sectionAttrs, "data-track-index");
        if (!hasClass(sectionAttrs, "clip")) {
          errors.push(`${scene.id} section must include class="clip" so HyperFrames Studio can list it as a timed scene`);
        }
        if (!Number.isFinite(dataStart)) {
          errors.push(`${scene.id} section missing numeric data-start="${formatSeconds(scene.startTime)}"`);
        } else if (Math.abs(dataStart * 1000 - scene.startTime) > 0.5) {
          errors.push(`${scene.id} data-start must match storyboard startTime ${scene.startTime}ms, got ${Math.round(dataStart * 1000)}ms`);
        }
        if (!Number.isFinite(dataDuration)) {
          errors.push(`${scene.id} section missing numeric data-duration="${formatSeconds(expectedClipDuration)}"`);
        } else if (Math.abs(dataDuration * 1000 - expectedClipDuration) > 0.5) {
          errors.push(
            `${scene.id} data-duration must be ${expectedClipDuration}ms (${displayDuration}ms display duration, minus 1ms for non-final scenes), got ${Math.round(dataDuration * 1000)}ms`,
          );
        }
        if (trackIndex !== "0") {
          errors.push(`${scene.id} data-track-index must be "0", got "${trackIndex || "<missing>"}"`);
        }
      }
      const registerPattern = new RegExp(`registerEdScene\\(\\s*["']${scene.id}["']`);
      if (!registerPattern.test(html)) {
        errors.push(`missing registerEdScene call for ${scene.id}`);
      }
      const number = sceneIdToNumber(scene.id);
      if (number) {
        const sceneDir = path.join(projectDir, "src", "scenes");
        for (const ext of ["html", "css", "js"]) {
          const partPath = path.join(sceneDir, `Scene${number}.${ext}`);
          if (!fs.existsSync(partPath)) warnings.push(`scene source part not found: ${partPath}`);
        }
        const jsPartPath = path.join(sceneDir, `Scene${number}.js`);
        const htmlPartPath = path.join(sceneDir, `Scene${number}.html`);
        const cssPartPath = path.join(sceneDir, `Scene${number}.css`);
        if (fs.existsSync(htmlPartPath) || fs.existsSync(cssPartPath)) {
          warnings.push(
            ...validateTextHierarchy(
              fs.existsSync(htmlPartPath) ? fs.readFileSync(htmlPartPath, "utf8") : "",
              fs.existsSync(cssPartPath) ? fs.readFileSync(cssPartPath, "utf8") : "",
              `${scene.id} source parts`,
            ),
          );
        }
        if (fs.existsSync(jsPartPath)) {
          const sceneJs = fs.readFileSync(jsPartPath, "utf8");
          const timingValidation = validateSceneJsTiming(sceneJs, {
            sceneId: scene.id,
            filePath: jsPartPath,
          });
          errors.push(...timingValidation.errors);
          warnings.push(...timingValidation.warnings);
          warnings.push(...validateStructuralConnectorMotion(sceneJs, `${scene.id} source js`));
        }
      }
      if (!Array.isArray(scene.segments) || scene.segments.length === 0) {
        errors.push(`${scene.id} has no storyboard segments`);
      }
    }
  }
} else if (storyboardPathArg) {
  errors.push(`storyboard not found: ${path.resolve(storyboardPathArg)}`);
}

if (!has(/function\s+registerEdScene|const\s+__edSceneBuilders/)) {
  warnings.push("registerEdScene helper was not found; generated SRT compositions should include it");
}

if (errors.length || warnings.length) {
  console.log(`Editorial validation for ${path.resolve(file)}`);
  for (const error of errors) console.log(`ERROR: ${error}`);
  for (const warning of warnings) console.log(`WARN: ${warning}`);
}

if (errors.length) process.exit(1);
console.log(`Editorial validation passed: ${path.resolve(file)}`);
