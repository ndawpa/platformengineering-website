import type { CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export const articlePath = (article: Article) => `/artigos/${article.id}/`;

export const formatDate = (date: Date) => new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(date);

export const readingTime = (body = '') => Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 210));

export const byNewest = (a: Article, b: Article) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
