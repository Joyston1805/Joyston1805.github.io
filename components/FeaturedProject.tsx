'use client';

import { motion } from 'framer-motion';
import { Github, FileBarChart, TrendingUp } from 'lucide-react';

export default function FeaturedProject() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">Flagship Project</p>
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
            Time Series Forecasting
          </span>
        </div>

        <h2 className="relative mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Forecasting Daily Traffic at Baregg Tunnel
        </h2>

        <p className="relative mt-4 max-w-2xl text-muted">
          Analyzed 2003–2005 daily vehicle traffic through the Baregg Tunnel to build and
          validate forecasting models. Compared a naïve benchmark against a linear regression
          model incorporating weekly seasonality and trend — evaluated with RMSE, MAE, MAPE, and
          MASE across a five-month validation window. The regression model significantly
          outperformed the naïve approach, and residual diagnostics confirmed the model
          assumptions held.
        </p>

        <div className="relative mt-8 flex flex-wrap gap-4">
          <a
            href="https://github.com/Joyston1805/Baregg-Tunnel-Traffic-Forecasting"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center gap-2 rounded-full bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-ink-900 transition-transform hover:scale-105"
          >
            <Github className="h-4 w-4" /> View Code
          </a>
          <a
            href="https://rpubs.com/JoystonFernandes/1398260"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center gap-2 rounded-full border border-current px-6 py-3 font-mono text-sm transition-colors hover:border-signal-teal hover:text-signal-teal"
          >
            <FileBarChart className="h-4 w-4" /> Read the Full Report
          </a>
        </div>
      </motion.div>
    </section>
  );
}
