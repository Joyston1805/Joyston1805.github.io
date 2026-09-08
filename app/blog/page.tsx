import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import { getAllPostsMeta, getAllTags } from '@/lib/blog';
import { profile } from '@/lib/content';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: `Blog | ${profile.name}`,
  description: 'Write-ups on data analysis, dashboards, and process improvement.',
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const tags = getAllTags();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="section-eyebrow">Writing</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Blog</h1>
        </div>
        <Link
          href="/studio"
          className="focus-ring hidden shrink-0 items-center gap-2 font-mono text-sm text-muted hover:text-signal-amber sm:flex"
        >
          <PenSquare className="h-4 w-4" />
          Write a post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">
          No posts yet — add a .mdx file to content/blog/, or use the{' '}
          <Link href="/studio" className="text-signal-amber hover:underline">
            editor
          </Link>
          .
        </p>
      ) : (
        <BlogList posts={posts} tags={tags} />
      )}
    </section>
  );
}
