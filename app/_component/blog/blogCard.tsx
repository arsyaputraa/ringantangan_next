"use client";
import { POSTToggleBlogVisibility } from "@/actions/post.actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { validateRequest } from "@/lib/auth";
import { getImage } from "@/lib/functions";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/SessionProviders";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import { Eye, EyeOff, HeartIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BlogCard = ({ data }: { data: Post }) => {
  const { user } = useSession();
  const pathname = usePathname();
  return (
    <div>
      <Card
        className={cn(
          "px-4 py-3 cursor-pointer text-primary-foreground bg-primary hover:bg-primary/90 w-[300px] flex flex-col aspect-[4/6] overflow-hidden rounded-md shadow-md relative",
          !data.isPublic && "bg-primary/60"
        )}
      >
        <div className="flex-1">
          <Image src={getImage(data.id)} alt="card image" />
        </div>
        <div className="overflow-hidden">
          <h3 className="text-xl font-bold ">{data.title}</h3>

          <p
            onClick={() => {
              console.log(pathname.split("/"));
            }}
          >
            {data.content?.substring(0, 60)}...
          </p>
        </div>
        <div>
          <Separator className="my-2" />
          <div className="text-sm flex justify-between">
            <p className="text-primary-foreground/70">
              {dayjs(new Date(data.createdDate)).format("DD MMM YYYY")}
            </p>
            <span className="flex items-center justify-center gap-1">
              <HeartIcon color="red" width={15} height={15} /> {data.likeCount}
            </span>
          </div>
        </div>
      </Card>
      {(user?.role === "admin" || user?.role === "superadmin") &&
        pathname.split("/").includes("admin") && (
          <div className="flex gap-1 justify-end items-center">
            <Button asChild variant="ghost" className="p-3 ">
              <Link href={`/admin/blog/edit/${data.id}`}>
                <Trash2Icon className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              onClick={async () => {
                await POSTToggleBlogVisibility({
                  id: data.id,
                  show: !data.isPublic,
                });
              }}
              variant="ghost"
              className="p-3 "
            >
              {data.isPublic ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
            <Button asChild variant="ghost" className="p-3 ">
              <Link href={`/admin/blog/edit/${data.id}`}>
                <PencilIcon className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
    </div>
  );
};

export default BlogCard;
