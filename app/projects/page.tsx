import ProjectsGrid from '@/components/ProjectsGrid';
import { getRepos } from '@/lib/github';

export const metadata = {
  title: 'Projects | Joyston Fernandes',
  description: 'Public GitHub projects, auto-synced on every deploy.',
};

export default async function ProjectsPage() {
  const repos = await getRepos();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">Portfolio</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">All Projects</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Pulled automatically from GitHub at build time — push a new repo and it shows up here on
        the next deploy.
      </p>
      <div className="mt-10">
        <ProjectsGrid repos={repos} />
      </div>
    </section>
  );
}
