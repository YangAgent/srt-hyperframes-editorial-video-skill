#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const LAYOUT_IDS = new Set([
  "statement-editorial",
  "statement-diagonal-command",
  "quote-oversized",
  "quote-margin-index",
  "data-dominant-number",
  "data-cropped-ruler",
  "chart-dominant-marker",
  "chart-interval-stability",
  "process-advancing-spine",
  "process-descending-construction",
  "timeline-alternating-axis",
  "timeline-compressed-tempo",
  "list-priority-stack",
  "list-grouped-catalog",
  "list-feature-board",
  "compare-editorial-split",
  "compare-asymmetric-recommendation",
  "compare-multi-option-board",
  "compare-tradeoff-matrix",
  "cause-pressure-chokepoint",
  "cause-stacked-pressure",
  "concept-core-satellite",
  "concept-sectional-layer",
  "definition-term-breakdown",
  "definition-not-this-that",
  "evidence-annotations",
  "evidence-final-file-proof",
  "example-case-card",
  "transform-fragments-to-block",
  "transform-compression-release",
  "rule-threshold-decision",
  "rule-correct-wrong-example",
  "checklist-risk-scan",
  "decision-condition-path",
  "decision-criteria-shortlist",
  "error-symptom-diagnosis",
  "error-fix-before-after",
  "formula-input-to-result",
  "formula-key-variable-focus",
  "sequence-operation-steps",
  "chapter-current-progress",
]);

const LAYOUT_VARIANTS = new Map();

LAYOUT_VARIANTS.set("statement-editorial", [
  "cover-left-anchor",
  "center-quote-lockup",
  "vertical-rail",
  "cropped-keyword",
]);

LAYOUT_VARIANTS.set("statement-diagonal-command", [
  "slash-command",
  "edge-pressure",
  "split-impact",
]);

LAYOUT_VARIANTS.set("quote-oversized", [
  "center-monument",
  "cropped-mark",
  "wide-breathing",
]);

LAYOUT_VARIANTS.set("quote-margin-index", [
  "margin-ledger",
  "side-index",
  "archive-strip",
]);

LAYOUT_VARIANTS.set("data-dominant-number", [
  "center-stat",
  "left-stat-right-proof",
  "bottom-metric-deck",
]);

LAYOUT_VARIANTS.set("data-cropped-ruler", [
  "edge-cropped-scale",
  "vertical-ruler",
  "horizontal-gauge",
]);

LAYOUT_VARIANTS.set("chart-dominant-marker", [
  "right-chart-left-claim",
  "full-bleed-chart",
  "cropped-curve-marker",
]);

LAYOUT_VARIANTS.set("chart-interval-stability", [
  "banded-range",
  "stacked-intervals",
  "threshold-window",
]);

LAYOUT_VARIANTS.set("process-advancing-spine", [
  "horizontal-spine",
  "stepped-rail",
  "endpoint-emphasis",
]);

LAYOUT_VARIANTS.set("process-descending-construction", [
  "diagonal-drop",
  "cascade-build",
  "layered-descent",
]);

LAYOUT_VARIANTS.set("timeline-alternating-axis", [
  "alternating-axis",
  "compressed-milestones",
  "turning-point-focus",
]);

LAYOUT_VARIANTS.set("timeline-compressed-tempo", [
  "compression-band",
  "before-after-tempo",
  "sprint-lanes",
]);

LAYOUT_VARIANTS.set("checklist-risk-scan", [
  "side-copy-board",
  "full-board-callout",
  "vertical-scan-rail",
  "radar-focus",
]);

LAYOUT_VARIANTS.set("list-priority-stack", [
  "ranked-column",
  "hero-first-stack",
  "compressed-priority-deck",
]);

LAYOUT_VARIANTS.set("list-grouped-catalog", [
  "sectioned-ledger",
  "two-group-columns",
  "cluster-catalog",
]);

LAYOUT_VARIANTS.set("list-feature-board", [
  "single-feature-focus",
  "offset-feature-board",
  "editorial-feature-grid",
]);

LAYOUT_VARIANTS.set("compare-editorial-split", [
  "vertical-split",
  "diagonal-split",
  "top-bottom-split",
  "asymmetric-35-65",
]);

LAYOUT_VARIANTS.set("compare-asymmetric-recommendation", [
  "hero-recommendation",
  "narrow-before-wide-after",
  "proof-stack-recommendation",
]);

LAYOUT_VARIANTS.set("compare-multi-option-board", [
  "option-columns",
  "winner-highlight",
  "criteria-row-board",
]);

