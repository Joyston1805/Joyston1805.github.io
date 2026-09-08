import { LineChart, ArrowUpRight } from 'lucide-react';
import { lossdog } from '@/lib/content';

export default function CareerProfile() {
  if (!lossdog.enabled) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-4">
      <a
        href={lossdog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring surface flex flex-col gap-4 rounded-2xl p-6 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-4">
          <LineChart className="mt-0.5 h-5 w-5 shrink-0 text-signal-teal" />
          <div>
            <h2 className="font-display text-lg font-semibold">{lossdog.heading}</h2>
            <p className="mt-1.5 max-w-2xl text-sm text-muted">{lossdog.blurb}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-signal-amber">
          {lossdog.cta}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </a>
    </section>
  );
}
