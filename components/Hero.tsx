'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { profile, kpis, resumes } from '@/lib/content';
import { copy } from '@/lib/site';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pb-20 pt-16 md:pt-24">
      <motion.div
        style={{ y: gridY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid"
      />
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mx-auto max-w-6xl"
      >
        <motion.p variants={item} className="section-eyebrow">
          {copy.hero.eyebrow}
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
            href={copy.hero.ctaPrimary.href}
            className="focus-ring rounded-full bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-ink-900 transition-transform hover:scale-105"
          >
            {copy.hero.ctaPrimary.label}
          </a>
          <a
            href={copy.hero.ctaSecondary.href || resumes[0]?.file || profile.resumeHref}
            download
            className="focus-ring rounded-full border border-current px-6 py-3 font-mono text-sm transition-colors hover:border-signal-teal hover:text-signal-teal"
          >
            {copy.hero.ctaSecondary.label}
          </a>
          <a
            href={copy.hero.ctaTertiary.href}
            className="focus-ring rounded-full px-6 py-3 font-mono text-sm text-muted transition-colors hover:text-signal-amber"
          >
            {copy.hero.ctaTertiary.label}
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
