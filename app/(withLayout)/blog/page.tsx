import db from "@/lib/db";
import { postTable } from "@/lib/db/schema";
import { Post } from "@/types/post";
import { eq } from "drizzle-orm";
import BlogCard from "../../_component/blog/blogCard";
import { Button } from "@/components/ui/button";
import { Settings2Icon } from "lucide-react";
import Link from "next/link";
import { validateRequest } from "@/lib/auth";

const BlogPage = async () => {
  const { user } = await validateRequest();

  const posts = (await db.query.postTable.findMany({
    where: eq(postTable.isPublic, true),
  })) as unknown as Post[];

  if (posts.length > 0)
    return (
      <div className="min-h-screen p-5 mx-auto">
        {(user?.role === "admin" || user?.role === "superadmin") && (
          <Button asChild className="mb-5 ml-auto flex items-center w-min">
            <Link href="/admin/blog">
              Manage Post <Settings2Icon className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        )}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:place-items-center">
          {posts.map((post) => (
            <BlogCard key={post.id} data={post} />
          ))}
        </div>
      </div>
    );
  else
    return (
      <div className="w-full mx-auto flex flex-col h-[calc(100vh-100px)] justify-center items-center">
        <h1 className="text-lg font-bold">Belum ada artikel nih </h1>
        <p>nantikan terus ya sahabat ringantangan...</p>
      </div>
    );
};

export default BlogPage;
