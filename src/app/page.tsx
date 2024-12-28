import Image from "next/image";
import windmill from "@/images/windmill.png";
import meal from "@/images/christmas-ribs.jpg";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RecentBlogPost } from "@/components/RecentBlogPost";
import { getAllPosts } from "@/lib/blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
              <li>Substrate</li>
              <li>Pulumi &#40;in parts - including Pulumi AI&#41;</li>
              <li className="group relative">
                This delicious meal
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out left-0 bottom-8 z-10">
                  <Image 
                    src={meal}
                    alt="an image of red-wine braised short-ribs" 
                    className="rounded-lg shadow-lg w-48 h-48 object-cover"
                  />
                </div>
              </li>
              <li className="group relative">
                <a 
                  href="https://github.com/kpitzen/kpitzen-io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#d95e32] dark:text-[#ff7f50] hover:underline"
                >
                  This website
                </a>
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out left-0 bottom-8 z-10">
                  <div className="bg-white dark:bg-[#1d1917] p-4 rounded-lg shadow-lg border border-[#2b2926]/20 dark:border-[#e8e6e3]/20 w-64">
                    <div className="flex items-center gap-2 mb-2">
                      <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                      <span className="font-semibold">kpitzen/kpitzen-io</span>
                    </div>
                    <p className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-2">
                      Personal website and blog built with Next.js
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#2b2926]/60 dark:text-[#e8e6e3]/60">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#3178c6]"></div>
                        TypeScript
                      </div>
                      <div>
                        <FontAwesomeIcon icon={["fas", "star"]} className="w-3 h-3 mr-1" />
                        1
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
