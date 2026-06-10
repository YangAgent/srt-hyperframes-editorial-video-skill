#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function fail(message, extra = {}) {
  console.error(JSON.stringify({ success: false, error: message, ...extra }, null, 2));
  process.exit(1);
}

function main() {
  const [logPathArg] = process.argv.slice(2);
  if (!logPathArg) {
    fail("usage: node validate-render-log.mjs <renderLogPath>");
  }

  const logPath = path.resolve(logPathArg);
  if (!fs.existsSync(logPath)) fail(`render log not found: ${logPath}`);

  const log = fs.readFileSync(logPath, "utf8");
  const errors = [];
  const warnings = [];

  const fatalPatterns = [
    {
      id: "timeline_not_registered",
      pattern: /Sub-composition timelines not registered|timelines? not registered|window\.__timelines/i,
      message: "timeline was not registered; output may be black or blank",
    },
    {
      id: "q_selector_string_misuse",
      pattern: /q\([^)]*\)\.(?:querySelector|querySelectorAll|textContent|innerText|innerHTML|style|classList|dataset)|q\(\.\.\.\)\.(?:querySelector|querySelectorAll)|querySelectorAll is not a function|querySelector is not a function/i,
      message: "q(...) appears to be used as a DOM element; it returns a selector string",
    },
    {
      id: "javascript_exception",
      pattern: /(?:TypeError|ReferenceError|SyntaxError|Error):|UnhandledPromiseRejection|pageerror/i,
      message: "render log contains a JavaScript exception",
    },
  ];

  const warningPatterns = [
    {
      id: "gsap_target_not_found",
      pattern: /GSAP target .* not found|target .* not found/i,
      message: "GSAP could not find at least one animation target; a scene element or animation may be missing",
    },
  ];

  for (const check of fatalPatterns) {
    if (check.pattern.test(log)) errors.push(`${check.id}: ${check.message}`);
  }
  for (const check of warningPatterns) {
    if (check.pattern.test(log)) warnings.push(`${check.id}: ${check.message}`);
  }

  if (errors.length || warnings.length) {
    console.log(`Render log validation for ${logPath}`);
    for (const error of errors) console.log(`ERROR: ${error}`);
    for (const warning of warnings) console.log(`WARN: ${warning}`);
  }

  if (errors.length) {
    console.log(JSON.stringify({ success: false, errors, warnings, logPath }, null, 2));
    process.exit(1);
  }

  console.log(JSON.stringify({ success: true, warnings, logPath }, null, 2));
}

main();
