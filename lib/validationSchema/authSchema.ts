import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "invalid email address" }),
    fullName: z
      .string()
      .min(3, { message: "full name must be at least 3 characters" })
      .max(40, { message: "cant be more than 40 characters" }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password doesn't match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});
