'use client';

import { motion } from 'framer-motion';
import { Download, FileText, Eye } from 'lucide-react';
import { resumes } from '@/lib/content';
import { copy } from '@/lib/site';

export default function ResumeSection() {
  if (resumes.length === 0) return null;

  return (
    <section id="resume" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <p className="section-eyebrow">{copy.resume.eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {copy.resume.heading}
      </h2>
      {copy.resume.blurb && <p className="mt-3 max-w-2xl text-muted">{copy.resume.blurb}</p>}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {resumes.map((resume, i) => (
          <motion.div
            key={resume.file}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="surface flex flex-col rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <FileText className="h-5 w-5 shrink-0 text-signal-amber" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Updated {resume.updated}
              </span>
            </div>

            <h3 className="mt-3 font-display text-lg font-semibold">{resume.label}</h3>
            <p className="mt-2 flex-1 text-sm text-muted">{resume.description}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={resume.file}
                download
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-signal-amber px-5 py-2.5 font-mono text-xs font-medium text-ink-900 transition-transform hover:scale-105"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </a>
              <a
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-current px-4 py-2.5 font-mono text-xs transition-colors hover:border-signal-teal hover:text-signal-teal"
              >
                <Eye className="h-3.5 w-3.5" />
                View in browser
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
