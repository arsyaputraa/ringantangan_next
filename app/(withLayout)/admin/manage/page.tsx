import { validateRequest } from "@/lib/auth";
import { RedirectType, redirect } from "next/navigation";
import React from "react";
import AdminTable from "./adminTable";
import db from "@/lib/db";
import { eq, getTableColumns, or } from "drizzle-orm";
import { userTable } from "@/lib/db/schema";
import { UserType } from "@/types/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ManageAdminPage = async () => {
  const { user } = await validateRequest();

  if (!user || user?.role !== "superadmin")
    return redirect("/denied", RedirectType.replace);

  const { hashedPassword, ...rest } = getTableColumns(userTable);

  const adminList = await db
    .select(rest)
    .from(userTable)
    .where(or(eq(userTable.role, "admin"), eq(userTable.role, "superadmin")));

  return (
    <div className="w-full mx-auto min-h-[calc(100vh-100px)] flex flex-col items-center">
      <h1 className="text-xl font-bold">MANAGE ADMIN</h1>
      <div className="max-w-2xl w-full mt-5">
        {adminList.length === 1 && (
          <div className="flex justify-center items-center flex-col gap-2 mt-5">
            <p>
              Saat ini, cuma kamu yang jadi admin, kamu bisa tambahin yang lain
              dengan klik ini
            </p>
            <Button asChild>
              <Link href="/admin/manage/add">Tambah Admin</Link>
            </Button>
          </div>
        )}
        {adminList.length !== 1 && <AdminTable data={adminList} />}
      </div>
    </div>
  );
};

export default ManageAdminPage;
