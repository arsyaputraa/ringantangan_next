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
import { HomeIcon, LogOutIcon, Newspaper, RadioIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminSheet from "./AdminSheet";
import SideMenu from "./SideMenu";
import SignInButton from "@/components/ui/sign-in-button";

export const navbarItems = [
  {
    name: "Tentang Kami",
    path: "/",
    icon: <HomeIcon className="mr-1" width={16} height={16} />,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: <Newspaper className="mr-1" width={16} height={16} />,
  },
  // {
  //   name: "Announcement",
  //   path: "/announcement",
  //   icon: <RadioIcon className="mr-1" width={16} height={16} />,
  // },
];

const Navbar = () => {
  const pathname = usePathname();
  const { user, session } = useSession();
  return (
    <>
      <header className="w-full bg-background sticky top-0 z-20 left-0 mx-auto p-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">Ringantangan</h1>
        <ul className="hidden lg:flex justify-center gap-5">
          {navbarItems.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <li key={`${item.name}-${idx}`}>
                <Button
                  asChild
                  size="sm"
                  variant={isActive ? "outline" : "ghost"}
                  className={cn(isActive && "font-semibold ")}
                >
                  <Link href={item.path}>{item.name}</Link>
                </Button>
              </li>
            );
          })}
          {(user?.role === "admin" || user?.role === "superadmin") && (
            <AdminSheet />
          )}
        </ul>
        {!!session ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="hidden lg:flex items-center gap-2 text-sm font-bold">
                  <p>
                    Hi, {user?.role != "user" && "Admin "}
                    {user?.name}
                  </p>
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name
                        ? user.name.substring(0, 2).toUpperCase()
                        : ""}
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
          </>
        ) : (
          <span className="hidden lg:inline">
            <SignInButton />
          </span>
        )}
        <SideMenu />
      </header>
    </>
  );
};

export default Navbar;
