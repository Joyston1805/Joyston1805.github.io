// ============================================================================
// "BEYOND THE DATA" — the channels and pages you run outside analytics
// ============================================================================
// This is the ONLY file you need to edit to change what shows up on the
// /beyond page and in the "Beyond the Data" section of the homepage.
//
// Each entry is a BRAND, not just a channel — one YouTube channel plus
// whatever Instagram, Facebook, or shop pages belong with it. Add, remove,
// or reorder them freely; the pages adapt.
//
// TO ADD A THIRD BRAND: copy one of the blocks below, change the values, and
// paste it into the array. The `channelId` (starts with UC) is what pulls in
// the latest uploads — find it at https://www.youtube.com/account_advanced
// while signed in to that channel.
// ============================================================================

export type BrandLink = {
  kind: 'youtube' | 'instagram' | 'facebook' | 'shop';
  label: string;
  url: string;
};

export type Brand = {
  /** url-safe id, used as a React key and as the anchor on /beyond */
  key: string;
  name: string;
  /** YouTube @handle */
  handle: string;
  youtube: string;
  /** UC... — leave '' to skip auto-fetching videos for this brand */
  channelId: string;
  /** One line, shows under the name */
  tagline: string;
  /** A short paragraph — what it is and who it's for */
  description: string;
  topics: string[];
  accent: 'amber' | 'teal';
  links: BrandLink[];
  /** Optional manual stats. Delete the line if you'd rather not show numbers. */
  stats?: { label: string; value: string }[];
};

export const brands: Brand[] = [
  {
    key: 'travels-of-joy',
    name: 'Travels of Joy',
    handle: '@TravelsofJoyTV',
    youtube: 'https://www.youtube.com/@TravelsofJoyTV',
    channelId: 'UCo6kWU0LVHGPgoG_1SyGi3A',
    tagline: 'Cinematic travel films, scored with my own ambient music',
    description:
      'Trails, hidden waterfalls, coastlines, and wildlife, cut as cinematic films and set to original ambient music I write myself. Made for travel inspiration, or just somewhere quiet to put your attention for a while. New films every Sunday, and the channel supports animal welfare organisations including Best Friends Animal Society.',
    topics: ['Travel', 'Cinematography', 'Ambient Music', '4K Nature'],
    accent: 'teal',
    links: [
      { kind: 'instagram', label: '@trave1sofjoy', url: 'https://www.instagram.com/trave1sofjoy' },
      { kind: 'facebook', label: '/Trave1sofJoy', url: 'https://www.facebook.com/Trave1sofJoy' },
      { kind: 'shop', label: 'Original music at homeofjoy.net', url: 'https://homeofjoy.net/' },
    ],
  },
  {
    key: 'prints-of-joy',
    name: 'Prints of Joy',
    handle: '@PrintsofJoy',
    youtube: 'https://www.youtube.com/@PrintsofJoy',
    channelId: 'UC5ONfgH5o78NNSztHrZIMrA',
    tagline: 'Prints, projects, and time-lapses from a 3D printing enthusiast',
    description:
      'Beginner-friendly and brand-agnostic 3D printing, layer by layer. Builds, failures, and satisfying time-lapses, printed on a Bambu Lab A1. Model files live on the shop alongside the music.',
    topics: ['3D Printing', 'Time-lapse', 'Bambu Lab A1', 'Beginner Friendly'],
    accent: 'amber',
    links: [
      {
        kind: 'instagram',
        label: '@printsofjoyful',
        url: 'https://www.instagram.com/printsofjoyful/',
      },
      {
        kind: 'shop',
        label: 'Files & models at homeofjoy.net',
        url: 'https://homeofjoy.net/3d-prints.html',
      },
    ],
  },
  // ---------------------------------------------------------------------
  // Third channel goes here — copy a block above and fill it in.
  // ---------------------------------------------------------------------
];

/** The shop both brands feed into. */
export const shop = {
  name: 'Home of Joy',
  url: 'https://homeofjoy.net/',
  description:
    'Original music from the travel films, plus the 3D print files from the workshop. Preview any track for free, buy to download the full-quality version.',
};

/** Intro copy for the section — edit freely. */
export const creatorIntro = {
  eyebrow: 'Beyond the Data',
  heading: 'A camera, a 3D printer, and a lot of original music',
  blurb:
    'Analytics is the day job. Off the clock I run Travels of Joy and Prints of Joy — cinematic travel films scored with music I write, and 3D printing built up layer by layer. Different subjects, same instinct: find something interesting, figure out how it works, and share it.',
};

/** Flat list of every social link across all brands — used by the footer. */
export const allSocialLinks = brands.flatMap((brand) =>
  brand.links.filter((l) => l.kind === 'instagram' || l.kind === 'facebook')
);
