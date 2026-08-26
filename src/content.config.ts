import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES, CONTENT_LEVELS } from './config/site';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(180),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    author: z.string(),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    level: z.enum(CONTENT_LEVELS).default('Intermediário'),
    prerequisites: z.array(z.string()).default([]),
    objectives: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
    revisionNotes: z.array(z.object({ date: z.coerce.date(), note: z.string() })).default([]),
    reviewedBy: z.string().default('Equipe editorial'),
    reviewAt: z.coerce.date().default(new Date('2027-02-26')),
    testedWith: z.array(z.string()).default([]),
    labRepository: z.url().optional(),
  }),
});

const labs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/labs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(180),
    category: z.enum(CATEGORIES),
    level: z.enum(CONTENT_LEVELS).default('Intermediário'),
    duration: z.number().int().positive(),
    updatedAt: z.coerce.date(),
    prerequisites: z.array(z.string()).default([]),
    objectives: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    certifications: z.array(z.enum(['CKA', 'CKAD', 'CKS'])).default([]),
    certificationDomain: z.string().optional(),
    testedWith: z.array(z.string()).default([]),
    repositoryPath: z.string(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { articles, labs };
