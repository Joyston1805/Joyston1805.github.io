'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Cycles through a list of short phrases with a vertical slide.
export default function RotatingText({ items, interval = 2600 }: { items: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (items.length < 2 || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval, reduce]);

  if (items.length === 0) return null;

  return (
    <span className="relative block min-h-[1.3em] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[index]}
          aria-hidden
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="block bg-gradient-to-r from-signal-amber to-signal-teal bg-clip-text text-transparent"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{items.join(', ')}</span>
    </span>
  );
}
