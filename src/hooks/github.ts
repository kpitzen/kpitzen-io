import { cache } from "react";

interface GithubStats {
  stars: number;
  language: string;
}

export const getGithubStats = cache(
  async (owner: string, repo: string): Promise<GithubStats> => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repository data");
      }

      const data = await response.json();
      return {
        stars: data.stargazers_count,
        language: data.language,
      };
    } catch (err) {
      console.error("Error fetching GitHub stats:", err);
      return {
        stars: 0,
        language: "TypeScript",
      };
    }
  }
);