LAYOUT_VARIANTS.set("compare-tradeoff-matrix", [
  "quadrant-map",
  "axis-tradeoff",
  "sweet-spot-marker",
]);

LAYOUT_VARIANTS.set("cause-pressure-chokepoint", [
  "left-pressure-right-result",
  "center-chokepoint",
  "diagonal-pressure-flow",
]);

LAYOUT_VARIANTS.set("cause-stacked-pressure", [
  "stacked-bands",
  "weight-column",
  "pressure-slab",
]);

LAYOUT_VARIANTS.set("concept-core-satellite", [
  "left-copy-orbit",
  "center-orbit",
  "layered-rings",
  "side-stack-core",
]);

LAYOUT_VARIANTS.set("concept-sectional-layer", [
  "layered-section",
  "cutaway-core",
  "vertical-strata",
]);

LAYOUT_VARIANTS.set("definition-term-breakdown", [
  "term-left-breakdown",
  "center-term-radial",
  "keyword-cutaway",
]);

LAYOUT_VARIANTS.set("definition-not-this-that", [
  "rejected-definition",
  "replacement-lockup",
  "two-line-correction",
]);

LAYOUT_VARIANTS.set("evidence-annotations", [
  "document-annotation",
  "zoom-callout",
  "side-proof-board",
]);

LAYOUT_VARIANTS.set("evidence-final-file-proof", [
  "hero-file-proof",
  "spec-readout",
  "delivery-poster",
]);

LAYOUT_VARIANTS.set("example-case-card", [
  "hero-example",
  "annotated-example",
  "example-result-pair",
]);

LAYOUT_VARIANTS.set("transform-fragments-to-block", [
  "scattered-to-block",
  "split-before-after",
  "funnel-compress",
]);

LAYOUT_VARIANTS.set("transform-compression-release", [
  "center-compressor",
  "cloud-to-output",
  "release-slab",
]);

LAYOUT_VARIANTS.set("rule-threshold-decision", [
  "threshold-line",
  "zone-map",
  "gauge-marker",
]);

LAYOUT_VARIANTS.set("rule-correct-wrong-example", [
  "wrong-right-split",
  "corrected-example-focus",
  "rule-lockup",
]);

LAYOUT_VARIANTS.set("decision-condition-path", [
  "forked-path",
  "decision-diamond",
  "highlighted-route",
]);

LAYOUT_VARIANTS.set("decision-criteria-shortlist", [
  "funnel-shortlist",
  "criteria-lanes",
  "elimination-board",
]);

LAYOUT_VARIANTS.set("error-symptom-diagnosis", [
  "symptom-scan",
  "root-cause-lock",
  "split-symptom-cause",
]);

LAYOUT_VARIANTS.set("error-fix-before-after", [
  "three-stage-fix",
  "repair-spotlight",
  "before-after-rebuild",
]);

LAYOUT_VARIANTS.set("formula-input-to-result", [
  "ingredient-grid-output",
  "equation-rail",
  "mixer-core",
]);

LAYOUT_VARIANTS.set("formula-key-variable-focus", [
  "variable-spotlight",
  "factors-orbit",
  "ranked-dropoff",
]);

LAYOUT_VARIANTS.set("sequence-operation-steps", [
  "command-rail",
  "current-step-zoom",
  "stacked-actions",
]);

LAYOUT_VARIANTS.set("chapter-current-progress", [
  "chapter-stack",
  "progress-rail",
  "current-island",
]);

