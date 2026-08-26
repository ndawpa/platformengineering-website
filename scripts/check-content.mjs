import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/content/articles');
const files = [];
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : /\.mdx?$/.test(entry.name) && files.push(path.join(directory, entry.name)));
walk(root);
const required = ['title', 'description', 'publishedAt', 'updatedAt', 'author', 'category', 'tags', 'draft', 'featured', 'level', 'objectives'];
const problems = [];
for (const file of files) { const source = fs.readFileSync(file, 'utf8'); const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''; for (const field of required) if (!new RegExp(`^${field}:`, 'm').test(frontmatter)) problems.push(`${path.relative(root, file)}: campo ${field} ausente`); }
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`${files.length} conteúdos passaram pela auditoria editorial.`);
