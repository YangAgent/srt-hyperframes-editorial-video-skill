#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateSceneJsTiming } from "./scene-js-timing-utils.mjs";

function fail(message, extra = {}) {
  console.error(JSON.stringify({ success: false, error: message, ...extra }, null, 2));
  process.exit(1);
}

function sceneNumber(sceneId) {
  const match = /^scene_(\d{3})$/.exec(sceneId);
  if (!match) throw new Error(`invalid sceneId: ${sceneId}`);
  return match[1];
}

function loadStoryboard(storyboardPath) {
  if (!fs.existsSync(storyboardPath)) fail(`storyboard not found: ${storyboardPath}`);
  const storyboard = JSON.parse(fs.readFileSync(storyboardPath, "utf8"));
  if (!storyboard || !Array.isArray(storyboard.scenes)) fail(`invalid storyboard: ${storyboardPath}`);
  return storyboard;
}

function readSceneParts(projectRoot, sceneId) {
  const number = sceneNumber(sceneId);
  const basePath = path.join(projectRoot, "src", "scenes", `Scene${number}`);
  const paths = {
    html: `${basePath}.html`,
    css: `${basePath}.css`,
    js: `${basePath}.js`,
  };
  for (const filePath of Object.values(paths)) {
    if (!fs.existsSync(filePath)) fail(`missing scene part: ${filePath}`);
  }
  const html = fs.readFileSync(paths.html, "utf8").trim();
  const css = fs.readFileSync(paths.css, "utf8").trim();
  const js = fs.readFileSync(paths.js, "utf8").trim();
  if (!new RegExp(`<section\\b[^>]*id=["']${sceneId}["'][^>]*class=["'][^"']*ed-scene`).test(html)) {
    fail(`scene HTML must contain <section id="${sceneId}" class="ed-scene">: ${paths.html}`);
  }
  if (!css.includes(`#${sceneId}`)) {
    fail(`scene CSS must be scoped with #${sceneId}: ${paths.css}`);
  }
  if (!new RegExp(`registerEdScene\\(\\s*["']${sceneId}["']`).test(js)) {
    fail(`scene JS must call registerEdScene("${sceneId}"): ${paths.js}`);
  }
  if (/gsap\.timeline|window\.__timelines/.test(js)) {
    fail(`scene JS must not create timelines or register window.__timelines: ${paths.js}`);
  }
  const timingValidation = validateSceneJsTiming(js, { sceneId, filePath: paths.js });
  if (!timingValidation.valid) {
    fail(`scene JS timing validation failed: ${paths.js}`, { errors: timingValidation.errors });
  }
  return { html, css, js };
}

function withDisplayDurations(storyboard) {
  return storyboard.scenes.map((scene, index) => {
    const next = storyboard.scenes[index + 1];
    const displayDuration = next ? next.startTime - scene.startTime : scene.duration;
    const clipDuration = next ? Math.max(1, displayDuration - 1) : displayDuration;
    return { ...scene, displayDuration, clipDuration };
  });
}

function formatSeconds(ms) {
  return (ms / 1000).toFixed(3).replace(/\.?0+$/, "");
}

