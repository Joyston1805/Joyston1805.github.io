'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { timeline } from '@/lib/content';
import { copy } from '@/lib/site';
import SectionHeading from './SectionHeading';

const jobs = timeline.filter((e) => e.kind === 'experience');
const schools = timeline.filter((e) => e.kind === 'education');

export default function Timeline() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const job = jobs[active];

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + jobs.length) % jobs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading section="timeline" eyebrow={copy.timeline.eyebrow} heading={copy.timeline.heading} />

      {job && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid gap-8 md:grid-cols-[220px_1fr]"
        >
          <div
            role="tablist"
            aria-label="Roles"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="-mx-6 flex overflow-x-auto px-6 md:mx-0 md:flex-col md:overflow-visible md:px-0"
          >
            {jobs.map((j, i) => {
              const selected = i === active;
              return (
                <button
                  key={j.title + j.org}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`job-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="job-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`focus-ring relative shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-left font-mono text-sm transition-colors md:border-b-0 md:border-l-2 ${
                    selected
                      ? 'border-transparent bg-signal-amber/5 text-signal-amber'
                      : 'border-ink-900/10 text-muted hover:bg-signal-amber/5 hover:text-signal-amber dark:border-white/10'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="job-tab-indicator"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-signal-amber md:inset-x-auto md:-left-0.5 md:top-0 md:bottom-0 md:h-auto md:w-0.5"
                    />
                  )}
                  {j.org}
                </button>
              );
            })}
          </div>

          <div id="job-panel" role="tabpanel" aria-labelledby={`job-tab-${active}`} className="min-h-[16rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-display text-xl font-semibold">
                  {job.title} <span className="text-signal-amber">@ {job.org}</span>
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                  {job.period}
                  {job.location ? ` · ${job.location}` : ''}
                </p>
                <ul className="mt-5 space-y-3">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-muted">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-signal-teal" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {schools.length > 0 && (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {schools.map((s, i) => (
            <motion.div
              key={s.title + s.org}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="surface spotlight card-hover flex gap-4 rounded-2xl p-6"
            >
              <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-signal-teal" />
              <div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted">
                  {s.org}
                  {s.location ? ` · ${s.location}` : ''}
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">{s.period}</p>
                {s.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-sm text-muted">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
