import { homeSections, type SectionKey } from '@/lib/site';

// Sections that get a number, in the order they appear on the homepage.
// Hero and the small Lossdog card are left out so the count starts at 01.
const unnumbered: SectionKey[] = ['hero', 'career'];
const numbered = homeSections.filter((k) => !unnumbered.includes(k));

export function sectionNumber(section: SectionKey) {
  const i = numbered.indexOf(section);
  return i === -1 ? '' : String(i + 1).padStart(2, '0');
}

export function SectionEyebrow({ section, children }: { section: SectionKey; children: React.ReactNode }) {
  const n = sectionNumber(section);
  return (
    <p className="section-eyebrow flex items-center gap-3">
      {n && <span className="text-signal-amber">{n}</span>}
      {n && <span aria-hidden className="h-px w-6 bg-current opacity-40" />}
      <span>{children}</span>
    </p>
  );
}

export default function SectionHeading({
  section,
  eyebrow,
  heading,
}: {
  section: SectionKey;
  eyebrow: React.ReactNode;
  heading: React.ReactNode;
}) {
  return (
    <>
      <SectionEyebrow section={section}>{eyebrow}</SectionEyebrow>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
    </>
  );
}
