#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
let sharp = null;
try {
  sharp = require("sharp");
} catch (e) {
  // sharp not installed; we'll fallback to copying files
}

const RITUALS_DIR = path.join(__dirname, "../src/assets/images/rituals");
const OUT_DIR = path.join(__dirname, "../src/assets/images/rituals_optimized");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function processImage(file) {
  const input = path.join(RITUALS_DIR, file);
  const name = path.parse(file).name;
  if (sharp) {
    const out = path.join(OUT_DIR, `${name}.webp`);
    try {
      await sharp(input)
        .resize({ width: 1080, height: 2400, fit: "inside" })
        .webp({ quality: 80 })
        .toFile(out);
      console.log("Optimized", file, "->", out);
    } catch (err) {
      console.error("Failed optimizing", file, err.message);
    }
  } else {
    const ext = path.extname(file);
    const out = path.join(OUT_DIR, `${name}${ext}`);
    try {
      fs.copyFileSync(input, out);
      console.log("Copied (no sharp):", file, "->", out);
    } catch (err) {
      console.error("Failed copying", file, err.message);
    }
  }
}

if (!fs.existsSync(RITUALS_DIR)) {
  console.error("Rituals directory not found:", RITUALS_DIR);
  process.exit(0);
}

fs.readdir(RITUALS_DIR, (err, files) => {
  if (err) return console.error("Read dir error", err.message);
  files
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .forEach((f) => processImage(f));
});
