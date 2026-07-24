import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Leadership from '@/components/Leadership';
import ProjectsGrid from '@/components/ProjectsGrid';
import GithubStats from '@/components/GithubStats';
import BlogPreview from '@/components/BlogPreview';
import Contact from '@/components/Contact';
import { getRepos } from '@/lib/github';
import { getAllPostsMeta } from '@/lib/blog';
import Link from 'next/link';

export default async function HomePage() {
  const repos = await getRepos();
  const posts = getAllPostsMeta();

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Leadership />

      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-eyebrow">Portfolio</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="focus-ring font-mono text-sm text-signal-amber hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-10">
          <ProjectsGrid repos={repos} limit={6} />
        </div>
      </section>

      <GithubStats />
      <BlogPreview posts={posts} />
      <Contact />
    </>
  );
}
