import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(2).max(50, { message: "panjang maksimum 50 karakter" }),
  subtitle: z
    .string()
    .min(2)
    .max(100, { message: "panjang maksimum 100 karakter" }),

  content: z
    .string()
    .min(10)
    .max(2000, { message: "panjang maksimum 500 karakter" }),
  isPublic: z.boolean(),
  blogImage: z.any(),
});

export type CreatePostType = z.infer<typeof createPostSchema>;

export const editPostSchema = z.object({
  title: z.string().min(2).max(50, { message: "panjang maksimum 50 karakter" }),
  subtitle: z
    .string()
    .min(2)
    .max(100, { message: "panjang maksimum 100 karakter" }),
  content: z
    .string()
    .min(10)
    .max(2000, { message: "panjang maksimum 500 karakter" }),
  isPublic: z.boolean(),
});

export interface Post {
  id: string;
  createdBy: string;
  updatedBy?: string;
  title: string;
  subtitle?: string;
  content?: string;
  picture?: string;
  createdDate: string;
  lastUpdatedDate?: string;
  isPublic: boolean;
  likeCount: number;
}
