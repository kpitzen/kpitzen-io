import { getAllPosts } from "@/lib/blog";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const tags = searchParams.getAll("tags");

  const { posts, total } = await getAllPosts(page);

  const filteredPosts =
    tags.length > 0
      ? posts.filter((post) => tags.some((tag) => post.tags.includes(tag)))
      : posts;

  return Response.json({ posts: filteredPosts, total });
}
