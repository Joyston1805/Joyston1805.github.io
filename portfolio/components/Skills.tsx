'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/content';

export default function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">Toolkit</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Skills &amp; Systems
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {Object.entries(skills).map(([category, list], colIdx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: colIdx * 0.1 }}
            className="surface rounded-2xl p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-signal-teal">
              {category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {list.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-ink-900/10 px-3 py-1 text-sm text-muted transition-colors hover:border-signal-amber hover:text-signal-amber dark:border-white/10"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
