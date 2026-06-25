import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be 100 characters or less")
    .regex(slugRegex, "Only lowercase letters, numbers, and hyphens"),
  status: z.enum(["active", "inactive"]),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
