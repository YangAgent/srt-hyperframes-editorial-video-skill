#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templateDir = path.join(skillRoot, "assets", "template");
const themesDir = path.join(skillRoot, "themes");
const projectsDirName = "hyperframes-editorial-video-projects";

function fail(message) {
  console.error(JSON.stringify({ success: false, error: message }, null, 2));
  process.exit(1);
}

function parseArgs(args) {
  let srtPath = "";
  let theme = "";
  let projectRoot = "";
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--srt-path") {
      srtPath = args[i + 1] || "";
      i += 1;
    } else if (arg === "--theme") {
      theme = args[i + 1] || "";
      i += 1;
    } else if (arg === "--project-root") {
      projectRoot = args[i + 1] || "";
      i += 1;
    } else {
      fail(`unknown argument: ${arg}`);
    }
  }
  return { srtPath, theme, projectRoot };
}

function timestampName() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else if (entry.isSymbolicLink()) {
      const target = fs.readlinkSync(from);
      try {
        fs.symlinkSync(target, to);
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
      }
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function main() {
  const { srtPath: srtPathArg, theme, projectRoot: projectRootArg } = parseArgs(process.argv.slice(2));
  if (!srtPathArg) fail("--srt-path is required");
  if (!theme) fail("--theme is required");

  const srtPath = path.resolve(srtPathArg);
  if (!fs.existsSync(srtPath)) fail(`SRT file not found: ${srtPath}`);

  const themeDir = path.join(themesDir, theme);
  const tokensPath = path.join(themeDir, "tokens.css");
  if (!fs.existsSync(tokensPath)) fail(`theme not found: ${theme}`);
  if (!fs.existsSync(templateDir)) fail(`template not found: ${templateDir}`);

  const projectRoot = projectRootArg
    ? path.resolve(projectRootArg)
    : path.join(path.dirname(srtPath), projectsDirName, timestampName());

  if (fs.existsSync(projectRoot) && fs.readdirSync(projectRoot).length > 0) {
    fail(`projectRoot exists and is not empty: ${projectRoot}`);
  }

  fs.mkdirSync(projectRoot, { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "styles"), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "src", "scenes"), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "scene-plans"), { recursive: true });

  copyDir(path.join(templateDir, "styles"), path.join(projectRoot, "styles"));
  fs.copyFileSync(tokensPath, path.join(projectRoot, "styles", "tokens.css"));
  fs.copyFileSync(path.join(templateDir, "index.html"), path.join(projectRoot, "index.html"));
  fs.writeFileSync(path.join(projectRoot, ".theme"), `${theme}\n`, "utf8");

  const result = {
    success: true,
    skillRoot,
    projectRoot,
    projectBaseDir: path.dirname(projectRoot),
    srtPath,
    theme,
    referencesRoot: path.join(skillRoot, "references"),
    scriptsRoot: path.join(skillRoot, "scripts"),
    themesRoot: themesDir,
  };
  console.log(JSON.stringify(result, null, 2));
}

main();
