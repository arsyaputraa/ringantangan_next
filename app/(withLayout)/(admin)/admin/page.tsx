import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminPage = async () => {
  const { user } = await validateRequest();

  if (!user) return redirect("/signin");

  if (user.role === "admin" || user.role === "superadmin")
    return <div>admin - admin only</div>;
  else return redirect("/");
};

export default AdminPage;
