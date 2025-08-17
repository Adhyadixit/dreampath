import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
const imagesRoot = path.join(publicDir, 'images');
const outFile = path.join(publicDir, 'images-manifest.json');

function isImage(file) {
  return /(\.png|\.jpg|\.jpeg|\.gif|\.webp|\.svg|\.bmp|\.tiff|\.ico)$/i.test(file);
}

function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full, rel));
    } else {
      if (isImage(entry.name)) files.push(rel.replace(/\\/g, '/'));
    }
  }
  return files;
}

function buildManifest() {
  const manifest = {};
  if (!fs.existsSync(imagesRoot)) {
    console.warn('No images directory found at', imagesRoot);
  } else {
    const categories = fs.readdirSync(imagesRoot, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const category of categories) {
      const catDir = path.join(imagesRoot, category);
      const files = walk(catDir, `images/${category}`);
      // Sort by name for stable order
      files.sort((a, b) => a.localeCompare(b));
      manifest[category] = files.map((p) => `/${p}`);
    }
  }

  fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));
  console.log('Wrote manifest to', outFile);
}

buildManifest();
