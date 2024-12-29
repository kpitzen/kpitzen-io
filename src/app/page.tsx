import Image from "next/image";
import windmill from "@/images/windmill.png";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RecentBlogPost } from "@/components/RecentBlogPost";
import { getAllPosts } from "@/lib/blog";
import { GithubCard } from "@/components/GithubCard";

export default async function Home() {
  const posts = await getAllPosts();
  const mostRecentPost = posts[0]; // Posts are already sorted by date in getAllPosts

  return (
    <div className="min-h-screen bg-[#fff9f0] dark:bg-[#1d1917] text-[#2b2926] dark:text-[#e8e6e3] font-mono relative">
      {/* Windmill image - adjusted opacity for softer feel */}
      <div className="absolute right-8 top-32 hidden lg:block opacity-15 dark:opacity-8">
        <Image 
          src={windmill}
          alt="Decorative windmill illustration"
          width={200}
          height={200}
          className="rotate-12"
        />
      </div>

      <NavBar />
      
      <main className="max-w-3xl mx-auto px-6 py-20 relative">
        {/* Softer border and increased spacing */}
        <div className="mb-16 border-b border-[#2b2926]/20 dark:border-[#e8e6e3]/20 pb-12">
          <h1 className="text-4xl mb-6 font-bold tracking-tight">Hello! 👋</h1>
          <p className="text-lg leading-relaxed">
            I&apos;m Kyle Pitzen, wearing multiple hats as a software engineer, mathematician, and musician.
            My passion lies in crafting experiences that celebrate human connection and bring out the beauty in how we interact with technology and each other.
          </p>
        </div>

        <div className="space-y-12">
          {mostRecentPost && <RecentBlogPost post={mostRecentPost} />}
          
          {/* Updated sections with softer spacing and rounded corners */}
          <section className="p-6 rounded-lg bg-white/50 dark:bg-black/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-5 text-[#d95e32] dark:text-[#ff7f50]">
              What I Do
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-2">
              <li>Pure Mathematics (Geometry &amp; Model Theory)</li>
              <li>Computer Infrastructure &amp; Systems</li>
              <li>Human-Centered Design</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-5 text-[#d95e32] dark:text-[#ff7f50]">
              What I Like
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-2">
              <li>Software that puts people first</li>
              <li>Elegant hardware solutions</li>
              <li>Deep conversations with curious minds</li>
              <li>Exceptional food and coffee</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-5 text-[#d95e32] dark:text-[#ff7f50]">
              Things I&apos;ve Built
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-2">
              <li><a href="https://www.substrate.run/" target="_blank" rel="noopener noreferrer" className="text-[#d95e32] dark:text-[#ff7f50] hover:underline">Substrate</a></li>
              <li><a href="https://github.com/pulumi/pulumi/pulls?q=is%3Apr+is%3Aclosed+author%3Akpitzen" target="_blank" rel="noopener noreferrer" className="text-[#d95e32] dark:text-[#ff7f50] hover:underline">Pulumi &#40;in parts - including Pulumi AI&#41;</a></li>
              <GithubCard />
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
