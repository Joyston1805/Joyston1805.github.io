'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Facebook, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { brands, shop, creatorIntro } from '@/lib/creator';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Tailwind can't build class names from variables at compile time, so the
// full strings live here rather than being interpolated.
const accentClasses = {
  amber: { text: 'text-signal-amber', chip: 'bg-signal-amber/10 text-signal-amber' },
  teal: { text: 'text-signal-teal', chip: 'bg-signal-teal/10 text-signal-teal' },
} as const;

export const linkIcon = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  shop: ShoppingBag,
} as const;

export default function CreatorSection() {
  return (
    <section id="beyond" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="section-eyebrow">{creatorIntro.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {creatorIntro.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{creatorIntro.blurb}</p>
        </div>
        <Link
          href="/beyond"
          className="focus-ring hidden shrink-0 font-mono text-sm text-signal-amber hover:underline md:block"
        >
          See the channels →
        </Link>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="mt-10 grid gap-6 md:grid-cols-2"
      >
        {brands.map((brand) => {
          const accent = accentClasses[brand.accent];
          return (
            <motion.div key={brand.key} variants={item} className="surface rounded-2xl p-6">
              <div className="flex items-start justify-between gap-2">
                <Youtube className={`h-5 w-5 shrink-0 ${accent.text}`} />
                <Link
                  href={`/beyond#${brand.key}`}
                  aria-label={`More about ${brand.name}`}
                  className="focus-ring text-muted hover:text-signal-amber"
                >
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold leading-snug">
                {brand.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">{brand.handle}</p>
              <p className={`mt-3 text-sm ${accent.text}`}>{brand.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {brand.topics.map((t) => (
                  <span
                    key={t}
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${accent.chip}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-ink-900/10 pt-4 dark:border-white/10">
                <a
                  href={brand.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-signal-amber"
                >
                  <Youtube className="h-3.5 w-3.5" />
                  YouTube
                </a>
                {brand.links.map((link) => {
                  const Icon = linkIcon[link.kind];
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-signal-amber"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.kind === 'shop' ? 'Shop' : link.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <a
          href={shop.url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring surface inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-muted transition-colors hover:text-signal-teal"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          {shop.name} — music &amp; print files
        </a>
        <Link
          href="/beyond"
          className="focus-ring font-mono text-sm text-signal-amber hover:underline md:hidden"
        >
          See the channels →
        </Link>
      </div>
    </section>
  );
}
