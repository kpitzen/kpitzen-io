import { NavBar } from "@/components/navbar";
import { getAllPosts } from "@/lib/blog";
import { Footer } from "@/components/footer";
import { TagFilter } from "@/components/TagFilter";
import { BlogPosts } from "@/components/BlogPosts";

interface BlogPageProps {
  searchParams: Promise<{ tags?: string | string[] }>
}

export const revalidate = 3600; // Revalidate every hour

export default async function Blog({ searchParams }: BlogPageProps) {
  const posts = await getAllPosts();
  const { tags } = await searchParams;
  const selectedTags = Array.isArray(tags) 
    ? tags 
    : tags 
      ? [tags]
      : [];

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

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

        <TagFilter tags={allTags} selectedTags={selectedTags} />
        <BlogPosts posts={posts} selectedTags={selectedTags} />
      </main>
      <Footer />
    </div>
  );
}
