import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { profile } from './content';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// ============================================================================
// FRONT-MATTER REFERENCE — every field you can put at the top of a .mdx file
// ============================================================================
// ---
// title:    "Required. The headline."
// date:     "2026-09-01"          Required. YYYY-MM-DD. Controls sort order.
// updated:  "2026-09-14"          Optional. Shows "Updated ..." on the post.
// excerpt:  "One or two lines."   Shows in cards, search results, and previews.
// tags:     ["power-bi", "sql"]   Optional. Powers the filter chips on /blog.
// category: "Tutorial"            Optional. One word. Shown as a label.
// cover:    "/blog/my-image.jpg"  Optional. Put images in public/blog/.
// coverAlt: "Description"         Optional but please write one.
// draft:    true                  Hidden from all listings + sitemap.
// featured: true                  Gets the big hero card at the top of /blog.
// pinned:   true                  Sorts to the top regardless of date.
// ---
//
// Files starting with an underscore (_template.mdx) are ignored entirely.
// ============================================================================

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  updated: string;
  excerpt: string;
  tags: string[];
  category: string;
  cover: string;
  coverAlt: string;
  draft: boolean;
  featured: boolean;
  pinned: boolean;
  readingTime: string;
  wordCount: number;
};

export type BlogPost = BlogMeta & { content: string };

/** Drafts are visible while running `npm run dev`, hidden on the live site. */
const SHOW_DRAFTS = process.env.NODE_ENV === 'development';

function readAll(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        updated: data.updated ?? '',
        excerpt: data.excerpt ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        category: data.category ?? '',
        cover: data.cover ?? '',
        coverAlt: data.coverAlt ?? data.title ?? '',
        draft: data.draft === true,
        featured: data.featured === true,
        pinned: data.pinned === true,
        readingTime: stats.text,
        wordCount: stats.words,
        content,
      };
    });
}

/** Pinned first, then newest first. */
function sortPosts<T extends { pinned: boolean; date: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return a.date < b.date ? 1 : -1;
  });
}

function stripContent(post: BlogPost): BlogMeta {
  const { content, ...meta } = post;
  return meta;
}

export function getAllPostsMeta(): BlogMeta[] {
  const posts = readAll().filter((p) => SHOW_DRAFTS || !p.draft);
  return sortPosts(posts).map(stripContent);
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    updated: data.updated ?? '',
    excerpt: data.excerpt ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    category: data.category ?? '',
    cover: data.cover ?? '',
    coverAlt: data.coverAlt ?? data.title ?? '',
    draft: data.draft === true,
    featured: data.featured === true,
    pinned: data.pinned === true,
    readingTime: stats.text,
    wordCount: stats.words,
    content,
  };
}

/**
 * Includes drafts on purpose: a draft still gets a built page so you can
 * preview it at its real URL and share the link, it just isn't listed
 * anywhere and carries a noindex tag.
 */
export function getAllSlugs(): string[] {
  return readAll().map((p) => p.slug);
}

/** Slugs that belong in the sitemap — published posts only. */
export function getPublishedSlugs(): string[] {
  return readAll()
    .filter((p) => !p.draft)
    .map((p) => p.slug);
}

/** Every tag in use, with counts, most-used first. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPostsMeta()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Previous/next in reading order, for the footer nav on a post. */
export function getAdjacentPosts(slug: string): {
  prev: BlogMeta | null;
  next: BlogMeta | null;
} {
  const posts = getAllPostsMeta();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: posts[i + 1] ?? null, // older
    next: posts[i - 1] ?? null, // newer
  };
}

/** Posts sharing the most tags with this one. */
export function getRelatedPosts(slug: string, limit = 2): BlogMeta[] {
  const posts = getAllPostsMeta();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];

  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, overlap: p.tags.filter((t) => current.tags.includes(t)).length }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((x) => x.post);
}

/** Deep link that opens this post in GitHub's web editor. */
export function editUrlFor(slug: string): string {
  return `${profile.repoUrl}/edit/main/content/blog/${slug}.mdx`;
}

/** Deep link to create a brand new post, with the filename pre-filled. */
export function newPostUrl(filename: string): string {
  return `${profile.repoUrl}/new/main/content/blog?filename=${encodeURIComponent(filename)}`;
}
