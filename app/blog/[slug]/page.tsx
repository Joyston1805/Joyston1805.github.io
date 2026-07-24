import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = getPostBySlug(params.slug);
    return { title: `${post.title} | Joyston Fernandes`, description: post.excerpt };
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <span className="font-mono text-xs uppercase tracking-widest text-signal-teal">
        {post.date} · {post.readingTime}
      </span>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{post.title}</h1>

      <div className="prose prose-invert dark:prose-invert mt-8 max-w-none prose-headings:font-display prose-a:text-signal-amber">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
