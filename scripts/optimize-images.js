const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RITUALS_DIR = path.join(__dirname, '../src/assets/images/rituals');
const OUT_DIR = path.join(__dirname, '../src/assets/images/rituals_optimized');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function processImage(file) {
  const input = path.join(RITUALS_DIR, file);
  const name = path.parse(file).name;
  const out = path.join(OUT_DIR, `${name}.webp`);
  try {
    await sharp(input).resize({ width: 1080, height: 2400, fit: 'inside' }).webp({ quality: 80 }).toFile(out);
    console.log('Optimized', file, '->', out);
  } catch (err) {
    console.error('Failed optimizing', file, err.message);
  }
}

fs.readdir(RITUALS_DIR, (err, files) => {
  if (err) return console.error('Read dir error', err.message);
  files.filter(f => /\.(jpg|jpeg|png)$/i.test(f)).forEach(f => processImage(f));
});
