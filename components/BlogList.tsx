'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Pin, FileEdit } from 'lucide-react';
import type { BlogMeta } from '@/lib/blog';

type Props = {
  posts: BlogMeta[];
  tags: { tag: string; count: number }[];
};

export default function BlogList({ posts, tags }: Props) {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      // AND across selected tags — narrowing, not widening.
      const matchesTags = activeTags.every((t) => post.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [posts, query, activeTags]);

  const isFiltering = query.trim() !== '' || activeTags.length > 0;
  const featured = !isFiltering ? filtered.find((p) => p.featured) : undefined;
  const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <>
      <div className="mt-8 flex flex-col gap-4">
        <div className="surface flex items-center gap-3 rounded-full px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            aria-label="Search posts"
            className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="focus-ring shrink-0 text-muted hover:text-signal-amber"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                  className={`focus-ring rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                    active
                      ? 'bg-signal-amber text-ink-900'
                      : 'surface text-muted hover:text-signal-amber'
                  }`}
                >
                  {tag} <span className="opacity-60">{count}</span>
                </button>
              );
            })}
            {activeTags.length > 0 && (
              <button
                onClick={() => setActiveTags([])}
                className="focus-ring rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted hover:text-signal-amber"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {isFiltering && (
        <p className="mt-6 font-mono text-xs text-muted">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        </p>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="focus-ring surface mt-8 block overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
        >
          {featured.cover && (
            <div className="relative aspect-[21/9] w-full">
              <Image
                src={featured.cover}
                alt={featured.coverAlt}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-signal-amber">
              Featured
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{featured.excerpt}</p>
            <span className="mt-4 block font-mono text-xs text-muted">
              {featured.date} · {featured.readingTime}
            </span>
          </div>
        </Link>
      )}

      <div className="mt-8 space-y-6">
        {rest.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="focus-ring surface flex gap-5 overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-lg"
            >
              {post.cover && (
                <div className="relative hidden h-28 w-40 shrink-0 overflow-hidden rounded-xl sm:block">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <span className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal-teal">
                  {post.pinned && <Pin className="h-3 w-3" aria-label="Pinned" />}
                  {post.draft && (
                    <span className="inline-flex items-center gap-1 rounded bg-signal-amber/20 px-1.5 py-0.5 text-signal-amber">
                      <FileEdit className="h-3 w-3" /> Draft
                    </span>
                  )}
                  {post.category && <span className="text-muted">{post.category}</span>}
                  <span>
                    {post.date} · {post.readingTime}
                  </span>
                </span>
                <h2 className="mt-2 font-display text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-signal-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-signal-amber"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="surface mt-8 rounded-2xl p-8 text-center text-muted">
          Nothing matches that. Try a different search or clear the filters.
        </p>
      )}
    </>
  );
}