function addSceneClipAttributes(html, scene) {
  return html.replace(/<section\b([^>]*?)>/, (match, attrs) => {
    if (!new RegExp(`\\bid=["']${scene.id}["']`).test(attrs)) return match;
    let nextAttrs = attrs.replace(/\bclass=(["'])(.*?)\1/, (classMatch, quote, classValue) => {
      if (classValue.split(/\s+/).includes("clip")) return classMatch;
      return `class=${quote}${classValue} clip${quote}`;
    });
    const additions = [];
    if (!/\bdata-start=/.test(nextAttrs)) additions.push(`data-start="${formatSeconds(scene.startTime)}"`);
    if (!/\bdata-duration=/.test(nextAttrs)) additions.push(`data-duration="${formatSeconds(scene.clipDuration)}"`);
    if (!/\bdata-track-index=/.test(nextAttrs)) additions.push(`data-track-index="0"`);
    if (additions.length === 0 && nextAttrs === attrs) return match;
    return `<section${nextAttrs} ${additions.join(" ")}>`;
  });
}

function buildHtml({ storyboard, scenes, styles, scripts }) {
  const totalSeconds = (storyboard.totalDuration / 1000).toFixed(3).replace(/\.?0+$/, "");
  const scenesJson = JSON.stringify(scenes).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, initial-scale=1.0" />
    <title>HyperFrames Editorial Video</title>
    <script src="https://registry.npmmirror.com/gsap/3.14.2/files/dist/gsap.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,400;1,500;1,700&family=Source+Serif+4:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles/tokens.css" />
    <link rel="stylesheet" href="styles/base.css" />
    <link rel="stylesheet" href="styles/motion.css" />
    <style>
${styles}
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-width="1920" data-height="1080" data-start="0" data-duration="${totalSeconds}">
      <!-- ED_DEBUG_AUDIO_SLOT_START -->
      <!-- Debug audio is inserted here during preview-only debug mode. Keep empty for normal renders. -->
      <!-- ED_DEBUG_AUDIO_SLOT_END -->
${scenes.map((scene) => addSceneClipAttributes(scene.__html, scene)).join("\n")}
    </div>

    <script>
      const __edSceneBuilders = {};
      function registerEdScene(id, builder) {
        __edSceneBuilders[id] = builder;
      }
      const __edStoryboardScenes = ${scenesJson};
      function __edScope(id, selector) {
        return "#".concat(id, " ", selector);
      }
    </script>
    <script>
${scripts}
    </script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
      gsap.set(".ed-scene", { opacity: 0 });

      __edStoryboardScenes.forEach((storyScene, index) => {
        const label = storyScene.id;
        const start = storyScene.startTime / 1000;
        tl.addLabel(label, start);
        tl.set("#" + storyScene.id, { opacity: 1 }, start);
        if (index > 0) {
          tl.set("#" + __edStoryboardScenes[index - 1].id, { opacity: 0 }, start);
        }
        const builder = __edSceneBuilders[storyScene.id];
        if (typeof builder !== "function") {
          throw new Error("Missing Editorial scene builder: " + storyScene.id);
        }
        const scene = document.getElementById(storyScene.id);
        if (!scene) {
          throw new Error("Missing Editorial scene element: " + storyScene.id);
        }
        const at = (ms = 0) => start + ms / 1000;
        const cue = (segmentIndex, offsetMs = 0) => {
          const segment = storyScene.segments[segmentIndex];
          if (!segment) throw new Error("Missing segment " + segmentIndex + " for " + storyScene.id);
          return start + (segment.relativeStart + offsetMs) / 1000;
        };
        const q = (selector) => __edScope(storyScene.id, selector);
        builder({ tl, scene, storyScene, label, at, cue, q });
      });

      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
}

function main() {
  const [projectRootArg, storyboardPathArg, outputPathArg] = process.argv.slice(2);
  if (!projectRootArg || !storyboardPathArg) {
    fail("usage: node generate-composition.mjs <projectRoot> <storyboardPath> [outputPath]");
  }
  const projectRoot = path.resolve(projectRootArg);
  const storyboardPath = path.resolve(storyboardPathArg);
  const outputPath = outputPathArg ? path.resolve(outputPathArg) : path.join(projectRoot, "index.html");
  const storyboard = loadStoryboard(storyboardPath);
  const scenesWithDurations = withDisplayDurations(storyboard);
  const renderedScenes = [];
  const cssParts = [];
  const jsParts = [];
  for (const scene of scenesWithDurations) {
    const parts = readSceneParts(projectRoot, scene.id);
    renderedScenes.push({ ...scene, __html: parts.html });
    cssParts.push(`/* ${scene.id} */\n${parts.css}`);
    jsParts.push(`/* ${scene.id} */\n${parts.js}`);
  }
  const html = buildHtml({
    storyboard,
    scenes: renderedScenes,
    styles: cssParts.join("\n\n"),
    scripts: jsParts.join("\n\n"),
  });
  fs.writeFileSync(outputPath, html, "utf8");
  console.log(JSON.stringify({ success: true, outputPath, sceneCount: storyboard.sceneCount, totalDuration: storyboard.totalDuration }, null, 2));
}

main();
