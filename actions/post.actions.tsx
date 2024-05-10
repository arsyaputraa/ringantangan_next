"use server";

import { validateRequest } from "@/lib/auth";
import cloudinary, {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "@/lib/cloudinary";
import db from "@/lib/db";
import { postTable } from "@/lib/db/schema";
import { createPostSchema, editPostSchema, Post } from "@/types/post";
import { File } from "buffer";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// export async function POSTCreateBlog(values: z.infer<typeof createPostSchema>) {
export async function POSTCreateBlog(formData: FormData) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role === "user") {
      return {
        error: "unauthorized",
      };
    }

    const postData = {
      blogImage: formData.get("blogImage"),
      content: formData.get("content"),
      title: formData.get("title"),
      subtitle: formData.get("subtitle"),
      isPublic: formData.get("isPublic") === "true",
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
    // console.log(typeof validatedFields.data.blogImage === "string");
    // console.log("key", Object.keys(validatedFields.data.blogImage));
    // console.log("value", Object.values(validatedFields.data.blogImage));

    const postId = generateId(16);
    let imageUpload;

    if (
      !!validatedFields.data.blogImage &&
      !!(typeof validatedFields.data.blogImage !== "string")
    ) {
      imageUpload = await cloudinaryUploadImage({
        fileData: validatedFields.data.blogImage,
        publicId: `${postId}_${new Date().toISOString()}`,
      });
      if (!imageUpload) {
        return {
          error: `Failed to upload Image`,
        };
      }
    }

    await db.insert(postTable).values({
      title: validatedFields.data.title,
      subtitle: validatedFields.data.subtitle,
      imgUrl: !!imageUpload ? imageUpload.secure_url : "",
      imgPublicId: !!imageUpload ? imageUpload.public_id : "",
      content: validatedFields.data.content,
      createdBy: user.email,
      isPublic: validatedFields.data.isPublic,
      id: postId,
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

export async function POSTEditBlog(formData: FormData) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role === "user") {
      return {
        error: "unauthorized",
      };
    }

    const postData = {
      blogImage: formData.get("blogImage"),
      content: formData.get("content"),
      title: formData.get("title"),
      subtitle: formData.get("subtitle"),
      isPublic: formData.get("isPublic") === "true",
      isDeleteImage: formData.get("isDeleteImage") === "true",
      id: formData.get("id"),
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
    const postId = formData.get("id") as string;
    const imgPublicId = formData.get("imgPublicId") as string;

    let imageUpload;
    if (
      !!validatedFields.data.blogImage &&
      !!(typeof validatedFields.data.blogImage !== "string")
    ) {
      // Update image logic
      if (!!imgPublicId) {
        imageUpload = await cloudinaryUploadImage({
          fileData: validatedFields.data.blogImage,
          publicId: imgPublicId.split("blogpost_image/")[1],
        });
      } else {
        // add new image to current post
        imageUpload = await cloudinaryUploadImage({
          fileData: validatedFields.data.blogImage,
          publicId: `${postId}_${new Date().toISOString()}`,
        });
      }

      if (!imageUpload) {
        return {
          error: `Failed to upload Image`,
        };
      }
      await db
        .update(postTable)
        .set({
          title: validatedFields.data.title,
          subtitle: validatedFields.data.subtitle,
          content: validatedFields.data.content,
          updatedBy: user.email,
          imgPublicId: imageUpload.public_id,
          imgUrl: imageUpload.secure_url,
          lastUpdatedDate: new Date().toISOString(),
          isPublic: validatedFields.data.isPublic,
        })
        .where(eq(postTable.id, postId));
    } else if (
      !!validatedFields.data.isDeleteImage &&
      !!(typeof validatedFields.data.blogImage === "string")
    ) {
      if (!!imgPublicId) {
        const deletedImage = await cloudinaryDeleteImage(imgPublicId);
        if (!deletedImage) {
          return { error: "Failed when trying to delete image" };
        }

        await db
          .update(postTable)
          .set({
            title: validatedFields.data.title,
            subtitle: validatedFields.data.subtitle,
            content: validatedFields.data.content,
            updatedBy: user.email,
            imgPublicId: "",
            imgUrl: "",
            lastUpdatedDate: new Date().toISOString(),
            isPublic: validatedFields.data.isPublic,
          })
          .where(eq(postTable.id, postId));
      }
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
      .where(eq(postTable.id, postId));

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

    const [deletedPost] = await db
      .delete(postTable)
      .where(eq(postTable.id, id))
      .returning();

    if (!!deletedPost?.imgPublicId)
      await cloudinaryDeleteImage(deletedPost.imgPublicId);

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

export async function DELETEImage({ publicId }: { publicId: string }) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role === "user") {
      return {
        error: "unauthorized",
      };
    }

    await cloudinaryDeleteImage(publicId);

    return {
      success: "Image Deleted",
    };
  } catch (error: any) {
    return {
      error: `${error}`,
    };
  }
}
