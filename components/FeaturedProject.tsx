'use client';

import { motion } from 'framer-motion';
import { Github, FileBarChart, TrendingUp } from 'lucide-react';
import { featuredProject } from '@/lib/content';

export default function FeaturedProject() {
  if (!featuredProject) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">{featuredProject.eyebrow}</p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="surface relative mt-4 overflow-hidden rounded-3xl p-8 md:p-12"
      >
        {/* Ambient signature graphic: a simple animated trend line, grounded in the actual project */}
        <svg
          className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-[0.15] md:h-96 md:w-96"
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

        <div className="relative flex items-center gap-2 text-signal-teal">
          <TrendingUp className="h-5 w-5" />
          <span className="font-mono text-xs uppercase tracking-widest">
            {featuredProject.kicker}
          </span>
        </div>

        <h2 className="relative mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {featuredProject.title}
        </h2>

        <p className="relative mt-4 max-w-2xl text-muted">{featuredProject.description}</p>

        <div className="relative mt-8 flex flex-wrap gap-4">
          <a
            href={featuredProject.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center gap-2 rounded-full bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-ink-900 transition-transform hover:scale-105"
          >
            <Github className="h-4 w-4" /> {featuredProject.codeLabel}
          </a>
          <a
            href={featuredProject.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center gap-2 rounded-full border border-current px-6 py-3 font-mono text-sm transition-colors hover:border-signal-teal hover:text-signal-teal"
          >
            <FileBarChart className="h-4 w-4" /> {featuredProject.reportLabel}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
