"use server";

import { validateRequest } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import db from "@/lib/db";
import { postTable } from "@/lib/db/schema";
import { createPostSchema, editPostSchema, Post } from "@/types/post";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
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
      blogImage: values.blogImage,
      content: values.content,
      title: values.title,
      subtitle: values.subtitle,
      isPublic: values.isPublic,
    };

    console.log("data udah di server", postData);

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

    const imageArray = await values.blogImage[0].arrayBuffer();
    const imageBuffer = new Uint8Array(imageArray);

    const imageUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: "ringantangan_preset",
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(imageBuffer);
    });

    console.log("ini image upload", imageUpload);

    if (!imageUpload) {
      return {
        error: `Failed to upload Image`,
      };
    }

    await db.insert(postTable).values({
      title: validatedFields.data.title,
      subtitle: validatedFields.data.subtitle,

      content: validatedFields.data.content,
      createdBy: user.email,
      isPublic: validatedFields.data.isPublic,
      id: generateId(16),
    });

    revalidatePath("/blog");

    return {
      success: "Post added",
    };
  } catch (error: any) {
    return {
      error: `${error}`,
    };
  }
}

export async function POSTEditBlog(values: Post) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role === "user") {
      return {
        error: "unauthorized",
      };
    }

    const postData: z.infer<typeof editPostSchema> = {
      content: values.content!,
      title: values.title,
      subtitle: values.subtitle!,
      isPublic: values.isPublic,
    };

    const validatedFields = editPostSchema.safeParse(postData);

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

    await db
      .update(postTable)
      .set({
        title: validatedFields.data.title,
        subtitle: validatedFields.data.subtitle,
        content: validatedFields.data.content,
        updatedBy: user.email,
        lastUpdatedDate: new Date().toISOString(),
        isPublic: validatedFields.data.isPublic,
      })
      .where(eq(postTable.id, values.id));

    revalidatePath("/blog");

    return {
      success: "edit success",
    };
  } catch (error: any) {
    return {
      error: `${error}`,
    };
  }
}

export async function POSTToggleBlogVisibility({
  id,
  show,
}: {
  id: string;
  show: boolean;
}) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role === "user") {
      return {
        error: "unauthorized",
      };
    }

    await db
      .update(postTable)
      .set({ isPublic: show })
      .where(eq(postTable.id, id));

    revalidatePath("/blog");

    return {
      success: "Post deleted",
    };
  } catch (error: any) {
    return {
      error: `${error}`,
    };
  }
}

export async function DELETEpost({ id }: { id: string }) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role === "user") {
      return {
        error: "unauthorized",
      };
    }

    await db.delete(postTable).where(eq(postTable.id, id));

    revalidatePath("/blog");

    return {
      success: "Post Deleted",
    };
  } catch (error: any) {
    return {
      error: `${error}`,
    };
  }
}
