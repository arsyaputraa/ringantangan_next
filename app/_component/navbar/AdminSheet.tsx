"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BoxesIcon,
  ListTreeIcon,
  LockIcon,
  RadioTowerIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const adminSheetItem = [
  {
    name: "MANAGE POST",
    path: "/admin/blog",
    icon: <ListTreeIcon className="mr-1" width={16} height={16} />,
  },
  {
    name: "CREATE POST",
    path: "/admin/blog/create",
    icon: <BoxesIcon className="mr-1" width={16} height={16} />,
  },
  {
    name: "CREATE ANNOUNCEMENT",
    path: "/admin/announcement/create",
    icon: <RadioTowerIcon className="mr-1" width={16} height={16} />,
  },
];

const AdminSheet = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="" variant="ghost">
          <LockIcon className="mr-1" width={16} height={16} />
          ADMIN
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]" side="left">
        <SheetHeader className="mb-5">
          <SheetTitle>ADMIN MENU</SheetTitle>
          <SheetDescription>Ringantangan Admin Menu Panel</SheetDescription>
        </SheetHeader>
        <Separator />
        <Card className="shadow-sm p-5 flex flex-col gap-2 mt-5">
          {adminSheetItem.map((item, idx) => (
            <Button
              key={`${item.name}-${idx}`}
              asChild
              className="flex justify-between"
              variant={pathname === item.path ? "default" : "secondary"}
            >
              <Link href={item.path}>
                {item.name}
                {item.icon}
              </Link>
            </Button>
          ))}
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSheet;
