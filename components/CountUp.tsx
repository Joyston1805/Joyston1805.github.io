'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

// Animates the numeric part of a KPI string ("1.9%", "6x", "3.7") from zero
// once it scrolls into view. Anything that isn't a leading number is left as-is.
export default function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match) return;
    const [, prefix, num, suffix] = match;
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const decimals = num.split('.')[1]?.length ?? 0;
    const controls = animate(0, parseFloat(num), {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} aria-label={value}>
      {display}
    </span>
  );
}
