"use client";
import { signOut } from "@/actions/auth.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/SessionProviders";
import {
  BoxesIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  LucideSpeaker,
  PenToolIcon,
  RadarIcon,
  RadioTowerIcon,
  Settings,
  SpeakerIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
          {user?.role === "admin" ||
            (user?.role === "superadmin" && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button className=" bg-blue-950">
                    <Settings className="mr-1" width={16} height={16} />
                    ADMIN
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]" side="left">
                  <SheetHeader className="mb-5">
                    <SheetTitle>ADMIN MENU</SheetTitle>
                    <SheetDescription>
                      Ringantangan Admin Menu Panel
                    </SheetDescription>
                  </SheetHeader>
                  <Separator />
                  <Card className="shadow-sm p-5 flex flex-col gap-2 mt-5">
                    <Button className="flex justify-between">
                      DASHBOARD
                      <LayoutDashboardIcon
                        className="mr-1"
                        width={16}
                        height={16}
                      />
                    </Button>
                    <Button variant="outline" className="flex justify-between">
                      POSTS
                      <BoxesIcon className="mr-1" width={16} height={16} />
                    </Button>{" "}
                    <Button variant="outline" className="flex justify-between">
                      ANNOUNCEMENTS
                      <RadioTowerIcon className="mr-1" width={16} height={16} />
                    </Button>
                  </Card>
                </SheetContent>
              </Sheet>
            ))}
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
