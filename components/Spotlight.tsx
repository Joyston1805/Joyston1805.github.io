'use client';

import { useEffect } from 'react';

// One shared pointer listener that positions the glow on whichever
// `.spotlight` card is under the cursor. Cheaper than a listener per card.
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('.spotlight') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return null;
}
