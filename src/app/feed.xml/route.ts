import { getAllPosts } from "@/lib/blog";
import { BlogPost } from "@/types";

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = "https://kpitzen.io";

  const rss = generateRSS(posts, baseUrl);

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

function generateRSS(posts: BlogPost[], baseUrl: string): string {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Kyle Pitzen's Blog</title>
        <description>Thoughts on software engineering, mathematics, music, and other interesting things.</description>
        <link>${baseUrl}</link>
        <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
        <language>en-US</language>
        ${posts
          .map(
            (post) => `
          <item>
            <title><![CDATA[${post.title}]]></title>
            <description><![CDATA[${post.description}]]></description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <link>${baseUrl}/blog/posts/${post.slug}</link>
            <guid isPermaLink="true">${baseUrl}/blog/posts/${post.slug}</guid>
            ${post.tags.map((tag) => `<category>${tag}</category>`).join("")}
          </item>
        `
          )
          .join("")}
      </channel>
    </rss>`;

  return rssFeed;
}
