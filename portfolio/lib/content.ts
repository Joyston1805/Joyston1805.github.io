// Single source of truth for personal content.
// Update this file to change what appears across the whole site.

export const profile = {
  name: 'Joyston Fernandes',
  title: 'Aspiring Data Analyst | Business Analytics',
  tagline:
    'Business Analytics student and aspiring Data Analyst with hands-on experience in data intelligence, process optimization, and entry-level machine learning. Skilled in turning raw data into decision-ready dashboards and reports.',
  email: 'Jfern7@unh.newhaven.edu',
  linkedin: 'https://www.linkedin.com/in/joyston-ferns',
  github: 'https://github.com/Joyston1805',
  githubUsername: 'Joyston1805',
  siteUrl: 'https://joyston1805.github.io',
  phone: '', // e.g. '+1 774-701-4162' — left blank on purpose, see README
  resumeHref: '/resume.pdf',
  photoHref: '/profile.jpg',
};

export const kpis = [
  { label: 'Overpacking waste cut', value: '1.9%', context: 'Atticus Bakery' },
  { label: 'GPA', value: '3.7', context: 'B.S. Business Analytics' },
  { label: "Dean's List", value: '6x', context: 'Pompea College of Business' },
  { label: 'Student org led', value: '1', context: 'President, BA Club' },
];

export const skills = {
  Tools: ['Python', 'R (RStudio)', 'SQL', 'Power BI', 'Excel (VBA)', 'Visual Studio'],
  Concepts: ['Data Visualization', 'Forecasting', 'Relational Databases', 'Basic Machine Learning'],
  'Business Systems': [
    'Autodesk',
    'SAGE',
    'Microsoft Dynamics 365',
    'MICROS',
    'TOUCHE',
    'TOAST',
    'IDS',
    'LMS-Canvas',
  ],
};

export type TimelineEntry = {
  kind: 'education' | 'experience';
  title: string;
  org: string;
  location?: string;
  period: string;
  bullets: string[];
};

// Reverse-chronological
export const timeline: TimelineEntry[] = [
  {
    kind: 'experience',
    title: 'Assurance of Learning Assistant',
    org: 'Pompea College of Business',
    period: 'January 2026 – Present',
    bullets: [
      'Collaborate with PCoB faculty on the AACSB Assurance of Learning team, contributing to data collection and analysis for accreditation metrics.',
      'Support continuous improvement of program learning outcomes.',
    ],
  },
  {
    kind: 'education',
    title: 'B.S. Business Analytics',
    org: 'University of New Haven',
    location: 'West Haven, CT',
    period: 'Expected December 2026 · GPA 3.7',
    bullets: [],
  },
  {
    kind: 'experience',
    title: 'Production Data Analyst Intern',
    org: 'Atticus Bakery',
    location: 'New Haven, CT',
    period: 'March 2024 – Present',
    bullets: [
      'Analyzed production and packaging data in Excel, identifying a 1.9% excess in overpacking beyond the 2% buffer — reducing material waste and cost.',
      'Built and maintained KPI reporting files tracking yield, scrap, and line performance for operations leadership.',
      'Collaborated with the DMAT/operations team to improve data collection processes and infrastructure.',
      'Reviewed facility layouts and blueprint changes for Connecticut regulatory compliance.',
    ],
  },
  {
    kind: 'experience',
    title: 'Soccer Coach Trainer',
    org: 'Soccer Shots SWCT',
    location: 'Shelton, CT',
    period: 'February 2024 – Present',
    bullets: [
      'Train and mentor new coaches to deliver a consistent curriculum across age groups, improving session quality and parent satisfaction.',
    ],
  },
  {
    kind: 'education',
    title: 'Post-Graduate Program in Data Science and Business Analytics',
    org: 'University of Texas at Austin',
    location: 'Austin, TX',
    period: 'Completed February 2023 · GPA 3.8',
    bullets: [],
  },
];

export const leadership = [
  {
    title: 'President, UNewHaven Business Analytics Club',
    period: 'March 2025 – Present',
    bullets: [
      'Lead a student organization focused on analytics, data visualization, and career preparation.',
      'Organize workshops in collaboration with faculty and industry speakers.',
      'Coordinate event logistics, marketing, and sponsorship outreach to grow membership and club visibility.',
    ],
  },
];

export const awards = [
  "Pompea College of Business – Dean's List (6x)",
  'Business Analytics Diplomat (2025–2026)',
];
