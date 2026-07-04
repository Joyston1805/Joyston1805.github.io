'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BlogMeta } from '@/lib/blog';

export default function BlogPreview({ posts }: { posts: BlogMeta[] }) {
  const preview = posts.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between">
        <div>
          <p className="section-eyebrow">Writing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            From the Blog
          </h2>
        </div>
        <Link
          href="/blog"
          className="focus-ring font-mono text-sm text-signal-amber hover:underline"
        >
          View all →
        </Link>
      </div>

      {preview.length === 0 ? (
        <p className="mt-8 text-muted">No posts yet — add .mdx files to content/blog/.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {preview.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="focus-ring surface block h-full rounded-2xl p-6 transition-shadow hover:shadow-lg"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-signal-teal">
                  {post.readingTime}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
