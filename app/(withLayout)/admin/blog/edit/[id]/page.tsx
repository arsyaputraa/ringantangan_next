import db from "@/lib/db";
import EditBlogForm from "./forms";
import { postTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Post } from "@/types/post";
import { notFound } from "next/navigation";

const EditBlogPage = async ({ params }: { params: { id: string } }) => {
  const postData = (await db.query.postTable.findFirst({
    where: eq(postTable.id, params.id),
  })) as unknown as Post;

  if (!postData) return notFound();
  return <EditBlogForm post={postData} />;
};

export default EditBlogPage;
