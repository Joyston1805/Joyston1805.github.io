'use client';

import { motion } from 'framer-motion';
import { FileBarChart, ArrowUpRight } from 'lucide-react';
import { rpubsReports, profile } from '@/lib/content';
import { copy } from '@/lib/site';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function RPubsSection() {
  return (
    <section id="r-analytics" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between">
        <div>
          <p className="section-eyebrow">{copy.rpubs.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {copy.rpubs.heading}
          </h2>
          {copy.rpubs.blurb && <p className="mt-3 max-w-2xl text-muted">{copy.rpubs.blurb}</p>}
        </div>
        <a
          href={profile.rpubs}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring hidden shrink-0 font-mono text-sm text-signal-amber hover:underline md:block"
        >
          View all on RPubs →
        </a>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {rpubsReports.map((report) => (
          <motion.a
            key={report.href}
            href={report.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            whileHover={{ y: -4 }}
            className="focus-ring surface flex flex-col rounded-2xl p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <FileBarChart className="h-5 w-5 shrink-0 text-signal-teal" />
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted" />
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
              {report.title}
            </h3>
            <p className="mt-2 line-clamp-4 flex-1 text-sm text-muted">{report.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {report.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-signal-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-signal-amber"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>

      <a
        href={profile.rpubs}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring mt-8 block text-center font-mono text-sm text-signal-amber hover:underline md:hidden"
      >
        View all on RPubs →
      </a>
    </section>
  );
}
