import Link from 'next/link';
import { ArrowLeft, BookOpen, FolderGit2, ScrollText } from 'lucide-react';

export const metadata = { title: 'Page not found' };

const links = [
  { href: '/projects', label: 'Projects', Icon: FolderGit2 },
  { href: '/blog', label: 'Blog', Icon: BookOpen },
  { href: '/resume', label: 'Resume', Icon: ScrollText },
];

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <p className="section-eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-6xl">
        This data point is an <span className="text-signal-amber">outlier</span>.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        The page you were looking for doesn&apos;t exist or has moved. Here are a few places that do.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-ink-900 transition-transform hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
        {links.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="focus-ring surface inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-sm text-muted transition-colors hover:border-signal-amber hover:text-signal-amber"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
