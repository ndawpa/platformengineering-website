import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';
import { articlePath, byNewest } from '../utils/content';
export async function GET(context: { site?: URL }) { const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(byNewest); return rss({ title: SITE.name, description: SITE.description, site: context.site ?? SITE.url, items: articles.map((article) => ({ title: article.data.title, description: article.data.description, pubDate: article.data.publishedAt, link: articlePath(article), categories: [article.data.category, ...article.data.tags] })), customData: `<language>${SITE.language}</language>` }); }
