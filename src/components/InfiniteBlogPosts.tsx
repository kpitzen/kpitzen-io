'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BlogPost } from '@/types';
import Link from 'next/link';

interface InfiniteBlogPostsProps {
  initialPosts: BlogPost[];
  totalPosts: number;
  selectedTags: string[];
}

export function InfiniteBlogPosts({ initialPosts, totalPosts, selectedTags }: InfiniteBlogPostsProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMorePosts = async () => {
    if (loading || posts.length >= totalPosts) return;
    
    setLoading(true);
    const nextPage = page + 1;
    const searchParams = new URLSearchParams();
    searchParams.append('page', nextPage.toString());
    selectedTags.forEach(tag => searchParams.append('tags', tag));

    try {
      const response = await fetch(`/api/posts?${searchParams.toString()}`);
      const data = await response.json();
      setPosts(prev => [...prev, ...data.posts]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView, loadMorePosts]);

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <Link 
          href={`/blog/posts/${post.slug}`} 
          key={post.slug}
          className="block p-6 rounded-lg bg-white/50 dark:bg-black/10 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-black/20 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2 text-[#d95e32] dark:text-[#ff7f50]">
            {post.title}
          </h2>
          <div className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-3">
            {new Date(post.date).toLocaleDateString()}
          </div>
          {post.tags.length > 0 && (
            <div className="flex gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-[#2b2926]/10 dark:bg-[#e8e6e3]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-lg leading-relaxed">
            {post.description}
          </p>
        </Link>
      ))}
      
      {posts.length < totalPosts && (
        <div ref={ref} className="flex justify-center py-4">
          <div className="animate-pulse text-[#2b2926]/70 dark:text-[#e8e6e3]/70">
            Loading more posts...
          </div>
        </div>
      )}
    </div>
  );
} 