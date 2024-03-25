import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./_component/Navbar";
import { validateRequest } from "@/lib/auth";
import SessionProvider from "@/providers/SessionProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="mx-auto max-w-[1440px] w-full relative">
          <SessionProvider value={session}>
            <Navbar />
            {children}
            <Toaster />
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
