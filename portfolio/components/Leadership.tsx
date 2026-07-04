'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { leadership, awards } from '@/lib/content';

export default function Leadership() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">Leadership &amp; Awards</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Beyond the spreadsheet
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {leadership.map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="surface rounded-2xl p-6"
          >
            <h3 className="font-display text-lg font-semibold">{role.title}</h3>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {role.period}
            </p>
            <ul className="mt-3 space-y-1.5">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="surface rounded-2xl p-6"
        >
          <h3 className="font-display text-lg font-semibold">Awards &amp; Recognition</h3>
          <ul className="mt-3 space-y-2">
            {awards.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-muted">
                <Award className="h-4 w-4 shrink-0 text-signal-amber" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
