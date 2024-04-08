"use server";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import {
  createZodValidationsErrorMessage,
  getUserTableAllowedColumn,
} from "@/lib/functions";
import { addAdminSchema } from "@/lib/validationSchema/adminSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POSTchangeAdminRole({
  id,
  newRole,
}: {
  id: string;
  newRole: "admin" | "superadmin" | "user";
}) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role !== "superadmin") {
      return {
        error: "unauthorized",
      };
    }

    const res = await db
      .update(userTable)
      .set({ role: newRole })
      .where(eq(userTable.id, id))
      .returning({ email: userTable.email, role: userTable.role });

    revalidatePath("/admin/manage");

    return {
      success: res[0]
        ? `User with email ${res[0].email} role has changed to ${res[0].role}`
        : "User role changed",
    };
  } catch (error: any) {
    return {
      error: `${error}`,
    };
  }
}

export async function POSTaddAdmin({ email }: { email: string }) {
  try {
    const validateFields = addAdminSchema.safeParse({ email });

    if (!validateFields.success) {
      const errorMessage = createZodValidationsErrorMessage(validateFields);
      return {
        error: errorMessage,
      };
    }

    const { user } = await validateRequest();

    if (!user || user.role !== "superadmin") {
      return {
        error: "unauthorized",
      };
    }

    const [userExisted] = await db
      .select({ ...getUserTableAllowedColumn() })
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!userExisted) {
      return {
        error:
          "User has not register an account, make sure they register before adding them as admin",
      };
    }

    if (userExisted.role === "admin" || userExisted.role === "superadmin") {
      return {
        error: "User is already an admin",
      };
    }

    const res = await db
      .update(userTable)
      .set({ role: "admin" })
      .where(eq(userTable.id, userExisted.id))
      .returning({ email: userTable.email, role: userTable.role });

    revalidatePath("/admin/manage");

    return {
      success: res[0]
        ? `User with email ${res[0].email} role has changed to ${res[0].role}`
        : "User role changed",
    };
  } catch (error: any) {
    return {
      error: `${error}`,
    };
  }
}
