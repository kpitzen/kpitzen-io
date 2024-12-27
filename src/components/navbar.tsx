'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

// Constants to avoid repetition
const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { 
    href: 'https://music.apple.com/us/artist/kyle-pitzen/1578800150',
    label: 'Music',
    external: true
  }
];

export function NavBar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 border-b border-[#2b2926]/20 dark:border-[#e8e6e3]/20 bg-[#fff9f0]/80 dark:bg-[#1d1917]/80 backdrop-blur-sm z-10">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <ul className="flex gap-6">
          {NAV_ITEMS.map(({ href, label, external }) => (
            <li key={href}>
              {external ? (
                <a 
                  href={href}
                  className="hover:text-[#d95e32] dark:hover:text-[#ff7f50] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ) : (
                <Link 
                  href={href}
                  className={`hover:text-[#d95e32] dark:hover:text-[#ff7f50] transition-colors ${
                    pathname === href ? 'text-[#d95e32]/70 dark:text-[#ff7f50]/70' : ''
                  }`}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}