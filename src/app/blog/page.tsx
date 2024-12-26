import Link from "next/link";

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#fff9f0] dark:bg-[#1d1917] text-[#2b2926] dark:text-[#e8e6e3] font-mono relative">
      <nav className="sticky top-0 border-b border-[#2b2926]/20 dark:border-[#e8e6e3]/20 bg-[#fff9f0]/80 dark:bg-[#1d1917]/80 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-[#d95e32] dark:hover:text-[#ff7f50] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#d95e32] dark:hover:text-[#ff7f50] transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <a 
                href="https://music.apple.com/us/artist/kyle-pitzen/1578800150" 
                className="hover:text-[#d95e32] dark:hover:text-[#ff7f50] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Music
              </a>
            </li>
          </ul>
        </div>
      </nav>

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
            This space will largely be used to share my thoughts and experiences as a software engineer, but will also contain meandering thoughts on a variety of other topics I find interesting.
          </p>
        </div>

        <div className="space-y-12">
          {/* Blog posts will be listed here */}
          <section className="p-6 rounded-lg bg-white/50 dark:bg-black/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-5 text-[#d95e32] dark:text-[#ff7f50]">
              Coming Soon
            </h2>
            <p className="text-lg leading-relaxed">
              Blog posts are currently being written. Check back soon!
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}