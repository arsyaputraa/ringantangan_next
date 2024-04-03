"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Post } from "@/types/post";
import { EditorContent, useEditor } from "@tiptap/react";
import dayjs from "dayjs";
import { tiptapExtensions } from "../../admin/blog/_components/tiptap";
import Image from "next/image";
import { getImage } from "@/lib/functions";
import { BackgroundBeams } from "@/components/ui/background-beams";

const TiptapReadonly = ({ data }: { data: Post }) => {
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: data.content,
    editable: false,
    editorProps: {
      attributes: {
        class: cn(
          "w-full rounded-md bg-background px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
        ),
      },
    },
  });

  return (
    <div className="w-full max-w-2xl  mx-auto">
      <Card className="grid bg-gray-900 text-white grid-cols-12 place-items-stretch relative">
        <div className="col-span-6 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="uppercase text-3xl font-bold">
              {data.title}
            </CardTitle>
            <CardDescription className="text-md">
              {data.subtitle}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col items-start">
            <p className="text-sm">
              {dayjs(new Date(data.createdDate)).format("DD MMMM YYYY")}
            </p>
            <p className="text-sm">{data.createdBy.split("@")[0]}</p>
          </CardFooter>
        </div>
        <div className="col-span-6">
          <Image alt="post image" src={getImage(data.id)} objectFit="" />
        </div>
        <BackgroundBeams />
      </Card>
      {/* <Card className="max-w-2xl min-h-[150px] w-full grid grid-cols-12 rounded-md px-5">
        <div className="col-span-6 flex flex-col justify-between">
          <div className="">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <h3 className="text-lg">{data.subtitle}</h3>
          </div>

          <p className="text-sm">
            {dayjs(new Date(data.createdDate)).format("DD MMMM YYYY")}
          </p>
        </div>
      </Card> */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapReadonly;
