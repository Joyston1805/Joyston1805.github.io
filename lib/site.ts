// ============================================================================
// SITE STRUCTURE & COPY
// ============================================================================
// This file controls the SHAPE of the site: what sections exist, what order
// they appear in, and the heading text on each one.
//
// `lib/content.ts`  = the facts about you (jobs, skills, resumes, links)
// `lib/site.ts`     = how those facts are presented (order, headings, nav)
// `lib/creator.ts`  = the YouTube / Instagram / Facebook / shop side
//
// Nothing here requires touching a component.
// ============================================================================

export type SectionKey =
  | 'hero'
  | 'about'
  | 'skills'
  | 'timeline'
  | 'career'
  | 'leadership'
  | 'featured'
  | 'projects'
  | 'rpubs'
  | 'github'
  | 'beyond'
  | 'resume'
  | 'blog'
  | 'contact';

// ---------------------------------------------------------------------------
// THE HOMEPAGE, IN ORDER.
//
// Reorder these lines to reorder the page. Delete a line (or comment it out
// with //) to hide that section completely — nothing else needs changing.
// ---------------------------------------------------------------------------
export const homeSections: SectionKey[] = [
  'hero',
  'about',
  'skills',
  'timeline',
  'career',
  'leadership',
  'featured',
  'projects',
  'rpubs',
  'github',
  'beyond',
  'resume',
  'blog',
  'contact',
];

// ---------------------------------------------------------------------------
// NAVIGATION — the links in the top bar.
// ---------------------------------------------------------------------------
export const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#work', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/#resume', label: 'Resume' },
  { href: '/beyond', label: 'Beyond' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

// ---------------------------------------------------------------------------
// SECTION HEADINGS AND BLURBS
//
// `eyebrow` is the small coloured label above each heading.
// Leave a `blurb` as '' to hide that paragraph.
// ---------------------------------------------------------------------------
export const copy = {
  hero: {
    eyebrow: 'ML Deployment · Business Analytics',
    ctaPrimary: { label: 'View Projects', href: '/projects' },
    ctaSecondary: { label: 'Download Resume', href: '' }, // '' = use primary resume
    ctaTertiary: { label: 'Contact Me →', href: '#contact' },
  },

  about: {
    eyebrow: 'About',
    heading: 'From production floors to production models',
    // Each string becomes its own paragraph. The tagline from content.ts is
    // shown first automatically, so start here with the second paragraph.
    paragraphs: [
      'Currently a Business Analytics student at the University of New Haven, with a Post-Graduate Program in Data Science and Business Analytics from UT Austin already behind me. My work so far has been production data analysis in food manufacturing, learning outcomes analytics in higher education, and leading a student analytics community.',
      "What pulled me toward deployment was noticing how much of the value sits after the model is trained. A forecast in a notebook changes nothing; the same forecast running on a schedule, feeding a dashboard someone checks on a Monday morning, changes how a line gets run. That gap — packaging, serving, monitoring, retraining — is what I'm building toward.",
    ],
    resumeCta: 'Download Full Resume (PDF)',
  },

  skills: {
    eyebrow: 'Toolkit',
    heading: 'Skills & Systems',
    blurb: '',
  },

  timeline: {
    eyebrow: 'Timeline',
    heading: 'Experience & Education',
  },

  leadership: {
    eyebrow: 'Leadership & Awards',
    heading: 'Beyond the spreadsheet',
  },

  projects: {
    eyebrow: 'Portfolio',
    heading: 'Projects',
    viewAll: 'View all →',
  },

  rpubs: {
    eyebrow: 'R & Analytics',
    heading: 'Published Reports',
    blurb:
      'Statistical analysis and forecasting write-ups published on RPubs — regression, causal inference, decision trees, and time series work.',
    viewAll: 'View all on RPubs →',
  },

  github: {
    eyebrow: 'Live from GitHub',
    heading: 'Activity Snapshot',
    blurb: 'These update automatically — no rebuild needed.',
  },

  resume: {
    eyebrow: 'Resume',
    heading: 'Take a copy',
    blurb:
      'Tailored versions for different kinds of roles. Each one is a single PDF — no sign-up, no email gate.',
  },

  blog: {
    eyebrow: 'Writing',
    heading: 'From the Blog',
    viewAll: 'View all →',
  },

  contact: {
    eyebrow: 'Get in touch',
    heading: "Let's talk deployment",
  },
};

// ---------------------------------------------------------------------------
// COLOURS
//
// The two accent colours used across the whole site live in
// `tailwind.config.ts` under `signal.amber` and `signal.teal`. Change those
// two hex values and everything — buttons, chips, links, timeline dots —
// recolours at once.
// ---------------------------------------------------------------------------
