import db from "@/lib/db";

import { postTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Post } from "@/types/post";
import { tiptapExtensions } from "../../admin/blog/_components/tiptap";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import TiptapReadonly from "./tiptapEditor";
import { notFound, redirect } from "next/navigation";

const ReadBlogPage = async ({ params }: { params: { id: string } }) => {
  const postData = (await db.query.postTable.findFirst({
    where: eq(postTable.id, params.id),
  })) as unknown as Post;

  if (!postData) return notFound();
  return <TiptapReadonly data={postData} />;
};

export default ReadBlogPage;
