"use server";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { postTable } from "@/lib/db/schema";
import { createPostSchema } from "@/types/post";
import { generateId } from "lucia";
import { z } from "zod";

export async function POSTCreateBlog(values: z.infer<typeof createPostSchema>) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role === "user") {
      return {
        error: "unauthorized",
      };
    }

    const postData = {
      content: values.content,
      title: values.title,
      isPublic: values.isPublic,
    };

    const validatedFields = createPostSchema.safeParse(postData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      let errorMessage = "";

      validatedFields.error.issues.forEach((issue) => {
        errorMessage = `${errorMessage}${issue.path[0]} : ${issue.message}. `;
      });
      return {
        error: errorMessage,
      };
    }

    await db.insert(postTable).values({
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      createdBy: user.id,
      isPublic: validatedFields.data.isPublic,
      id: generateId(8),
    });

    return {
      success: "Post added",
    };
  } catch (error: any) {
    return {
      error: `${error}`,
    };
  }
}
