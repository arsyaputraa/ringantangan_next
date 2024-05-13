"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, LogOutIcon, MenuIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card } from "@/components/ui/card";
import { navbarItems } from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { adminSheetItem } from "./AdminSheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSession } from "@/providers/SessionProviders";
import SignInButton from "@/components/ui/sign-in-button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/actions/auth.actions";

const SideMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, session } = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="block lg:hidden" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        className=" lg:hidden w-full md:w-[400px] flex flex-col justify-between"
        side="left"
      >
        <SheetClose className="hidden" id="side-menu-close-btn" />
        <div>
          <SheetHeader className="mb-5">
            <SheetTitle>Ringantangan</SheetTitle>
            <SheetDescription>Menu</SheetDescription>
          </SheetHeader>
          <Separator />
          <Card className="shadow-sm p-5 flex flex-col gap-2">
            {navbarItems.map((item, idx) => (
              <Button
                key={`${item.name}-${idx}`}
                asChild
                className="flex justify-between"
                variant={pathname === item.path ? "default" : "secondary"}
              >
                <Link
                  onClick={() => {
                    document.getElementById("side-menu-close-btn")?.click();
                  }}
                  href={item.path}
                >
                  {item.name}
                  {item.icon}
                </Link>
              </Button>
            ))}
            {(user?.role === "admin" || user?.role === "superadmin") && (
              <AdminCollapsibleButton pathname={pathname} />
            )}
          </Card>
        </div>

        <SheetFooter className="border-t-2 pt-5">
          {!session ? (
            <SignInButton />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex justify-end items-center just gap-2 text-sm font-bold">
                  <span className="flex flex-col items-end">
                    <p>{user?.name}</p>
                    <p className="text-gray-500 font-normal">{user?.email}</p>
                  </span>{" "}
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name
                        ? user.name.substring(0, 2).toUpperCase()
                        : ""}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button
                    onClick={async () => {
                      await signOut();
                    }}
                    variant="destructive"
                  >
                    Sign Out
                    <LogOutIcon size="sm" width={16} height={16} />
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;

function AdminCollapsibleButton({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
      <CollapsibleTrigger asChild>
        <Button
          className=" flex lg:hidden justify-between mb-2 w-full"
          variant={pathname.split("/")[1] === "admin" ? "default" : "secondary"}
        >
          ADMIN <ChevronsUpDown />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-2 pr-2">
        {adminSheetItem.map((item, idx) => (
          <Button
            key={`${item.name}-${idx}`}
            asChild
            className={cn("flex justify-between")}
            variant={pathname === item.path ? "default" : "outline"}
          >
            <Link
              onClick={() => {
                document.getElementById("side-menu-close-btn")?.click();
              }}
              href={item.path}
            >
              {item.name}
              {item.icon}
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
