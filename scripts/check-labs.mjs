import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = path.resolve('src/content/labs');
const files = [...fs.globSync('**/*.mdx', { cwd: root })];
const problems = [];
const requiredFields = ['format', 'scenario', 'successCriteria', 'constraints'];
const requiredSections = [
  [/make setup/, 'comando de preparação'],
  [/make verify/, 'verificação automatizada'],
  [/make cleanup/, 'comando de limpeza'],
];

for (const relative of files) {
  const source = fs.readFileSync(path.join(root, relative), 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) { problems.push(`${relative}: frontmatter ausente`); continue; }
  const data = YAML.parse(match[1]);
  for (const field of requiredFields) if (!(field in data)) problems.push(`${relative}: campo ${field} ausente`);
  for (const [pattern, label] of requiredSections) if (!pattern.test(source)) problems.push(`${relative}: seção ${label} ausente`);
  if (!relative.startsWith('docker/') && data.format !== 'Guiado' && !/<details>[\s\S]*?<summary>.*(Solução|Dica)/i.test(source)) {
    problems.push(`${relative}: desafio sem dicas ou solução recolhível`);
  }
}

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`${files.length} labs passaram pela auditoria de profundidade.`);
