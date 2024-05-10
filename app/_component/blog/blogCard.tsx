"use client";
import { DELETEpost, POSTToggleBlogVisibility } from "@/actions/post.actions";
import { Button } from "@/components/ui/button";
import TooltipButton from "@/components/ui/button-tooltip";
import { Card } from "@/components/ui/card";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Popover } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { validateRequest } from "@/lib/auth";
import { getImage, responseToast } from "@/lib/functions";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/SessionProviders";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import {
  Eye,
  EyeOff,
  HeartIcon,
  PencilIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const BlogCard = ({ data }: { data: Post }) => {
  const { user } = useSession();
  const pathname = usePathname();
  const [confirmation, setConfirmation] = useState(false);
  const router = useRouter();
  return (
    <div>
      <article className="flex rounded-sm bg-white transition shadow-md hover:shadow-xl">
        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
          <time
            dateTime={data.createdDate}
            className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
          >
            <span>{dayjs(data.createdDate).format("YYYY")}</span>
            <span className="w-px flex-1 bg-gray-900/10"></span>
            <span>{dayjs(data.createdDate).format("MMM DD")}</span>
          </time>
        </div>

        <div className="hidden sm:block sm:basis-56">
          <Image
            alt="card image"
            src={!!data.imgUrl ? data.imgUrl : getImage(data.id)}
            className="aspect-square h-full w-full object-contain"
            width={1000}
            height={1000}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="sm:hidden">
            <Image
              alt="card image"
              src={!!data.imgUrl ? data.imgUrl : getImage(data.id)}
              className="aspect-square h-full w-full object-contain"
              width={1000}
              height={1000}
            />
          </div>
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <h3 className="font-bold uppercase text-gray-900">{data.title}</h3>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
              {data.subtitle ?? "..."}
            </p>
          </div>

          <div className="flex items-end justify-end">
            <Button
              onClick={() => {
                router.push(`/blog/${data.id}`);
              }}
              className="block bg-primary rounded-none px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-gray-700"
            >
              Read Blog
            </Button>
          </div>
        </div>
      </article>

      {(user?.role === "admin" || user?.role === "superadmin") &&
        pathname.split("/").includes("admin") && (
          <div className="flex gap-1 justify-end items-center">
            <TooltipButton
              tooltipContent="Delete Post"
              variant="ghost"
              className="p-3"
              onClick={() => {
                setConfirmation(true);
              }}
            >
              <TrashIcon className="w-4 h-4" />
            </TooltipButton>
            <TooltipButton
              tooltipContent={data.isPublic ? "Hide Post" : "Show Post"}
              onClick={async () => {
                const res = await POSTToggleBlogVisibility({
                  id: data.id,
                  show: !data.isPublic,
                });
              }}
              variant="ghost"
              className={cn("p-3")}
            >
              {data.isPublic ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4 text-blue-500" />
              )}
            </TooltipButton>

            <TooltipButton
              tooltipContent={"Edit post"}
              asChild
              variant="ghost"
              className="p-3 "
            >
              <Link href={`/admin/blog/edit/${data.id}`}>
                <PencilIcon className="w-4 h-4" />
              </Link>
            </TooltipButton>
          </div>
        )}
      <ConfirmationDialog
        isOpen={confirmation}
        setOpen={setConfirmation}
        onConfirm={async () => {
          const res = await DELETEpost({
            id: data.id,
          });
          responseToast({ res });
        }}
        onCancel={() => {
          setConfirmation(false);
        }}
      />
    </div>
  );
};

export default BlogCard;
