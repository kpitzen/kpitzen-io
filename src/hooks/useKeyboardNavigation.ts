"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseKeyboardNavigationProps {
  nextPostSlug?: string;
  prevPostSlug?: string;
}

export function useKeyboardNavigation({
  nextPostSlug,
  prevPostSlug,
}: UseKeyboardNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Ignore if user is typing in an input or textarea
      if (event.target instanceof HTMLElement) {
        if (
          ["input", "textarea"].includes(event.target.tagName.toLowerCase())
        ) {
          return;
        }
      }

      switch (event.key) {
        case "ArrowLeft":
          if (nextPostSlug) {
            router.push(`/blog/posts/${nextPostSlug}`);
          }
          break;
        case "ArrowRight":
          if (prevPostSlug) {
            router.push(`/blog/posts/${prevPostSlug}`);
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, nextPostSlug, prevPostSlug]);
}
