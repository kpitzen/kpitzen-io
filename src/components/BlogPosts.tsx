'use client';

import Link from "next/link";
import { BlogPost } from "@/types";
import { useMemo } from "react";

interface BlogPostsProps {
  posts: BlogPost[];
  selectedTags: string[];
}

export function BlogPosts({ posts, selectedTags }: BlogPostsProps) {
  const filteredPosts = useMemo(() => 
    posts.filter((post) =>
      selectedTags.length === 0 || 
      selectedTags.some((tag) => post.tags.includes(tag))
    ),
    [posts, selectedTags]
  );

  if (filteredPosts.length === 0) {
    return (
      <section className="p-6 rounded-lg bg-white/50 dark:bg-black/10 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-5 text-[#d95e32] dark:text-[#ff7f50]">
          No posts found
        </h2>
        <p className="text-lg leading-relaxed">
          {posts.length === 0 
            ? "Blog posts are currently being written. Check back soon!"
            : "No posts match the selected tags. Try selecting different tags."}
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-12">
      {filteredPosts.map((post) => (
        <Link 
          href={`/blog/posts/${post.slug}`} 
          key={post.slug}
          className="block p-6 rounded-lg bg-white/50 dark:bg-black/10 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-black/20 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2 text-[#d95e32] dark:text-[#ff7f50]">
            {post.title}
          </h2>
          <div className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-3">
            {new Date(post.date).toLocaleDateString()}
          </div>
          {post.tags.length > 0 && (
            <div className="flex gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-[#2b2926]/10 dark:bg-[#e8e6e3]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-lg leading-relaxed">
            {post.excerpt}
          </p>
        </Link>
      ))}
    </div>
  );
} 