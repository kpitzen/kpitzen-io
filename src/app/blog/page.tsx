import { NavBar } from "@/components/navbar";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { TagFilter } from "@/components/TagFilter";
import { Suspense } from "react";

interface BlogPageProps {
  searchParams: Promise<{ tags?: string | string[] }>
}

export default async function Blog(params: BlogPageProps) {
  const posts = await getAllPosts();
  const { searchParams } = params;
  const { tags } = await searchParams;
  const selectedTags = Array.isArray(tags) 
    ? tags 
    : tags 
      ? [tags]
      : [];

  // Extract unique tags from all posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  const filteredPosts = posts.filter((post) =>
    selectedTags.length === 0 || 
    selectedTags.some((tag) => post.tags.includes(tag))
  );

  return (
    <div className="min-h-screen bg-[#fff9f0] dark:bg-[#1d1917] text-[#2b2926] dark:text-[#e8e6e3] font-mono relative">
      <NavBar />

      <main className="max-w-3xl mx-auto px-6 py-20 relative">
        <div className="mb-16 border-b border-[#2b2926]/20 dark:border-[#e8e6e3]/20 pb-12">
          <h1 className="text-4xl mb-3 font-bold tracking-tight">Blog</h1>
          <p className="text-lg text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-6">
            A digital garden of ideas and experiences
          </p>
          <p className="text-lg leading-relaxed">
            Thoughts on software engineering, mathematics, music, and other interesting things.
          </p>
        </div>

        <Suspense fallback={<div>Loading tags...</div>}>
          {allTags.length > 0 && (
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
            />
          )}
        </Suspense>

        <div className="space-y-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
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
            ))
          ) : (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
