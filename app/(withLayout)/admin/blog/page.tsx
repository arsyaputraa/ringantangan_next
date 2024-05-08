import BlogCard from "@/app/_component/blog/blogCard";
import db from "@/lib/db";
import { Post } from "@/types/post";

const AdminBlogPage = async () => {
  const posts = (await db.query.postTable.findMany()) as unknown as Post[];

  if (posts.length > 0)
    return (
      <div className="w-full mx-auto p-5 grid grid-cols-3 gap-5 place-items-center">
        {posts.map((post) => (
          <BlogCard key={post.id} data={post} />
        ))}
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

export default AdminBlogPage;
