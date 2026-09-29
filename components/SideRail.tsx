'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, BarChart3, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/lib/content';

const links = [
  { href: profile.github, label: 'GitHub', Icon: Github },
  { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: profile.rpubs, label: 'RPubs', Icon: BarChart3 },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
];

// Wide screens only: a fixed column of social links on the left edge,
// plus a back-to-top button (all screen sizes) once you've scrolled a bit.
export default function SideRail() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="no-print">
      <motion.ul
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed bottom-0 left-8 z-30 hidden flex-col items-center gap-5 xl:flex"
      >
        {links.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="focus-ring block text-muted transition-all hover:-translate-y-1 hover:text-signal-amber"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        ))}
        <li aria-hidden className="mt-1 h-24 w-px bg-muted/40" />
      </motion.ul>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="focus-ring surface fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full text-muted shadow-lg backdrop-blur-md transition-colors hover:border-signal-amber hover:text-signal-amber"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
