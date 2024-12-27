import { NavBar } from "@/components/navbar";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { BlogPost } from "@/types";
import { Footer } from "@/components/footer";

// Change to async function to fetch posts
export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-[#fff9f0] dark:bg-[#1d1917] text-[#2b2926] dark:text-[#e8e6e3] font-mono relative">
      <NavBar />

      <main className="max-w-2xl mx-auto px-6 py-20 relative">
        <div className="mb-16 border-b border-[#2b2926]/20 dark:border-[#e8e6e3]/20 pb-12">
          <h1 className="text-4xl mb-3 font-bold tracking-tight">Blog</h1>
          <p className="text-lg text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-6">
            A digital garden of ideas and experiences
          </p>
          <p className="text-lg leading-relaxed">
            Thoughts on software engineering, mathematics, music, and other interesting things.
          </p>
          <br/>
          <p className="text-lg leading-relaxed">
            While software engineering is my main focus here, I&apos;ll also explore various other fascinating topics that catch my interest along the way.
          </p>
        </div>

        <div className="space-y-12">
          {posts.length > 0 ? (
            posts.map((post: BlogPost) => (
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
                <p className="text-lg leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))
          ) : (
            <section className="p-6 rounded-lg bg-white/50 dark:bg-black/10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-5 text-[#d95e32] dark:text-[#ff7f50]">
                Coming Soon
              </h2>
              <p className="text-lg leading-relaxed">
                Blog posts are currently being written. Check back soon!
              </p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
