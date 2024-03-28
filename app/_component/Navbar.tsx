"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/SessionProviders";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const navbarItems = [
  {
    name: "Tentang Kami",
    url: "/",
  },
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Announcement",
    url: "/announcement",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useSession();
  return (
    <header className="max-w-[1440px] mx-auto px-5 flex items-center justify-between">
      <h1 className="font-bold text-lg">Ringantangan</h1>
      <ul className="flex justify-center gap-5 py-5">
        {navbarItems.map((item, idx) => {
          const isActive = `/${pathname.split("/").at(-1)}` === item.url;
          return (
            <li key={`${item.name}-${idx}`}>
              <Button
                asChild
                size="sm"
                variant={isActive ? "outline" : "ghost"}
                className={cn(isActive && "font-semibold ")}
              >
                <Link href={item.url}>{item.name}</Link>
              </Button>
            </li>
          );
        })}
      </ul>
      <span className="flex items-center gap-2 text-sm font-bold">
        <p>Hi, {user?.name}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </span>
    </header>
  );
};

export default Navbar;
