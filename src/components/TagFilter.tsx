'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
}

export function TagFilter({ tags, selectedTags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentTags = params.getAll('tags');
    
    if (currentTags.includes(tag)) {
      // Remove tag if already selected
      const newTags = currentTags.filter(t => t !== tag);
      params.delete('tags');
      newTags.forEach(t => params.append('tags', t));
    } else {
      // Add new tag
      params.append('tags', tag);
    }
    
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg mb-3 text-[#2b2926]/70 dark:text-[#e8e6e3]/70">Filter by tags:</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-[#d95e32] dark:bg-[#ff7f50] text-white'
                : 'bg-[#2b2926]/10 dark:bg-[#e8e6e3]/10 hover:bg-[#2b2926]/20 dark:hover:bg-[#e8e6e3]/20'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
} 