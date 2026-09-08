import Link from 'next/link';
import ProjectsGrid from './ProjectsGrid';
import type { Repo } from '@/lib/github';
import { copy } from '@/lib/site';

export default function ProjectsSection({ repos }: { repos: Repo[] }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between">
        <div>
          <p className="section-eyebrow">{copy.projects.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {copy.projects.heading}
          </h2>
        </div>
        <Link
          href="/projects"
          className="focus-ring font-mono text-sm text-signal-amber hover:underline"
        >
          {copy.projects.viewAll}
        </Link>
      </div>
      <div className="mt-10">
        <ProjectsGrid repos={repos} limit={6} />
      </div>
    </section>
  );
}
