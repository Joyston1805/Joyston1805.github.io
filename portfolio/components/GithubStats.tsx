'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { profile } from '@/lib/content';

export default function GithubStats() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // github-readme-stats theme names
  const grsTheme = mounted && theme === 'light' ? 'default' : 'dark';
  const u = profile.githubUsername;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">Live from GitHub</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Activity Snapshot
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        These update automatically — no rebuild needed. Served as images by the community{' '}
        <code className="font-mono text-sm">github-readme-stats</code> project.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${grsTheme}&hide_border=true&bg_color=00000000`}
          alt={`${profile.name}'s GitHub stats`}
          loading="lazy"
          className="w-full rounded-2xl"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=${grsTheme}&hide_border=true&bg_color=00000000`}
          alt={`${profile.name}'s most used languages`}
          loading="lazy"
          className="w-full rounded-2xl"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://github-readme-streak-stats.herokuapp.com?user=${u}&theme=${grsTheme}&hide_border=true&background=00000000`}
          alt={`${profile.name}'s GitHub streak`}
          loading="lazy"
          className="w-full rounded-2xl lg:col-span-2"
        />
      </div>
    </section>
  );
}
