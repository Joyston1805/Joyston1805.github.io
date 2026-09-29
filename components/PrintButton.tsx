'use client';

import { Printer } from 'lucide-react';

export default function PrintButton({ label = 'Print / Save as PDF' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="focus-ring inline-flex items-center gap-2 rounded-full bg-signal-amber px-5 py-2.5 font-mono text-xs font-medium text-ink-900 transition-transform hover:scale-105"
    >
      <Printer className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
