import { BlogPost } from "@/types";

export function BlogPostSchema({ post }: { post: BlogPost }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Kyle Pitzen',
      url: 'https://kpitzen.io',
    },
    description: post.description,
    keywords: post.tags.join(', '),
    url: `https://kpitzen.io/blog/posts/${post.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
