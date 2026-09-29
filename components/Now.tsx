'use client';

import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Cpu, GraduationCap } from 'lucide-react';
import { now } from '@/lib/content';
import { copy } from '@/lib/site';
import SectionHeading from './SectionHeading';

const icons = { briefcase: Briefcase, cpu: Cpu, book: BookOpen, graduation: GraduationCap };

export default function Now() {
  return (
    <section id="now" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionHeading section="now" eyebrow={copy.now.eyebrow} heading={copy.now.heading} />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Updated {now.updated}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {now.items.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="surface spotlight card-hover flex flex-col gap-3 rounded-2xl p-6"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  i % 2 === 0 ? 'bg-signal-amber/10 text-signal-amber' : 'bg-signal-teal/10 text-signal-teal'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">{item.label}</h3>
              <p className="text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