const LAYOUT_FAMILIES = new Map([
  ["statement-editorial", "statement"],
  ["statement-diagonal-command", "statement"],
  ["quote-oversized", "quote"],
  ["quote-margin-index", "quote"],
  ["data-dominant-number", "data"],
  ["data-cropped-ruler", "data"],
  ["chart-dominant-marker", "chart"],
  ["chart-interval-stability", "chart"],
  ["process-advancing-spine", "process"],
  ["process-descending-construction", "process"],
  ["timeline-alternating-axis", "timeline"],
  ["timeline-compressed-tempo", "timeline"],
  ["list-priority-stack", "list"],
  ["list-grouped-catalog", "list"],
  ["list-feature-board", "list"],
  ["compare-editorial-split", "compare"],
  ["compare-asymmetric-recommendation", "compare"],
  ["compare-multi-option-board", "compare"],
  ["compare-tradeoff-matrix", "compare"],
  ["cause-pressure-chokepoint", "cause"],
  ["cause-stacked-pressure", "cause"],
  ["concept-core-satellite", "concept"],
  ["concept-sectional-layer", "concept"],
  ["definition-term-breakdown", "definition"],
  ["definition-not-this-that", "definition"],
  ["evidence-annotations", "evidence"],
  ["evidence-final-file-proof", "evidence"],
  ["example-case-card", "example"],
  ["transform-fragments-to-block", "transform"],
  ["transform-compression-release", "transform"],
  ["rule-threshold-decision", "rule"],
  ["rule-correct-wrong-example", "rule"],
  ["checklist-risk-scan", "checklist"],
  ["decision-condition-path", "decision"],
  ["decision-criteria-shortlist", "decision"],
  ["error-symptom-diagnosis", "error"],
  ["error-fix-before-after", "error"],
  ["formula-input-to-result", "formula"],
  ["formula-key-variable-focus", "formula"],
  ["sequence-operation-steps", "sequence"],
  ["chapter-current-progress", "chapter"],
]);

const REMOVED_SCHEMA_KEYS = new Set(["type", "motion_recipe"]);
const FORBIDDEN_TIME_KEYS = new Set([
  "startMs",
  "endMs",
  "duration",
  "frame",
  "frames",
  "absoluteTime",
  "startTime",
  "relativeStart",
  "relativeDuration",
  "time",
]);

function fail(errors) {
  console.error("scene-plan validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  console.log(JSON.stringify({ success: false, errors }, null, 2));
  process.exit(1);
}

function loadJson(filePath, label) {
  if (!fs.existsSync(filePath)) throw new Error(`${label} not found: ${filePath}`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function findForbiddenTimeKeys(value, pointer = "$", found = []) {
  if (!value || typeof value !== "object") return found;
  if (Array.isArray(value)) {
    value.forEach((item, index) => findForbiddenTimeKeys(item, `${pointer}[${index}]`, found));
    return found;
  }
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_TIME_KEYS.has(key)) found.push(`${pointer}.${key}`);
    findForbiddenTimeKeys(child, `${pointer}.${key}`, found);
  }
  return found;
}

function findRemovedSchemaKeys(value, pointer = "$", found = []) {
  if (!value || typeof value !== "object") return found;
  if (Array.isArray(value)) {
    value.forEach((item, index) => findRemovedSchemaKeys(item, `${pointer}[${index}]`, found));
    return found;
  }
  for (const [key, child] of Object.entries(value)) {
    if (REMOVED_SCHEMA_KEYS.has(key)) found.push(`${pointer}.${key}`);
    findRemovedSchemaKeys(child, `${pointer}.${key}`, found);
  }
  return found;
}

function validateFocusPlan(card, scene, errors) {
  if (!Array.isArray(card.focusPlan) || card.focusPlan.length === 0) {
    errors.push(`${scene.id} focusPlan must be a non-empty array`);
    return;
  }

  const coverage = [];
  card.focusPlan.forEach((cue, cueIndex) => {
    if (!cue || typeof cue !== "object" || Array.isArray(cue)) {
      errors.push(`${scene.id} focusPlan[${cueIndex}] must be an object`);
      return;
    }
    if (!Array.isArray(cue.segments) || cue.segments.length === 0) {
      errors.push(`${scene.id} focusPlan[${cueIndex}] must include non-empty segments`);
      return;
    }
    if (!isNonEmptyString(cue.target)) errors.push(`${scene.id} focusPlan[${cueIndex}].target must be a non-empty string`);
    if (!isNonEmptyString(cue.action)) errors.push(`${scene.id} focusPlan[${cueIndex}].action must be a non-empty string`);

    let previous = null;
    const localSeen = new Set();
    cue.segments.forEach((segmentIndex) => {
      if (!Number.isInteger(segmentIndex)) {
        errors.push(`${scene.id} focusPlan[${cueIndex}] contains a non-integer segment index`);
        return;
      }
      if (segmentIndex < 0 || segmentIndex >= scene.segments.length) {
        errors.push(`${scene.id} focusPlan[${cueIndex}] segment index out of range: ${segmentIndex}`);
      }
      if (localSeen.has(segmentIndex)) {
        errors.push(`${scene.id} focusPlan[${cueIndex}] repeats segment index: ${segmentIndex}`);
      }
      if (previous !== null && segmentIndex !== previous + 1) {
        errors.push(`${scene.id} focusPlan[${cueIndex}] may only merge adjacent segments`);
      }
      localSeen.add(segmentIndex);
      coverage.push(segmentIndex);
      previous = segmentIndex;
    });
  });

  const sorted = [...coverage].sort((a, b) => a - b);
  for (let index = 0; index < scene.segments.length; index += 1) {
    if (sorted[index] !== index) {
      errors.push(`${scene.id} focusPlan must uniquely cover every segment from 0 to ${scene.segments.length - 1}`);
      break;
    }
  }
  if (sorted.length !== scene.segments.length) {
    errors.push(`${scene.id} focusPlan covers ${sorted.length} segments, expected ${scene.segments.length}`);
  }
  for (let index = 1; index < sorted.length; index += 1) {
    if (sorted[index] === sorted[index - 1]) {
      errors.push(`${scene.id} focusPlan repeats segment index: ${sorted[index]}`);
      break;
    }
  }
}

function validateVisibleContent(card, scene, errors) {
  if (!Array.isArray(card.visibleContent) || card.visibleContent.length === 0) {
    errors.push(`${scene.id} visibleContent must be a non-empty array`);
    return;
  }

  card.visibleContent.forEach((item, itemIndex) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      errors.push(`${scene.id} visibleContent[${itemIndex}] must be an object`);
      return;
    }
    if (!isNonEmptyString(item.text)) {
      errors.push(`${scene.id} visibleContent[${itemIndex}].text must be a non-empty string`);
    }
    if (!Array.isArray(item.sourceSegments) || item.sourceSegments.length === 0) {
      errors.push(`${scene.id} visibleContent[${itemIndex}].sourceSegments must be a non-empty array`);
    } else {
      const localSeen = new Set();
      item.sourceSegments.forEach((segmentIndex) => {
        if (!Number.isInteger(segmentIndex)) {
          errors.push(`${scene.id} visibleContent[${itemIndex}] contains a non-integer source segment index`);
          return;
        }
        if (segmentIndex < 0 || segmentIndex >= scene.segments.length) {
          errors.push(`${scene.id} visibleContent[${itemIndex}] source segment index out of range: ${segmentIndex}`);
        }
        if (localSeen.has(segmentIndex)) {
          errors.push(`${scene.id} visibleContent[${itemIndex}] repeats source segment index: ${segmentIndex}`);
        }
        localSeen.add(segmentIndex);
      });
    }
    if (Object.hasOwn(item, "note") && !isNonEmptyString(item.note)) {
      errors.push(`${scene.id} visibleContent[${itemIndex}].note must be a non-empty string when provided`);
    }
  });
}

