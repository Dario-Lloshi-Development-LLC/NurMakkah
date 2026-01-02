#!/usr/bin/env node
const fs = require("fs").promises;
const path = require("path");

const ROOT = process.cwd();
const EXCLUDE_DIRS = new Set([
  ".git",
  "node_modules",
  "android",
  "nur_makkah",
  "hajj_app_flutter",
  "archive",
  "build",
]);
const FILE_EXT_WHITELIST = new Set([
  ".js",
  ".ts",
  ".tsx",
  ".json",
  ".md",
  ".yaml",
  ".yml",
  ".txt",
  ".html",
  ".css",
  ".scss",
  ".sh",
]);

const TRANSFORMS = [
  { from: /\bhajj_app\b/gi, to: "nur_makkah" },
  { from: /\bhajj_rules\b/gi, to: "nur_makkah_rules" },
  { from: /\bHajjApp\b/g, to: "NurMakkah" },
  { from: /\bHajj\b/g, to: "Nur Makkah" },
  { from: /\bhajj\b/gi, to: "nur_makkah" },
];

const isVerbose =
  process.env.DEBUG === "1" || process.env.NODE_ENV !== "production";

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (EXCLUDE_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full);
    else if (e.isFile()) await processFile(full);
  }
}

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!FILE_EXT_WHITELIST.has(ext)) return;
  try {
    let content = await fs.readFile(filePath, "utf8");
    let original = content;
    for (const t of TRANSFORMS) content = content.replace(t.from, t.to);
    if (content !== original) {
      await fs.copyFile(filePath, filePath + ".bak");
      await fs.writeFile(filePath, content, "utf8");
      if (isVerbose) console.info("Updated:", path.relative(ROOT, filePath));
    }
  } catch (err) {
    console.error("err", filePath, err && err.message ? err.message : err);
  }
}

(async function main() {
  if (isVerbose)
    console.info(
      "Running safe rename: nur_makkah -> nur_makkah (excluding android/ and native packages)",
    );
  await walk(ROOT);
  if (isVerbose)
    console.info("Done. Backups with .bak created for changed files.");
})();
