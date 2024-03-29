import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(2).max(50, { message: "panjang maksimum 50 karakter" }),
  content: z
    .string()
    .min(10)
    .max(500, { message: "panjang maksimum 500 karakter" }),
  isPublic: z.boolean(),
});
