import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, ArrowRight, Pencil, Calendar, RefreshCw } from 'lucide-react';
import { notFound } from 'next/navigation';
import {
  getAllSlugs,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
  editUrlFor,
} from '@/lib/blog';
import { profile } from '@/lib/content';

// "Judging it on more than one number" -> "judging-it-on-more-than-one-number"
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const textOf = (node: React.ReactNode): string =>
  typeof node === 'string' || typeof node === 'number'
    ? String(node)
    : Array.isArray(node)
      ? node.map(textOf).join('')
      : node && typeof node === 'object' && 'props' in node
        ? textOf((node as React.ReactElement).props.children)
        : '';

// Give every h2 an id so the table of contents (and shared links) can jump to it.
const mdxComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 id={slugify(textOf(children))} className="scroll-mt-24">
      {children}
    </h2>
  ),
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: `${post.title} | ${profile.name}`,
      description: post.excerpt,
      // Drafts get built so you can preview them at a real URL, but they
      // should never end up in a search index.
      robots: post.draft ? { index: false, follow: false } : undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        images: [post.cover || `/og/blog/${post.slug}.png`],
      },
    };
  } catch {
    return { title: 'Post not found' };
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }
  if (!post) return null;

  const { prev, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post.slug, 2);

  // Table of contents from the post's "## " headings (skipped for short posts).
  const toc = Array.from(post.content.matchAll(/^## (.+)$/gm), (m) => {
    const title = m[1].replace(/[*_`]/g, '').trim();
    return { title, id: slugify(title) };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    image: `${profile.siteUrl}${post.cover || `/og/blog/${post.slug}.png`}`,
    url: `${profile.siteUrl}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    wordCount: post.wordCount,
    author: { '@type': 'Person', name: profile.name, url: profile.siteUrl },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link
        href="/blog"
        className="focus-ring inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-signal-amber"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All posts
      </Link>

      {post.draft && (
        <p className="mt-6 rounded-xl border border-signal-amber/40 bg-signal-amber/10 px-4 py-2.5 font-mono text-xs text-signal-amber">
          Draft — this post is unlisted and not indexed. Remove `draft: true` to publish it.
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-widest text-signal-teal">
        {post.category && <span className="text-muted">{post.category}</span>}
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          {post.date}
        </span>
        <span>{post.readingTime}</span>
        {post.updated && (
          <span className="inline-flex items-center gap-1.5 text-muted">
            <RefreshCw className="h-3 w-3" />
            Updated {post.updated}
          </span>
        )}
      </div>

      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">{post.title}</h1>
      {post.excerpt && <p className="mt-4 text-lg text-muted">{post.excerpt}</p>}

      {post.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-signal-amber/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-signal-amber"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {post.cover && (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-ink-900/10 dark:border-white/10">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {toc.length >= 3 && (
        <nav aria-label="On this page" className="surface mt-10 rounded-2xl p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">On this page</p>
          <ol className="mt-3 space-y-1.5 text-sm">
            {toc.map((h, i) => (
              <li key={h.id} className="flex gap-3">
                <span className="font-mono text-xs text-signal-amber">{String(i + 1).padStart(2, '0')}</span>
                <a href={`#${h.id}`} className="focus-ring text-muted transition-colors hover:text-signal-amber">
                  {h.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="prose mt-10 max-w-none dark:prose-invert prose-headings:font-display prose-a:text-amber-700 dark:prose-a:text-signal-amber">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-ink-900/10 pt-6 dark:border-white/10">
        <span className="font-mono text-xs text-muted">
          Spotted a typo or want to add something?
        </span>
        <a
          href={editUrlFor(post.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-current px-4 py-2 font-mono text-xs transition-colors hover:border-signal-amber hover:text-signal-amber"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit on GitHub
        </a>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Related reading</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="focus-ring surface rounded-2xl p-5 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-display text-base font-semibold">{r.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <nav className="mt-12 grid gap-4 border-t border-ink-900/10 pt-6 dark:border-white/10 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="focus-ring group flex flex-col gap-1 text-left"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              <ArrowLeft className="h-3 w-3" /> Older
            </span>
            <span className="font-display text-sm font-semibold group-hover:text-signal-amber">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="focus-ring group flex flex-col gap-1 text-right sm:items-end"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              Newer <ArrowRight className="h-3 w-3" />
            </span>
            <span className="font-display text-sm font-semibold group-hover:text-signal-amber">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
