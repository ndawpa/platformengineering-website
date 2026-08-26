import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/content/articles');
const files = [];
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : /\.mdx?$/.test(entry.name) && files.push(path.join(directory, entry.name)));
walk(root);
const required = ['title', 'description', 'publishedAt', 'updatedAt', 'author', 'category', 'tags', 'draft', 'featured', 'level', 'objectives', 'sources', 'reviewAt', 'testedWith'];
const problems = [];
for (const file of files) { const source = fs.readFileSync(file, 'utf8'); const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''; for (const field of required) if (!new RegExp(`^${field}:`, 'm').test(frontmatter)) problems.push(`${path.relative(root, file)}: campo ${field} ausente`); const reviewAt = frontmatter.match(/^reviewAt:\s*(\d{4}-\d{2}-\d{2})/m)?.[1]; if (reviewAt && new Date(`${reviewAt}T23:59:59Z`) < new Date()) problems.push(`${path.relative(root, file)}: revisão editorial vencida em ${reviewAt}`); }
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`${files.length} conteúdos passaram pela auditoria editorial.`);
