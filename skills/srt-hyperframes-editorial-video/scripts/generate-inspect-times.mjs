#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(args) {
  const [storyboardPathArg] = args;
  if (!storyboardPathArg) {
    fail("usage: node generate-inspect-times.mjs <storyboardPath>");
  }
  return { storyboardPath: path.resolve(storyboardPathArg) };
}

function loadStoryboard(storyboardPath) {
  if (!fs.existsSync(storyboardPath)) fail(`storyboard not found: ${storyboardPath}`);
  const storyboard = JSON.parse(fs.readFileSync(storyboardPath, "utf8"));
  if (!storyboard || !Array.isArray(storyboard.scenes)) {
    fail(`invalid storyboard: ${storyboardPath}`);
  }
  return storyboard;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatSeconds(ms) {
  return (ms / 1000).toFixed(3).replace(/\.?0+$/, "");
}

function addTime(times, ms, totalDuration) {
  if (!Number.isFinite(ms)) return;
  const clamped = clamp(Math.round(ms), 0, Math.max(0, totalDuration));
  times.add(clamped);
}

function sceneDisplayDuration(scene, nextScene) {
  if (nextScene && Number.isFinite(nextScene.startTime)) {
    return Math.max(0, nextScene.startTime - scene.startTime);
  }
  return Math.max(0, scene.duration || 0);
}

function buildInspectTimes(storyboard) {
  const times = new Set();
  const totalDuration = Number.isFinite(storyboard.totalDuration)
    ? storyboard.totalDuration
    : storyboard.scenes.reduce((max, scene) => Math.max(max, (scene.startTime || 0) + (scene.duration || 0)), 0);

  storyboard.scenes.forEach((scene, index) => {
    const start = scene.startTime;
    if (!Number.isFinite(start)) return;

    const displayDuration = sceneDisplayDuration(scene, storyboard.scenes[index + 1]);
    if (displayDuration <= 0) return;
    const end = start + displayDuration;
    const safeEnd = Math.max(start, end - Math.min(200, displayDuration * 0.2));

    addTime(times, start + Math.min(200, displayDuration * 0.25), totalDuration);

    const skeletonOffset = displayDuration < 1600
      ? clamp(displayDuration * 0.55, 200, Math.max(200, displayDuration - 120))
      : 1000;
    addTime(times, start + skeletonOffset, totalDuration);

    if (Array.isArray(scene.segments)) {
      for (const segment of scene.segments) {
        if (!Number.isFinite(segment.relativeStart)) continue;
        addTime(times, start + segment.relativeStart + 120, totalDuration);
      }
    }

    addTime(times, safeEnd, totalDuration);
  });

  return [...times].sort((a, b) => a - b).map(formatSeconds);
}

function main() {
  const { storyboardPath } = parseArgs(process.argv.slice(2));
  const storyboard = loadStoryboard(storyboardPath);
  const times = buildInspectTimes(storyboard);
  if (times.length === 0) fail(`no inspect times generated from: ${storyboardPath}`);
  console.log(times.join(","));
}

main();
