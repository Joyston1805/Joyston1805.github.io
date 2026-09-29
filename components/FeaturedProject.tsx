'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, FileBarChart, Github, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { featuredProject } from '@/lib/content';
import { SectionEyebrow } from './SectionHeading';

export default function FeaturedProject() {
  if (!featuredProject) return null;
  const p = featuredProject;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionEyebrow section="featured">{p.eyebrow}</SectionEyebrow>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="surface spotlight relative mt-4 overflow-hidden rounded-3xl p-8 md:p-12"
      >
        {/* Ambient signature graphic: a simple animated trend line, grounded in the actual project */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-[0.12] md:h-96 md:w-96"
          viewBox="0 0 200 200"
          fill="none"
        >
          <motion.path
            d="M10 150 Q 50 120, 70 130 T 130 90 T 190 40"
            stroke="currentColor"
            strokeWidth="3"
            className="text-signal-amber"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-2 text-signal-teal">
              <TrendingUp className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-widest">{p.kicker}</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h2>
            <p className="mt-4 text-lg text-muted">{p.summary || p.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-signal-teal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-signal-teal"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={p.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-2 rounded-full bg-signal-amber px-5 py-2.5 font-mono text-sm font-medium text-ink-900 transition-transform hover:scale-105"
              >
                <Github className="h-4 w-4" /> {p.codeLabel}
              </a>
              <a
                href={p.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-2 rounded-full border border-current px-5 py-2.5 font-mono text-sm transition-colors hover:border-signal-teal hover:text-signal-teal"
              >
                <FileBarChart className="h-4 w-4" /> {p.reportLabel}
              </a>
              {p.writeupUrl && (
                <Link
                  href={p.writeupUrl}
                  className="focus-ring group flex items-center gap-1 px-2 py-2.5 font-mono text-sm text-muted transition-colors hover:text-signal-amber"
                >
                  {p.writeupLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>

          <ol className="relative space-y-6 border-l border-ink-900/10 pl-8 dark:border-white/10">
            {p.steps.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
                className="relative"
              >
                <span
                  className={`absolute -left-[45px] top-0 flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs ${
                    i === p.steps.length - 1
                      ? 'border-signal-amber bg-signal-amber text-ink-900'
                      : 'border-ink-900/15 bg-white text-muted dark:border-white/15 dark:bg-ink-900'
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className="font-mono text-xs uppercase tracking-widest text-signal-amber">{step.label}</h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
