import BlogCard from "@/app/_component/blog/blogCard";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { Post } from "@/types/post";
import { Plus } from "lucide-react";
import Link from "next/link";

const AdminBlogPage = async () => {
  const posts = (await db.query.postTable.findMany()) as unknown as Post[];

  return (
    <div className="min-h-screen p-5 mx-auto">
      <Button asChild className="mb-5 ml-auto flex items-center w-min">
        <Link href="/admin/blog/create">
          Add Post <Plus className="ml-2 w-4 h-4" />
        </Link>
      </Button>

      {posts.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:place-items-center">
          {posts.map((post) => (
            <BlogCard key={post.id} data={post} />
          ))}
        </div>
      ) : (
        <div className="w-full mx-auto flex flex-col h-[calc(100vh-100px)] justify-center items-center">
          <h1 className="text-lg font-bold">Belum ada artikel nih </h1>
          <p>nantikan terus ya sahabat ringantangan...</p>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;
