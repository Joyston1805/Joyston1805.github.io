'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/lib/content';

export default function Timeline() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">Timeline</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Experience &amp; Education
      </h2>

      <div className="mt-12 space-y-8 border-l border-ink-900/10 dark:border-white/10">
        {timeline.map((entry, i) => (
          <motion.div
            key={entry.title + entry.org}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative pl-8"
          >
            <span
              className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
                entry.kind === 'education' ? 'bg-signal-teal' : 'bg-signal-amber'
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {entry.period}
            </span>
            <h3 className="mt-1 font-display text-xl font-semibold">{entry.title}</h3>
            <p className="text-sm text-muted">
              {entry.org}
              {entry.location ? ` · ${entry.location}` : ''}
            </p>
            {entry.bullets.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {entry.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
