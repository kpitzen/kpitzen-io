import { NavBar } from "@/components/navbar";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import 'prismjs/themes/prism-tomorrow.css';
import { Footer } from "@/components/footer";
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
import { BlogPostNavigation } from '@/components/BlogPostNavigation';
import { Metadata } from 'next';
import { BlogPostSchema } from '@/components/BlogPostSchema';

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
  const { posts } = await getAllPosts();
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

// Add generateMetadata function
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImage = post.ogImage || '/images/default-og.png'; // Create a default OG image

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Kyle Pitzen'],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { posts } = await getAllPosts(1, 10000);
  const currentPostIndex = posts.findIndex(post => post.slug === slug);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const prevPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#fff9f0] dark:bg-[#1d1917] text-[#2b2926] dark:text-[#e8e6e3] font-mono">
      <BlogPostSchema post={post} />
      <NavBar />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <article>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#d95e32] dark:text-[#ff7f50]">{post.title}</h1>
          <div className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-8">
            {new Date(post.date).toLocaleDateString()}
          </div>
          <div 
            className="prose dark:prose-invert prose-lg max-w-3xl prose-headings:text-[#d95e32] dark:prose-headings:text-[#ff7f50] prose-a:text-[#d95e32] dark:prose-a:text-[#ff7f50] prose-img:rounded-lg prose-p:leading-relaxed prose-pre:bg-[#2b2926] dark:prose-pre:bg-black/40 prose-pre:p-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        
        <BlogPostNavigation nextPost={nextPost} prevPost={prevPost} />
      </main>
      <Footer />
    </div>
  );
}