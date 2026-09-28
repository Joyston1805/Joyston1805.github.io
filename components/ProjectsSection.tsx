import Link from 'next/link';
import ProjectsGrid from './ProjectsGrid';
import type { Repo } from '@/lib/github';
import { copy } from '@/lib/site';
import SectionHeading from './SectionHeading';

export default function ProjectsSection({ repos }: { repos: Repo[] }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between">
        <div>
          <SectionHeading section="projects" eyebrow={copy.projects.eyebrow} heading={copy.projects.heading} />
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
