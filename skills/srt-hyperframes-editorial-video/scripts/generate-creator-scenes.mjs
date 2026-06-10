#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function fail(error, extra = {}) {
  console.error(JSON.stringify({ success: false, error, ...extra }, null, 2));
  process.exit(1);
}

function parseCreatorNumber(creatorId) {
  const match = /^creator-(\d+)$/.exec(String(creatorId).trim());
  if (!match) fail(`invalid creatorId: ${creatorId}`);
  const number = Number(match[1]);
  if (!Number.isInteger(number) || number <= 0) fail(`invalid creator number: ${creatorId}`);
  return number;
}

function main() {
  const [storyboardPathArg, creatorId, scenesPerCreatorArg, outputPathArg] = process.argv.slice(2);
  if (!storyboardPathArg || !creatorId || !scenesPerCreatorArg || !outputPathArg) {
    fail("usage: node generate-creator-scenes.mjs <storyboardPath> <creatorId> <scenesPerCreator> <outputPath>");
  }
  const storyboardPath = path.resolve(storyboardPathArg);
  const outputPath = path.resolve(outputPathArg);
  const scenesPerCreator = Number(scenesPerCreatorArg);
  if (!Number.isInteger(scenesPerCreator) || scenesPerCreator <= 0) fail(`invalid scenesPerCreator: ${scenesPerCreatorArg}`);
  if (!fs.existsSync(storyboardPath)) fail(`storyboard not found: ${storyboardPath}`);

  const storyboard = JSON.parse(fs.readFileSync(storyboardPath, "utf8"));
  if (!storyboard || !Array.isArray(storyboard.scenes)) fail(`invalid storyboard: ${storyboardPath}`);

  const creatorNumber = parseCreatorNumber(creatorId);
  const startIndex = (creatorNumber - 1) * scenesPerCreator;
  const scenesData = storyboard.scenes.slice(startIndex, startIndex + scenesPerCreator);
  if (scenesData.length === 0) {
    fail(`creator has no scenes: ${creatorId}`, { sceneCount: storyboard.scenes.length, scenesPerCreator });
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(scenesData, null, 2), "utf8");
  console.log(JSON.stringify({ success: true, creatorId, outputPath, sceneIds: scenesData.map((scene) => scene.id) }, null, 2));
}

main();
