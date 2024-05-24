import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { eq, getTableColumns, or } from "drizzle-orm";
import { RedirectType, redirect } from "next/navigation";
import { AddAdminDialog } from "./addAdminDialog";
import AdminTable from "./adminTable";
import { getUserTableAllowedColumn } from "@/lib/functions";

const ManageAdminPage = async () => {
  const adminList = await db
    .select({ ...getUserTableAllowedColumn() })
    .from(userTable)
    .where(or(eq(userTable.role, "admin"), eq(userTable.role, "superadmin")));

  return (
    <div className="w-full mx-auto min-h-[calc(100vh-100px)] flex flex-col items-center">
      <h1 className="text-xl font-bold">MANAGE ADMIN</h1>
      <div className="max-w-2xl w-full mt-5 relative">
        <div className="flex justify-end px-2 md:px-0 py-2">
          <AddAdminDialog />
        </div>

        {adminList.length === 1 && (
          <div className="flex justify-center items-center flex-col gap-2 mt-5">
            <p>Saat ini, cuma kamu yang jadi admin.</p>
          </div>
        )}
        {adminList.length !== 1 && <AdminTable data={adminList} />}
      </div>
    </div>
  );
};

export default ManageAdminPage;
