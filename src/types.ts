export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface PaginatedPosts {
  posts: BlogPost[];
  total: number;
}
