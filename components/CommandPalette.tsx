'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Briefcase,
  FolderGit2,
  FileBarChart,
  BookOpen,
  Mail,
  Download,
  Github,
  Linkedin,
  Youtube,
  ShoppingBag,
  PenSquare,
} from 'lucide-react';
import { profile } from '@/lib/content';
import { brands, shop } from '@/lib/creator';

type CommandItem = {
  label: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const go = useCallback(
    (path: string) => {
      setOpen(false);
      setQuery('');
      if (path.startsWith('http')) {
        window.open(path, '_blank', 'noopener,noreferrer');
      } else {
        router.push(path);
      }
    },
    [router]
  );

  const commands: CommandItem[] = [
    { label: 'About', icon: User, action: () => go('/#about') },
    { label: 'Experience & Education', icon: Briefcase, action: () => go('/#work') },
    { label: 'Projects', icon: FolderGit2, action: () => go('/projects') },
    { label: 'R & Analytics Reports', icon: FileBarChart, action: () => go('/#r-analytics') },
    { label: 'Blog', icon: BookOpen, action: () => go('/blog') },
    {
      label: 'Beyond the Data — channels & socials',
      icon: Youtube,
      action: () => go('/beyond'),
      keywords: 'youtube channels instagram facebook creator videos',
    },
    ...brands.map((brand) => ({
      label: `Open ${brand.name} on YouTube`,
      icon: Youtube,
      action: () => go(brand.youtube),
      keywords: `youtube ${brand.handle} ${brand.topics.join(' ')}`,
    })),
    {
      label: `Visit ${shop.name}`,
      icon: ShoppingBag,
      action: () => go(shop.url),
      keywords: 'shop store music 3d prints homeofjoy',
    },
    {
      label: 'Blog Studio — write a post',
      icon: PenSquare,
      action: () => go('/studio'),
      keywords: 'new post write editor mdx author',
    },
    { label: 'Contact', icon: Mail, action: () => go('/#contact') },
    { label: 'Download Resume', icon: Download, action: () => go(profile.resumeHref) },
    { label: 'Open GitHub', icon: Github, action: () => go(profile.github), keywords: 'code repos' },
    { label: 'Open LinkedIn', icon: Linkedin, action: () => go(profile.linkedin) },
  ];

  const filtered = commands.filter((c) =>
    `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="focus-ring surface hidden items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-signal-amber md:flex"
        aria-label="Open command palette"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Quick nav</span>
        <kbd className="rounded border border-current/20 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="fixed left-1/2 top-24 z-50 w-[90vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 text-paper shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search className="h-4 w-4 text-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section..."
                  className="focus-ring w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted"
                />
                <kbd className="rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-muted">
                  Esc
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="px-3 py-4 text-sm text-muted">No matches.</p>
                )}
                {filtered.map((c) => (
                  <button
                    key={c.label}
                    onClick={c.action}
                    className="focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5"
                  >
                    <c.icon className="h-4 w-4 text-signal-amber" />
                    {c.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
