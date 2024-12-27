import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faBug } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  return (
    <footer className="max-w-2xl mx-auto px-6 py-12 border-t border-[#2b2926]/20 dark:border-[#e8e6e3]/20">
      <h2 className="text-2xl font-bold mb-5 text-[#2b7d6c] dark:text-[#4fd1b8]">
        Let&apos;s Connect
      </h2>
      <div className="flex gap-4 flex-wrap">
        <a 
          href="https://github.com/kpitzen" 
          className="px-5 py-2.5 rounded-md border-2 border-current hover:bg-[#2b2926] hover:text-[#fff9f0] dark:hover:bg-[#e8e6e3] dark:hover:text-[#1d1917] transition-all hover:scale-105 flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </a>
        <a 
          href="https://bsky.app/profile/kpitzen.io" 
          className="px-5 py-2.5 rounded-md border-2 border-current hover:bg-[#2b2926] hover:text-[#fff9f0] dark:hover:bg-[#e8e6e3] dark:hover:text-[#1d1917] transition-all hover:scale-105 flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faBug} /> Bluesky
        </a>
        <a 
          href="mailto:kyle@kpitzen.io" 
          className="px-5 py-2.5 rounded-md border-2 border-current hover:bg-[#2b2926] hover:text-[#fff9f0] dark:hover:bg-[#e8e6e3] dark:hover:text-[#1d1917] transition-all hover:scale-105 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faEnvelope} /> Email
        </a>
      </div>
      <div className="text-center mt-8 text-sm text-[#2b2926]/50 dark:text-[#e8e6e3]/50">
        &copy; {new Date().getFullYear()} Kyle Pitzen. All rights reserved.
      </div>
    </footer>
  );
} 