import Link from 'next/link';
import { getAllPostsMeta } from '@/lib/blog';

export const metadata = {
  title: 'Blog | Joyston Fernandes',
  description: 'Write-ups on data analysis, dashboards, and process improvement.',
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <p className="section-eyebrow">Writing</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Blog</h1>

      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="focus-ring surface block rounded-2xl p-6 transition-shadow hover:shadow-lg"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-signal-teal">
              {post.date} · {post.readingTime}
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            <div className="mt-3 flex gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-signal-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-signal-amber"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
