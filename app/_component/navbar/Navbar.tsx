"use client";
import { signOut } from "@/actions/auth.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useSession } from "@/providers/SessionProviders";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminSheet from "./AdminSheet";

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
  const router = useRouter();
  const pathname = usePathname();
  const { user, session } = useSession();
  return (
    <>
      <header className="w-full bg-background sticky top-0 z-20 left-0 mx-auto px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Ringantangan</h1>
        <ul className="flex justify-center gap-5 py-5">
          {navbarItems.map((item, idx) => {
            const isActive = pathname === item.url;
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
          {user?.role === "admin" ||
            (user?.role === "superadmin" && <AdminSheet />)}
        </ul>
        {!!session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="flex items-center gap-2 text-sm font-bold">
                <p>
                  Hi, {user?.role != "user" && "Admin "}
                  {user?.name}
                </p>
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.name ? user.name.substring(0, 2).toUpperCase() : ""}
                  </AvatarFallback>
                </Avatar>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  onClick={async () => {
                    await signOut();
                  }}
                  variant="destructive"
                >
                  Sign Out
                  <LogOutIcon
                    size="sm"
                    className="ml-2"
                    width={16}
                    height={16}
                  />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => {
              router.push("/signin");
            }}
          >
            Sign In
          </Button>
        )}
      </header>
    </>
  );
};

export default Navbar;
