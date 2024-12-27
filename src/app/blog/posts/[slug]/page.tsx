import { NavBar } from "@/components/navbar";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import 'prismjs/themes/prism-tomorrow.css';

import { refractor } from "refractor";
import typescript from "refractor/lang/typescript";
import tsx from "refractor/lang/tsx";
import bash from "refractor/lang/bash";
import json from "refractor/lang/json";
import markdown from "refractor/lang/markdown";
import sql from "refractor/lang/sql";
import yaml from "refractor/lang/yaml";
import rust from "refractor/lang/rust";
import python from "refractor/lang/python";
import cpp from "refractor/lang/cpp";
import go from "refractor/lang/go";

refractor.register(typescript);
refractor.register(tsx);
refractor.register(bash);
refractor.register(json);
refractor.register(markdown);
refractor.register(sql);
refractor.register(yaml);
refractor.register(rust);
refractor.register(python);
refractor.register(cpp);
refractor.register(go);

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Add TypeScript interface for blog post content
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fff9f0] dark:bg-[#1d1917] text-[#2b2926] dark:text-[#e8e6e3] font-mono relative">
      <NavBar />

      <main className="max-w-2xl mx-auto px-6 py-12 sm:py-20">
        <article>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#d95e32] dark:text-[#ff7f50]">{post.title}</h1>
          <div className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-8">
            {new Date(post.date).toLocaleDateString()}
          </div>
          <div 
            className="prose dark:prose-invert prose-lg max-w-none prose-headings:text-[#d95e32] dark:prose-headings:text-[#ff7f50] prose-a:text-[#d95e32] dark:prose-a:text-[#ff7f50] prose-img:rounded-lg prose-p:leading-relaxed prose-pre:bg-[#2b2926] dark:prose-pre:bg-black/40 prose-pre:p-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
} 