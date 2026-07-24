'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { profile } from '@/lib/content';

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#work', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md surface border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="focus-ring font-display text-lg font-semibold tracking-tight"
        >
          {profile.name.split(' ')[0]}
          <span className="text-signal-amber">.</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="focus-ring font-mono text-sm text-muted transition-colors hover:text-signal-amber"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href={profile.resumeHref}
            download
            className="focus-ring hidden rounded-full border border-signal-amber/40 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-signal-amber transition-colors hover:bg-signal-amber hover:text-ink-900 sm:block"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
