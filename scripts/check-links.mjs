import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const files = [];
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : files.push(path.join(directory, entry.name)));
walk(root);
const missing = new Set();
for (const file of files.filter((item) => item.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (!url || url.startsWith('/_astro/')) continue;
    const target = url.endsWith('/') ? path.join(root, url, 'index.html') : path.join(root, url);
    if (!fs.existsSync(target)) missing.add(`${path.relative(root, file)} → ${url}`);
  }
}
if (missing.size) { console.error([...missing].join('\n')); process.exit(1); }
console.log(`Links internos verificados em ${files.filter((item) => item.endsWith('.html')).length} páginas.`);
