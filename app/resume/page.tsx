import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import PrintButton from '@/components/PrintButton';
import {
  profile,
  resumes,
  skills,
  timeline,
  leadership,
  awards,
  featuredProject,
  rpubsReports,
} from '@/lib/content';

export const metadata: Metadata = {
  title: `Resume | ${profile.name}`,
  description: `Web resume for ${profile.name}: experience, education, skills and projects.`,
};

// Built from lib/content.ts, so it never drifts from the rest of the site.
// Always rendered black-on-white ("paper"), whatever the site theme, and
// laid out to print on a single US Letter page.
const jobs = timeline.filter((e) => e.kind === 'experience');
const schools = timeline.filter((e) => e.kind === 'education');
const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-1.5 border-b border-neutral-300 pb-0.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-0.5 list-disc space-y-0.5 pl-4 marker:text-neutral-400">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 print:p-0">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Resume</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Web resume</h1>
          <p className="mt-2 text-sm text-muted">
            Same content as the site, formatted to print on one page.{' '}
            <Link href="/#resume" className="text-signal-amber underline underline-offset-2">
              Back to the homepage
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          {resumes[0] && (
            <a
              href={resumes[0].file}
              download
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-current px-4 py-2.5 font-mono text-xs transition-colors hover:border-signal-teal hover:text-signal-teal"
            >
              <Download className="h-3.5 w-3.5" />
              Original PDF
            </a>
          )}
        </div>
      </div>

      <article className="resume-paper mx-auto space-y-3.5 [&>header+section]:mt-4 rounded-lg bg-white px-5 py-7 sm:px-10 sm:py-9 font-body text-[12.5px] leading-snug text-neutral-800 shadow-2xl ring-1 ring-black/5 print:text-[9.5pt] print:leading-[1.3] print:rounded-none print:px-0 print:py-0 print:shadow-none print:ring-0">
        <header className="text-center">
          <h1 className="font-display text-[26px] font-semibold tracking-tight text-neutral-900">{profile.name}</h1>
          <p className="mt-0.5 text-[12px] font-medium text-neutral-600">{profile.title}</p>
          <p className="mt-1 text-[11.5px] text-neutral-600">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {' · '}
            <a href={profile.linkedin}>{host(profile.linkedin)}</a>
            {' · '}
            <a href={profile.github}>{host(profile.github)}</a>
            {' · '}
            <a href={profile.siteUrl}>{host(profile.siteUrl)}</a>
          </p>
        </header>

        <section>
          <Heading>Summary</Heading>
          <p>{profile.tagline}</p>
        </section>

        <section>
          <Heading>Skills</Heading>
          <dl className="space-y-0.5">
            {Object.entries(skills).map(([group, list]) => (
              <div key={group} className="flex flex-col sm:flex-row sm:gap-2 print:flex-row print:gap-2">
                <dt className="shrink-0 sm:w-36 print:w-36 font-semibold text-neutral-900">{group}</dt>
                <dd>{list.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <Heading>Experience</Heading>
          <div className="space-y-2">
            {jobs.map((j) => (
              <div key={j.title + j.org} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p>
                    <span className="font-semibold text-neutral-900">{j.title}</span>
                    <span className="text-neutral-600"> · {j.org}{j.location ? `, ${j.location}` : ''}</span>
                  </p>
                  <p className="text-[11.5px] text-neutral-500">{j.period}</p>
                </div>
                <Bullets items={j.bullets} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading>Projects</Heading>
          <div className="space-y-1.5">
            <div className="break-inside-avoid">
              <p>
                <span className="font-semibold text-neutral-900">{featuredProject.title}</span>
                <span className="text-neutral-600"> · {featuredProject.stack.join(', ')}</span>
              </p>
              <Bullets items={featuredProject.steps.slice(1).map((s) => s.text)} />
            </div>
            <p>
              <span className="font-semibold text-neutral-900">Published analyses (RPubs): </span>
              {rpubsReports
                .filter((r) => r.href !== featuredProject.reportUrl)
                .slice(0, 4)
                .map((r) => r.title)
                .join('; ')}
              .
            </p>
          </div>
        </section>

        <section>
          <Heading>Education</Heading>
          <div className="space-y-1">
            {schools.map((s) => (
              <div key={s.title} className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p>
                  <span className="font-semibold text-neutral-900">{s.title}</span>
                  <span className="text-neutral-600"> · {s.org}{s.location ? `, ${s.location}` : ''}</span>
                </p>
                <p className="text-[11.5px] text-neutral-500">{s.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading>Leadership &amp; Awards</Heading>
          <div className="space-y-1.5">
            {leadership.map((l) => (
              <div key={l.title} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-semibold text-neutral-900">{l.title}</p>
                  <p className="text-[11.5px] text-neutral-500">{l.period}</p>
                </div>
                <Bullets items={l.bullets} />
              </div>
            ))}
            <p>
              <span className="font-semibold text-neutral-900">Awards: </span>
              {awards.join('; ')}
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
