import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types";
import { unified } from "unified";

import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrismAll from "rehype-prism-plus";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "src/posts");
export async function getAllPosts(page: number = 1, limit: number = 5) {
  if (!fs.existsSync(postsDirectory)) {
    return { posts: [], total: 0 };
  }

  const files = fs.readdirSync(postsDirectory);

  const allPosts: BlogPost[] = files
    .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.mdx?$/, ""),
        title: data.title,
        date: data.date,
        description: data.description || "",
        content: content || "",
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const start = (page - 1) * limit;
  const paginatedPosts = allPosts.slice(start, start + limit);

  return {
    posts: paginatedPosts,
    total: allPosts.length,
  };
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  const post = posts.posts.find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrismAll)
    .use(rehypeStringify)
    .process(post.content);

  post.content = processedContent.toString();

  return post;
}
