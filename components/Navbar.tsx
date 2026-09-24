'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import CommandPalette from './CommandPalette';
import { profile, resumes } from '@/lib/content';
import { navLinks } from '@/lib/site';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Highlight whichever homepage section is currently on screen.
  useEffect(() => {
    if (pathname !== '/') {
      setActiveHash('');
      return;
    }
    const ids = navLinks
      .filter((l) => l.href.startsWith('/#'))
      .map((l) => l.href.slice(2));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveHash(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith('/#') ? href.slice(2) === activeHash : pathname.startsWith(href);

  return (
    <header
      className={`no-print sticky top-0 z-40 border-b backdrop-blur-md surface transition-shadow ${
        scrolled ? 'shadow-lg shadow-black/5' : ''
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <Link href="/" className="focus-ring font-display text-lg font-semibold tracking-tight">
          {profile.name.split(' ')[0]}
          <span className="text-signal-amber">.</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`focus-ring relative font-mono text-sm transition-colors hover:text-signal-amber ${
                isActive(l.href) ? 'text-signal-amber' : 'text-muted'
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-signal-amber"
                />
              )}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <CommandPalette />
          <a
            href={resumes[0]?.file ?? profile.resumeHref}
            download
            className="focus-ring hidden rounded-full border border-signal-amber/40 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-signal-amber transition-colors hover:bg-signal-amber hover:text-ink-900 sm:block"
          >
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="focus-ring surface flex h-9 w-9 items-center justify-center rounded-full md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`focus-ring block rounded-lg px-3 py-2 font-mono text-sm transition-colors hover:bg-signal-amber/10 hover:text-signal-amber ${
                      isActive(l.href) ? 'text-signal-amber' : 'text-muted'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-signal-amber to-signal-teal"
      />
    </header>
  );
}
