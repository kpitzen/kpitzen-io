import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getGithubStats } from "@/hooks/github";

export async function GithubCard() {
  const stats = await getGithubStats('kpitzen', 'kpitzen-io');
  
  return (
    <li className="group relative">
      <a 
        href="https://github.com/kpitzen/kpitzen-io" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#d95e32] dark:text-[#ff7f50] hover:underline"
      >
        This website
      </a>
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out left-0 bottom-8 z-10">
        <div className="bg-white dark:bg-[#1d1917] p-4 rounded-lg shadow-lg border border-[#2b2926]/20 dark:border-[#e8e6e3]/20 w-64">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            <span className="font-semibold">kpitzen/kpitzen-io</span>
          </div>
          <p className="text-sm text-[#2b2926]/70 dark:text-[#e8e6e3]/70 mb-2">
            Personal website and blog built with Next.js
          </p>
          <div className="flex items-center gap-4 text-xs text-[#2b2926]/60 dark:text-[#e8e6e3]/60">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#3178c6]"></div>
              {stats.language}
            </div>
            <div>
              <FontAwesomeIcon icon={faStar} className="w-3 h-3 mr-1" />
              {stats.stars}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
} 