function validateCard(card, scene, errors) {
  const requiredStrings = [
    "sceneId",
    "layout_id",
    "layout_variant",
    "headline",
    "body",
    "visual_intent",
    "skeleton",
  ];
  for (const field of requiredStrings) {
    if (!isNonEmptyString(card[field])) errors.push(`${scene.id} ${field} must be a non-empty string`);
  }
  if (!LAYOUT_IDS.has(card.layout_id)) {
    errors.push(`${scene.id} has invalid layout_id: ${card.layout_id}`);
  } else {
    const variants = LAYOUT_VARIANTS.get(card.layout_id) || [];
    if (isNonEmptyString(card.layout_variant) && !variants.includes(card.layout_variant)) {
      errors.push(
        `${scene.id} has invalid layout_variant "${card.layout_variant}" for ${card.layout_id}; expected one of: ${variants.join(", ")}`,
      );
    }
  }
  if (!Array.isArray(card.screenShouldShow) || card.screenShouldShow.length === 0) {
    errors.push(`${scene.id} screenShouldShow must be a non-empty array`);
  } else if (card.screenShouldShow.some((item) => !isNonEmptyString(item))) {
    errors.push(`${scene.id} screenShouldShow items must be non-empty strings`);
  }
  const removedSchemaKeys = findRemovedSchemaKeys(card);
  if (removedSchemaKeys.length > 0) errors.push(`${scene.id} contains removed scene-plan fields: ${removedSchemaKeys.join(", ")}`);
  const forbidden = findForbiddenTimeKeys(card);
  if (forbidden.length > 0) errors.push(`${scene.id} contains forbidden timing fields: ${forbidden.join(", ")}`);
  validateVisibleContent(card, scene, errors);
  validateFocusPlan(card, scene, errors);
}

function incrementCount(map, key, sceneId) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(sceneId);
}

function formatCountError(kind, key, sceneIds, max) {
  return `${kind} "${key}" appears ${sceneIds.length} times, max ${max}; scenes: ${sceneIds.join(", ")}`;
}

