import type { Metadata } from "next";

import { validateRequest } from "@/lib/auth";
import { RedirectType, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SUPER ADMIN PAGE",
  description: "SUPER ADMIN PAGE",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user || user?.role !== "superadmin")
    return redirect("/denied", RedirectType.replace);

  return <>{children}</>;
}
