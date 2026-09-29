'use client';

import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, ArrowUpRight } from 'lucide-react';
import type { Repo } from '@/lib/github';
import { projectNotes } from '@/lib/content';

// GitHub's own colours for the languages likely to show up here.
const languageColors: Record<string, string> = {
  Python: '#3572A5',
  R: '#198CE7',
  'Jupyter Notebook': '#DA5B0B',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Java: '#B07219',
  'C++': '#F34B7D',
  SQL: '#E38C00',
  'Visual Basic .NET': '#945DB7',
};

// "Baregg-Tunnel-Traffic-Forecasting" -> "Baregg Tunnel Traffic Forecasting"
const prettyName = (name: string) => name.replace(/[-_]+/g, ' ').trim();

const updatedLabel = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProjectsGrid({ repos, limit }: { repos: Repo[]; limit?: number }) {
  const shown = limit ? repos.slice(0, limit) : repos;

  if (shown.length === 0) {
    return (
      <p className="text-muted">
        No public repositories found yet — once you push projects to GitHub, they'll appear here
        automatically on the next deploy.
      </p>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {shown.map((repo) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          variants={item}
          whileHover={{ y: -4 }}
          className="focus-ring surface spotlight group flex flex-col rounded-2xl p-6 transition-shadow hover:shadow-lg"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-signal-amber">
              {prettyName(repo.name)}
            </h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-amber" />
          </div>
          <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">
            {projectNotes[repo.name] ?? repo.description ?? 'No description provided.'}
          </p>

          {repo.topics?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {repo.topics.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-signal-teal/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-signal-teal"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: languageColors[repo.language] ?? '#7C8AA0' }}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" /> {repo.forks_count}
            </span>
            {repo.homepage ? (
              <span className="ml-auto flex items-center gap-1 text-signal-amber">
                <ExternalLink className="h-3 w-3" /> Live
              </span>
            ) : (
              <span className="ml-auto">{updatedLabel(repo.updated_at)}</span>
            )}
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
