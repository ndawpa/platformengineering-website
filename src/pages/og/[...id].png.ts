import { getCollection } from 'astro:content';
import sharp from 'sharp';

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char);
const wrap = (title: string, limit = 34) => {
  const words = title.split(' '); const lines: string[] = []; let line = '';
  for (const word of words) { const next = `${line} ${word}`.trim(); if (next.length > limit && line) { lines.push(line); line = word; } else line = next; }
  if (line) lines.push(line); return lines.slice(0, 3);
};

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((article) => ({ params: { id: article.id }, props: { article } }));
}

export async function GET({ props }: { props: { article: Awaited<ReturnType<typeof getCollection<'articles'>>>[number] } }) {
  const { article } = props; const lines = wrap(article.data.title);
  const text = lines.map((line, index) => `<text x="90" y="${270 + index * 70}" font-family="Arial,sans-serif" font-size="58" font-weight="750" fill="${index === lines.length - 1 ? '#5eead4' : '#fff'}">${escapeXml(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#07111f"/><stop offset="1" stop-color="#0d2942"/></linearGradient><linearGradient id="m" x1="90" y1="76" x2="158" y2="144" gradientUnits="userSpaceOnUse"><stop stop-color="#38bdf8"/><stop offset="1" stop-color="#2dd4bf"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><circle cx="1000" cy="150" r="220" fill="#38bdf8" opacity=".06"/><rect x="90" y="76" width="68" height="68" rx="18" fill="#07111f" stroke="#1e3a52"/><path d="m103 101 21-12 21 12-21 12-21-12Z" fill="url(#m)" fill-opacity=".2" stroke="url(#m)" stroke-width="3.5" stroke-linejoin="round"/><path d="m103 116 21 13 21-13m-42-15v15l21 13 21-13v-15" fill="none" stroke="url(#m)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="103" cy="101" r="3.5" fill="#38bdf8"/><circle cx="124" cy="89" r="3.5" fill="#7dd3fc"/><circle cx="145" cy="101" r="3.5" fill="#2dd4bf"/><text x="180" y="118" font-family="monospace" font-size="19" fill="#38bdf8">${escapeXml(article.data.category.toUpperCase())}</text>${text}<text x="90" y="565" font-family="monospace" font-size="18" fill="#94a3b8">platformengineering.com.br</text></svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
}
