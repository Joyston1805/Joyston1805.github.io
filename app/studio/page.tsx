import BlogStudio from '@/components/BlogStudio';
import { profile } from '@/lib/content';

export const metadata = {
  title: `Blog Studio | ${profile.name}`,
  description: 'Draft a blog post and export it as MDX.',
  // Not secret, just not something search engines need to index.
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="section-eyebrow">Author tools</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Blog Studio</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Write a post here, see how it will look, then push it straight to the repo. Nothing is
        saved on this page — it runs entirely in your browser and produces a{' '}
        <code className="font-mono text-signal-amber">.mdx</code> file. Publishing still goes
        through a GitHub commit, which is what keeps the site static, free to host, and fully
        version controlled.
      </p>

      <div className="surface mt-6 rounded-2xl p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Three ways to ship</p>
        <ol className="mt-3 space-y-2 text-sm text-muted">
          <li>
            <span className="font-mono text-signal-amber">01</span> — Publish via GitHub: opens a
            new file in the repo with the content already filled in. Hit &ldquo;Commit&rdquo; and
            the site rebuilds itself.
          </li>
          <li>
            <span className="font-mono text-signal-amber">02</span> — Copy MDX: paste it into a
            new file under <code>content/blog/</code> however you like.
          </li>
          <li>
            <span className="font-mono text-signal-amber">03</span> — Download: saves the{' '}
            <code>.mdx</code> file to drag into the repo later.
          </li>
        </ol>
      </div>

      <BlogStudio />
    </section>
  );
}
