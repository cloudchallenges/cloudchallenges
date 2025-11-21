import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";


const challenges = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./content/challenges",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      uid: z.string().optional(),
      services: z
        .record(z.array(z.string()))
        .default({ aws: [] })
        .optional(),
      tags: z.array(z.string()).default([]),
      level: z
        .enum(["beginner", "easy", "intermediate", "advanced", "expert"])
        .optional(),
      duration_hours: z.number().optional(),
      starter_repo: z.string().url().optional(),
      summary: z.string().optional(),
      created_at: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

const solutions = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./content/solutions",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      challenge_uid: z.string(),
      solution_repo: z.string().url().optional(),
      tool: z.string().optional(),
      status: z
        .enum(["draft", "in-progress", "complete"])
        .default("draft"),
      video: z.string().url().optional(),
      notes: z.string().optional(),
      created_at: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

export const collections = { challenges, solutions };
