import { defineCollection, z } from 'astro:content';

/**
 * Approved articles live in src/content/blog/<locale>/<slug>.md.
 * Locale folders keep each language version independently reviewable.
 */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(170),
    locale: z.enum(['uz', 'ru', 'en']),
    translationKey: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    categories: z.array(z.string().min(1)).min(1),
    draft: z.boolean().default(false),
    relatedCourses: z.array(z.object({
      title: z.string().min(1),
      href: z.string().min(1),
    })).default([]),
  }),
});

export const collections = { blog };
