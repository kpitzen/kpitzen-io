import Link from "next/link";
import { BlogPost } from "@/types";

interface RecentBlogPostProps {
  post: BlogPost;
}

export function RecentBlogPost({ post }: RecentBlogPostProps) {
  return (
    <section className="p-6 rounded-lg bg-white/50 dark:bg-black/10 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-5 text-[#d95e32] dark:text-[#ff7f50]">
        Latest Blog Post
      </h2>
      <Link 
        href={`/blog/posts/${post.slug}`}
        className="block group"
      >
        <h3 className="text-xl font-bold mb-2 group-hover:text-[#d95e32] dark:group-hover:text-[#ff7f50] transition-colors">
          {post.title}
        </h3>
        <div className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-3">
          {new Date(post.date).toLocaleDateString()}
        </div>
        <p className="text-lg leading-relaxed">
          {post.description}
        </p>
      </Link>
    </section>
  );
} 