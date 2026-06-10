#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function fail(message, extra = {}) {
  console.error(JSON.stringify({ success: false, error: message, ...extra }, null, 2));
  process.exit(1);
}

function parseTimeCode(timeStr) {
  const match = timeStr.trim().match(/(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/);
  if (!match) throw new Error(`invalid timecode: ${timeStr}`);
  const [, h, m, s, ms] = match;
  return Number(h) * 3600000 + Number(m) * 60000 + Number(s) * 1000 + Number(ms);
}

function parseSrt(content) {
  return content
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim().split(/\r?\n/))
    .filter((lines) => lines.length >= 3)
    .map((lines) => {
      const index = Number.parseInt(lines[0].trim(), 10);
      const timeMatch = lines[1].match(/(.+?)\s*-->\s*(.+)/);
      if (!Number.isInteger(index) || !timeMatch) return null;
      return {
        index,
        startMs: parseTimeCode(timeMatch[1]),
        endMs: parseTimeCode(timeMatch[2]),
        text: lines.slice(2).join("\n").trim(),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.index - b.index);
}

function validateGroups(groups, totalSubtitles) {
  const errors = [];
  if (!Array.isArray(groups) || groups.length === 0) return ["groups must be a non-empty array"];
  if (groups[0].fromIndex !== 1) errors.push(`first group fromIndex must be 1, got ${groups[0].fromIndex}`);
  if (groups.at(-1).toIndex !== totalSubtitles) {
    errors.push(`last group toIndex must be ${totalSubtitles}, got ${groups.at(-1).toIndex}`);
  }
  groups.forEach((group, index) => {
    const expectedSceneId = `scene_${String(index + 1).padStart(3, "0")}`;
    if (group.sceneId !== expectedSceneId) errors.push(`group ${index + 1} sceneId must be ${expectedSceneId}`);
    if (!Number.isInteger(group.fromIndex) || !Number.isInteger(group.toIndex)) {
      errors.push(`${group.sceneId || `group ${index + 1}`} fromIndex/toIndex must be integers`);
    } else if (group.fromIndex > group.toIndex) {
      errors.push(`${group.sceneId} fromIndex is greater than toIndex`);
    }
    if (index > 0 && group.fromIndex !== groups[index - 1].toIndex + 1) {
      errors.push(`${group.sceneId} is not continuous with previous group`);
    }
  });
  return errors;
}

function buildScenes(subtitles, groups) {
  const byIndex = new Map(subtitles.map((sub) => [sub.index, sub]));
  return groups.map((group) => {
    const groupSubs = [];
    for (let i = group.fromIndex; i <= group.toIndex; i += 1) {
      const sub = byIndex.get(i);
      if (!sub) throw new Error(`subtitle index not found: ${i}`);
      groupSubs.push(sub);
    }
    const startTime = groupSubs[0].startMs;
    const segments = groupSubs.map((sub, index) => ({
      text: sub.text,
      relativeStart: index === 0 ? 0 : sub.startMs - startTime,
      relativeDuration: sub.endMs - sub.startMs,
    }));
    const duration = Math.max(...segments.map((segment) => segment.relativeStart + segment.relativeDuration));
    return {
      id: group.sceneId,
      startTime,
      duration,
      segments,
    };
  });
}

function validateStoryboard(storyboard) {
  const errors = [];
  if (storyboard.sceneCount !== storyboard.scenes.length) errors.push("sceneCount does not match scenes length");
  storyboard.scenes.forEach((scene, index) => {
    const expectedSceneId = `scene_${String(index + 1).padStart(3, "0")}`;
    if (scene.id !== expectedSceneId) errors.push(`scene id must be ${expectedSceneId}`);
    if (!Array.isArray(scene.segments) || scene.segments.length === 0) errors.push(`${scene.id} missing segments`);
    let computed = 0;
    let prevStart = -1;
    for (const [segmentIndex, segment] of scene.segments.entries()) {
      if (typeof segment.relativeStart !== "number" || segment.relativeStart < 0) {
        errors.push(`${scene.id} segment[${segmentIndex}] invalid relativeStart`);
      }
      if (typeof segment.relativeDuration !== "number" || segment.relativeDuration <= 0) {
        errors.push(`${scene.id} segment[${segmentIndex}] invalid relativeDuration`);
      }
      if (segment.relativeStart < prevStart) errors.push(`${scene.id} segments are not ordered`);
      prevStart = segment.relativeStart;
      computed = Math.max(computed, segment.relativeStart + segment.relativeDuration);
    }
    if (computed !== scene.duration) errors.push(`${scene.id} duration must be ${computed}, got ${scene.duration}`);
  });
  const expectedTotal = storyboard.scenes.length
    ? storyboard.scenes.at(-1).startTime + storyboard.scenes.at(-1).duration
    : 0;
  if (storyboard.totalDuration !== expectedTotal) errors.push(`totalDuration must be ${expectedTotal}`);
  return errors;
}

function main() {
  const [srtPathArg, groupsPathArg, outputPathArg] = process.argv.slice(2);
  if (!srtPathArg || !groupsPathArg || !outputPathArg) {
    fail("usage: node generate-storyboard.mjs <srtPath> <groupsPath> <outputPath>");
  }
  const srtPath = path.resolve(srtPathArg);
  const groupsPath = path.resolve(groupsPathArg);
  const outputPath = path.resolve(outputPathArg);
  if (!fs.existsSync(srtPath)) fail(`SRT file not found: ${srtPath}`);
  if (!fs.existsSync(groupsPath)) fail(`groups.json not found: ${groupsPath}`);

  const subtitles = parseSrt(fs.readFileSync(srtPath, "utf8"));
  if (subtitles.length === 0) fail(`no subtitles found in: ${srtPath}`);
  const groupsData = JSON.parse(fs.readFileSync(groupsPath, "utf8"));
  const groups = groupsData.groups;
  const groupErrors = validateGroups(groups, subtitles.length);
  if (groupErrors.length) fail("groups validation failed", { errors: groupErrors });

  const scenes = buildScenes(subtitles, groups);
  const storyboard = {
    totalDuration: scenes.length ? scenes.at(-1).startTime + scenes.at(-1).duration : 0,
    sceneCount: scenes.length,
    scenes,
  };
  const storyboardErrors = validateStoryboard(storyboard);
  if (storyboardErrors.length) fail("storyboard validation failed", { errors: storyboardErrors });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(storyboard, null, 2), "utf8");
  console.log(JSON.stringify({ success: true, storyboardPath: outputPath, sceneCount: storyboard.sceneCount, totalDuration: storyboard.totalDuration }, null, 2));
}

main();
