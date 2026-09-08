import { Fragment } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import CareerProfile from '@/components/CareerProfile';
import Leadership from '@/components/Leadership';
import FeaturedProject from '@/components/FeaturedProject';
import ProjectsSection from '@/components/ProjectsSection';
import RPubsSection from '@/components/RPubsSection';
import GithubStats from '@/components/GithubStats';
import CreatorSection from '@/components/CreatorSection';
import ResumeSection from '@/components/ResumeSection';
import BlogPreview from '@/components/BlogPreview';
import Contact from '@/components/Contact';
import { getRepos } from '@/lib/github';
import { getAllPostsMeta } from '@/lib/blog';
import { homeSections, type SectionKey } from '@/lib/site';

export default async function HomePage() {
  const repos = await getRepos();
  const posts = getAllPostsMeta();

  // The order of the page is set in lib/site.ts, not here. To reorder or
  // remove a section, edit `homeSections` in that file.
  const sections: Record<SectionKey, React.ReactNode> = {
    hero: <Hero />,
    about: <About />,
    skills: <Skills />,
    timeline: <Timeline />,
    career: <CareerProfile />,
    leadership: <Leadership />,
    featured: <FeaturedProject />,
    projects: <ProjectsSection repos={repos} />,
    rpubs: <RPubsSection />,
    github: <GithubStats />,
    beyond: <CreatorSection />,
    resume: <ResumeSection />,
    blog: <BlogPreview posts={posts} />,
    contact: <Contact />,
  };

  return (
    <>
      {homeSections.map((key) => (
        <Fragment key={key}>{sections[key]}</Fragment>
      ))}
    </>
  );
}
