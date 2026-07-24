'use client';

import { motion } from 'framer-motion';
import { profile, kpis } from '@/lib/content';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid bg-grid px-6 pb-20 pt-16 md:pt-24">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mx-auto max-w-6xl"
      >
        <motion.p variants={item} className="section-eyebrow">
          Data Analyst · Business Analytics
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-lg text-muted">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <a
            href="/projects"
            className="focus-ring rounded-full bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-ink-900 transition-transform hover:scale-105"
          >
            View Projects
          </a>
          <a
            href={profile.resumeHref}
            download
            className="focus-ring rounded-full border border-current px-6 py-3 font-mono text-sm transition-colors hover:border-signal-teal hover:text-signal-teal"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="focus-ring rounded-full px-6 py-3 font-mono text-sm text-muted transition-colors hover:text-signal-amber"
          >
            Contact Me →
          </a>
        </motion.div>

        {/* Signature element: a KPI dashboard strip built from real resume metrics */}
        <motion.div
          variants={item}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/10 dark:border-white/10 md:grid-cols-4"
        >
          {kpis.map((kpi, i) => (
            <div
              key={kpi.label}
              className="surface flex flex-col gap-1 p-5"
              style={{ borderRadius: 0 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {String(i + 1).padStart(2, '0')} · {kpi.context}
              </span>
              <span
                className={`kpi-value text-3xl font-semibold ${
                  i % 2 === 0 ? 'text-signal-amber' : 'text-signal-teal'
                }`}
              >
                {kpi.value}
              </span>
              <span className="text-sm text-muted">{kpi.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
