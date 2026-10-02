'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Repo } from '@/lib/github';
import { projectNotes } from '@/lib/content';
import ProjectsGrid from './ProjectsGrid';

// Search box + language chips over the full repo list on /projects.
// Everything runs in the browser over data baked in at build time.
export default function ProjectsExplorer({ repos }: { repos: Repo[] }) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<string | null>(null);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    repos.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [repos]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return repos.filter((r) => {
      if (language && r.language !== language) return false;
      if (!q) return true;
      const haystack = [r.name.replace(/[-_]+/g, ' '), r.description, projectNotes[r.name], r.language, ...(r.topics ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [repos, query, language]);

  if (repos.length === 0) return <ProjectsGrid repos={repos} />;

  const chip = (active: boolean) =>
    `focus-ring rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
      active
        ? 'border-signal-amber bg-signal-amber/10 text-signal-amber'
        : 'border-ink-900/10 text-muted hover:border-signal-amber hover:text-signal-amber dark:border-white/10'
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="surface flex items-center gap-3 rounded-full px-4 py-2.5 md:w-80">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-muted hover:text-signal-amber">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        {languages.length > 1 && (
          <div role="group" aria-label="Filter by language" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={language === null} onClick={() => setLanguage(null)} className={chip(language === null)}>
              All <span className="opacity-60">{repos.length}</span>
            </button>
            {languages.map(([lang, n]) => (
              <button
                key={lang}
                type="button"
                aria-pressed={language === lang}
                onClick={() => setLanguage(language === lang ? null : lang)}
                className={chip(language === lang)}
              >
                {lang} <span className="opacity-60">{n}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <h2 className="sr-only">Project list</h2>
      <p className="mt-6 font-mono text-xs text-muted" aria-live="polite">
        {shown.length === repos.length ? `${repos.length} projects` : `${shown.length} of ${repos.length} projects`}
      </p>

      <div className="mt-4">
        {shown.length > 0 ? (
          <ProjectsGrid key={`${language}-${query}`} repos={shown} />
        ) : (
          <p className="surface rounded-2xl p-8 text-center text-muted">
            No projects match that.{' '}
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setLanguage(null);
              }}
              className="text-signal-amber underline underline-offset-2"
            >
              Clear filters
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
