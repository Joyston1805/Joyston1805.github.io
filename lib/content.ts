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
  // Used to build "edit this post on GitHub" links from the blog + studio.
  repoUrl: 'https://github.com/Joyston1805/Joyston1805.github.io',
  siteUrl: 'https://joyston1805.github.io',
  phone: '', // e.g. '+1 774-701-4162' — left blank on purpose, see README
  resumeHref: '/resume.pdf',
  photoHref: '/profile.jpg',
  rpubs: 'https://rpubs.com/JoystonFernandes',
};

// ---------------------------------------------------------------------------
// Lossdog career profile.
//
// IMPORTANT: the URL below is an app.lossdog.com session link. Open it in a
// private/incognito window before you rely on it — if it shows a blank page or
// a login screen there, it's tied to YOUR account and visitors won't see
// anything. In that case, look in Lossdog for a "share" or "public profile"
// option and use that URL instead, or set `enabled: false` to hide the card.
// ---------------------------------------------------------------------------
export const lossdog = {
  enabled: true,
  url: 'https://app.lossdog.com/conversation/92be0a45-7b6e-42f8-b4fa-8c20915b0c09/?p=/career/&p.tab=profile',
  heading: 'Career profile on Lossdog',
  blurb:
    'My resume run through Lossdog, an AI platform that benchmarks a professional profile against real Bureau of Labor Statistics wage data by metro area, education, and title.',
  cta: 'View the profile',
};

export type RPubsReport = {
  title: string;
  description: string;
  href: string;
  tags: string[];
};

// A curated subset of published RPubs reports — the strongest/most
// substantial ones. See profile.rpubs above for the full list.
export const rpubsReports: RPubsReport[] = [
  {
    title: 'Forecasting Daily Traffic at Baregg Tunnel',
    description:
      'Naïve vs. linear regression forecasting on 2003–2005 tunnel traffic data, capturing weekly seasonality and trend. Evaluated with RMSE, MAE, MAPE, and MASE.',
    href: 'https://rpubs.com/JoystonFernandes/1398260',
    tags: ['R', 'Forecasting', 'Time Series'],
  },
  {
    title: 'Predicting House Prices',
    description:
      'Regression modeling of house prices from square footage, location, and room count, holding other economic factors constant.',
    href: 'https://rpubs.com/JoystonFernandes/1430721',
    tags: ['R', 'Regression'],
  },
  {
    title: 'Does Job Training Really Improve Earnings?',
    description:
      'Causal inference on the National Supported Work Demonstration dataset using propensity score matching, replicating LaLonde (1986) and Dehejia & Wahba (1999).',
    href: 'https://rpubs.com/JoystonFernandes/1422586',
    tags: ['R', 'Causal Inference', 'Econometrics'],
  },
  {
    title: 'Hedonic Models: Factors Influencing Housing Prices',
    description:
      "Multiple linear regression on the wooldridge hprice2 dataset, isolating the effect of crime rate on median house price while controlling for neighborhood characteristics.",
    href: 'https://rpubs.com/JoystonFernandes/1414722',
    tags: ['R', 'Regression', 'Econometrics'],
  },
  {
    title: 'Titanic Survival Prediction with Decision Trees',
    description:
      'A decision tree model predicting Titanic passenger survival from age, sex, class, and fare, interpreted into human-readable survival rules.',
    href: 'https://rpubs.com/JoystonFernandes/1411430',
    tags: ['R', 'Machine Learning', 'Decision Trees'],
  },
  {
    title: 'NovaBrew Coffee Roaster — Revenue Prediction',
    description:
      'Comparing linear vs. quadratic trend regression models for monthly revenue, to inform a major capital investment decision.',
    href: 'https://rpubs.com/JoystonFernandes/1415347',
    tags: ['R', 'Forecasting', 'Business'],
  },
];

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
