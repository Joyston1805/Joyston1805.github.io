'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { profile, kpis, resumes } from '@/lib/content';
import { copy } from '@/lib/site';
import RotatingText from './RotatingText';
import CountUp from './CountUp';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const socials = [
  { href: profile.github, label: 'GitHub', Icon: Github, external: true },
  { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail, external: false },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pb-20 pt-16 md:pt-24">
      <motion.div
        style={{ y: gridY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]"
      />
      {/* Slow-drifting ambient glows in the two accent colours */}
      <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute -left-32 top-0 h-80 w-80 rounded-full bg-signal-amber/20 blur-3xl dark:bg-signal-amber/10" />
        <div className="animate-drift-slow absolute -right-24 top-24 h-96 w-96 rounded-full bg-signal-teal/20 blur-3xl dark:bg-signal-teal/10" />
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={container} className="mx-auto max-w-6xl">
        {copy.hero.availability && (
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-signal-teal/30 bg-signal-teal/10 px-3 py-1 font-mono text-xs text-signal-teal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-teal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-teal" />
              </span>
              {copy.hero.availability}
            </span>
          </motion.div>
        )}

        <motion.p variants={item} className="section-eyebrow mt-6">
          {copy.hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        {copy.hero.roles.length > 0 && (
          <motion.p
            variants={item}
            className="mt-4 font-display text-2xl font-medium tracking-tight md:text-3xl"
          >
            <RotatingText items={copy.hero.roles} />
          </motion.p>
        )}

        <motion.p variants={item} className="mt-6 max-w-2xl text-lg text-muted">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={copy.hero.ctaPrimary.href}
            className="focus-ring group inline-flex items-center gap-2 rounded-full bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-ink-900 shadow-lg shadow-signal-amber/20 transition-all hover:-translate-y-0.5 hover:shadow-signal-amber/40"
          >
            {copy.hero.ctaPrimary.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={copy.hero.ctaSecondary.href || resumes[0]?.file || profile.resumeHref}
            download
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-current px-6 py-3 font-mono text-sm transition-colors hover:border-signal-teal hover:text-signal-teal"
          >
            <Download className="h-4 w-4" />
            {copy.hero.ctaSecondary.label}
          </a>
          <a
            href={copy.hero.ctaTertiary.href}
            className="focus-ring rounded-full px-6 py-3 font-mono text-sm text-muted transition-colors hover:text-signal-amber"
          >
            {copy.hero.ctaTertiary.label}
          </a>
        </motion.div>

        <motion.ul variants={item} className="mt-8 flex items-center gap-3">
          {socials.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="focus-ring surface flex h-10 w-10 items-center justify-center rounded-full text-muted transition-all hover:-translate-y-0.5 hover:border-signal-amber hover:text-signal-amber"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Signature element: a KPI dashboard strip built from real resume metrics */}
        <motion.div
          variants={item}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/10 dark:border-white/10 md:grid-cols-4"
        >
          {kpis.map((kpi, i) => (
            <div
              key={kpi.label}
              className="surface group relative flex flex-col gap-1 p-5 transition-colors hover:bg-signal-amber/[0.04]"
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
                <CountUp value={kpi.value} />
              </span>
              <span className="text-sm text-muted">{kpi.label}</span>
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                  i % 2 === 0 ? 'bg-signal-amber' : 'bg-signal-teal'
                }`}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
