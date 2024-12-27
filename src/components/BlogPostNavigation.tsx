'use client';

import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import Link from 'next/link';

interface BlogPostNavigationProps {
  nextPost: { slug: string; title: string } | null;
  prevPost: { slug: string; title: string } | null;
}

export function BlogPostNavigation({ nextPost, prevPost }: BlogPostNavigationProps) {
  useKeyboardNavigation({
    nextPostSlug: nextPost?.slug,
    prevPostSlug: prevPost?.slug,
  });

  return (
    <nav className="mt-12 pt-8 border-t border-[#2b2926]/20 dark:border-[#e8e6e3]/20 flex justify-between">
      {nextPost ? (
        <Link 
          href={`/blog/posts/${nextPost.slug}`}
          className="group flex flex-col"
        >
          <span className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70">Previous</span>
          <span className="text-[#d95e32] dark:text-[#ff7f50] group-hover:underline">{nextPost.title}</span>
        </Link>
      ) : <div />}
      
      {prevPost ? (
        <Link 
          href={`/blog/posts/${prevPost.slug}`}
          className="group flex flex-col text-right"
        >
          <span className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70">Next</span>
          <span className="text-[#d95e32] dark:text-[#ff7f50] group-hover:underline">{prevPost.title}</span>
        </Link>
      ) : <div />}
    </nav>
  );
} 