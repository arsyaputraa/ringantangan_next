import { Toaster } from "@/components/ui/toaster";
import { validateRequest } from "@/lib/auth";
import SessionProvider from "@/providers/SessionProviders";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ringantangan",
  description: "Kebaikan antar sesama",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  return (
    <html lang="en">
      <body className={cn(`${inter.className}`)}>
        <main className="mx-auto min-h-[100vh] max-w-[1440px] w-full relative">
          <SessionProvider value={session}>
            {children}
            <Toaster />
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
