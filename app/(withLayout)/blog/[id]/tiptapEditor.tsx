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
    <>
      <div className="w-full max-w-2xl  mx-auto">
        <Card className="grid bg-gray-900 text-white grid-cols-12 place-items-stretch relative">
          <div className="col-span-1 py-5 px-2 [writing-mode:_vertical-lr] items-start">
            <time
              dateTime={data.createdDate}
              className="flex items-center justify-between gap-4 text-xs font-bold uppercase "
            >
              <span>{dayjs(data.createdDate).format("YYYY")}</span>
              <span className="w-px flex-1 bg-white"></span>
              <span>{dayjs(data.createdDate).format("MMM DD")}</span>
            </time>
          </div>
          <div className="col-span-5 flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="uppercase text-3xl font-bold">
                {data.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                {data.subtitle}
              </CardDescription>
            </CardHeader>
            <CardFooter className="text-gray-500 text-sm">
              <span>{data.createdBy.split("@")[0]}</span>
            </CardFooter>
          </div>
          <div className="col-span-6 p-5">
            <div className="h-content rounded-md shadow-md overflow-hidden w-content">
              <Image
                src={!!data.imgUrl ? data.imgUrl : getImage(data.id)}
                alt="card image"
                className="object-contain"
                width={1000}
                height={1000}
              />
            </div>
            {/* <Image
            src={!!data.imgUrl ? data.imgUrl : getImage(data.id)}
            alt="card image"
            width={1000}
            height={1000}
          /> */}
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
    </>
  );
};

export default TiptapReadonly;
