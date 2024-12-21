import { z } from "zod";

export const promptFormSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon is required"),
  userId: z.string().optional(),
});

export type PromptFormValues = z.infer<typeof promptFormSchema>;
