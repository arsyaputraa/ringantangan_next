"use server";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
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