function validateLayoutMetadata(errors) {
  for (const layoutId of LAYOUT_IDS) {
    if (!LAYOUT_VARIANTS.has(layoutId) || LAYOUT_VARIANTS.get(layoutId).length === 0) {
      errors.push(`layout_id "${layoutId}" has no layout_variant list in validate-scene-plan.mjs`);
    }
    if (!LAYOUT_FAMILIES.has(layoutId)) {
      errors.push(`layout_id "${layoutId}" has no family mapping in validate-scene-plan.mjs`);
    }
  }
}

function validateLayoutVariety(plan, sceneCount, errors) {
  validateLayoutMetadata(errors);

  const comboCounts = new Map();
  const layoutCounts = new Map();
  const familyCounts = new Map();
  const maxCombo = 1;
  const maxLayout = 2;
  const maxFamily = sceneCount >= 8 ? 3 : Math.max(2, Math.ceil(sceneCount / 2));

  for (const card of plan) {
    if (!card || typeof card !== "object" || Array.isArray(card)) continue;
    if (!isNonEmptyString(card.sceneId)) continue;
    if (!LAYOUT_IDS.has(card.layout_id)) continue;

    const variants = LAYOUT_VARIANTS.get(card.layout_id) || [];
    const family = LAYOUT_FAMILIES.get(card.layout_id);
    if (!family) continue;

    incrementCount(layoutCounts, card.layout_id, card.sceneId);
    incrementCount(familyCounts, family, card.sceneId);

    if (isNonEmptyString(card.layout_variant) && variants.includes(card.layout_variant)) {
      incrementCount(comboCounts, `${card.layout_id} + ${card.layout_variant}`, card.sceneId);
    }
  }

  for (const [combo, sceneIds] of comboCounts.entries()) {
    if (sceneIds.length > maxCombo) errors.push(formatCountError("layout combo", combo, sceneIds, maxCombo));
  }
  for (const [layoutId, sceneIds] of layoutCounts.entries()) {
    if (sceneIds.length > maxLayout) errors.push(formatCountError("layout_id", layoutId, sceneIds, maxLayout));
  }
  for (const [family, sceneIds] of familyCounts.entries()) {
    if (sceneIds.length > maxFamily) errors.push(formatCountError("family", family, sceneIds, maxFamily));
  }
}

function main() {
  const [planPathArg, scenesDataPathArg] = process.argv.slice(2);
  if (!planPathArg || !scenesDataPathArg) {
    fail(["usage: node validate-scene-plan.mjs <planPath> <scenesDataPath>"]);
  }
  const planPath = path.resolve(planPathArg);
  const scenesDataPath = path.resolve(scenesDataPathArg);
  const errors = [];
  let plan;
  let scenesData;
  try {
    plan = loadJson(planPath, "scene-plan");
    scenesData = loadJson(scenesDataPath, "scenesData");
  } catch (error) {
    fail([error.message]);
  }
  if (!Array.isArray(plan)) fail(["scene-plan root must be an array"]);
  if (!Array.isArray(scenesData) || scenesData.length === 0) fail(["scenesData must be a non-empty array"]);
  if (plan.length !== scenesData.length) errors.push(`scene-plan has ${plan.length} cards, expected ${scenesData.length}`);

  const scenesById = new Map(scenesData.map((scene) => [scene.id, scene]));
  const planIds = [];
  for (const [index, card] of plan.entries()) {
    if (!card || typeof card !== "object" || Array.isArray(card)) {
      errors.push(`scene-plan[${index}] must be an object`);
      continue;
    }
    if (!isNonEmptyString(card.sceneId)) {
      errors.push(`scene-plan[${index}] missing sceneId`);
      continue;
    }
    planIds.push(card.sceneId);
    const scene = scenesById.get(card.sceneId);
    if (!scene) {
      errors.push(`${card.sceneId} is not in current scenesData`);
      continue;
    }
    validateCard(card, scene, errors);
  }
  for (const scene of scenesData) {
    if (!planIds.includes(scene.id)) errors.push(`scene-plan missing ${scene.id}`);
  }
  if (new Set(planIds).size !== planIds.length) errors.push("scene-plan contains duplicate sceneId");
  validateLayoutVariety(plan, scenesData.length, errors);
  if (errors.length) fail(errors);
  console.log(JSON.stringify({ success: true, planPath, validatedSceneIds: scenesData.map((scene) => scene.id) }, null, 2));
}

main();
