import type { Metadata } from "next";

import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ADMIN PAGE",
  description: "ADMIN PAGE",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (user?.role !== "admin" && user?.role !== "superadmin")
    return redirect("/denied");

  return <>{children}</>;
}
