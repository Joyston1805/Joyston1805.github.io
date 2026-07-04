'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { profile } from '@/lib/content';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-ink-900/10 dark:border-white/10"
        >
          <Image
            src={profile.photoHref}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="320px"
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">About</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            From production floors to dashboards
          </h2>
          <p className="mt-5 text-muted">{profile.tagline}</p>
          <p className="mt-4 text-muted">
            Currently a Business Analytics student at the University of New Haven, with a
            Post-Graduate Program in Data Science and Business Analytics from UT Austin already
            under my belt. My work spans production data analysis in food manufacturing, learning
            outcomes analytics in higher ed, and leading a student analytics community.
          </p>
          <a
            href={profile.resumeHref}
            download
            className="focus-ring mt-6 inline-block rounded-full border border-signal-amber/40 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-signal-amber transition-colors hover:bg-signal-amber hover:text-ink-900"
          >
            Download Full Resume (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
