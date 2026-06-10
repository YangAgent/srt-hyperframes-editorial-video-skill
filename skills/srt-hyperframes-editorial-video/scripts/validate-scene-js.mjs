#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateSceneJsTiming } from "./scene-js-timing-utils.mjs";

function fail(message, extra = {}) {
  console.error(JSON.stringify({ success: false, error: message, ...extra }, null, 2));
  process.exit(1);
}

function loadJson(filePath, label) {
  if (!fs.existsSync(filePath)) fail(`${label} not found: ${filePath}`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${label} is not valid JSON: ${filePath}`, { detail: error.message });
  }
}

function sceneNumber(sceneId) {
  const match = /^scene_(\d{3})$/.exec(sceneId);
  if (!match) fail(`invalid sceneId: ${sceneId}`);
  return match[1];
}

function sceneJsPath(projectRoot, sceneId) {
  return path.join(projectRoot, "src", "scenes", `Scene${sceneNumber(sceneId)}.js`);
}

function main() {
  const [projectRootArg, scenesDataPathArg] = process.argv.slice(2);
  if (!projectRootArg || !scenesDataPathArg) {
    fail("usage: node validate-scene-js.mjs <projectRoot> <scenesDataPath>");
  }

  const projectRoot = path.resolve(projectRootArg);
  const scenesDataPath = path.resolve(scenesDataPathArg);
  const scenesData = loadJson(scenesDataPath, "scenesData");
  if (!Array.isArray(scenesData) || scenesData.length === 0) {
    fail("scenesData must be a non-empty array", { scenesDataPath });
  }

  const errors = [];
  const warnings = [];
  const validatedSceneIds = [];

  for (const scene of scenesData) {
    if (!scene || typeof scene !== "object" || typeof scene.id !== "string") {
      errors.push("each scenesData item must include a string id");
      continue;
    }
    const jsPath = sceneJsPath(projectRoot, scene.id);
    if (!fs.existsSync(jsPath)) {
      errors.push(`${scene.id} missing scene JS: ${jsPath}`);
      continue;
    }

    const source = fs.readFileSync(jsPath, "utf8");
    const timingValidation = validateSceneJsTiming(source, {
      sceneId: scene.id,
      filePath: jsPath,
    });
    errors.push(...timingValidation.errors);
    warnings.push(...timingValidation.warnings);
    validatedSceneIds.push(scene.id);
  }

  if (errors.length || warnings.length) {
    console.log(`Editorial scene JS validation for ${projectRoot}`);
    for (const error of errors) console.log(`ERROR: ${error}`);
    for (const warning of warnings) console.log(`WARN: ${warning}`);
  }

  if (errors.length) {
    console.log(JSON.stringify({ success: false, errors, warnings, validatedSceneIds }, null, 2));
    process.exit(1);
  }

  console.log(JSON.stringify({ success: true, warnings, validatedSceneIds }, null, 2));
}

main();
