import { Youtube, Instagram, Facebook, ShoppingBag, PlayCircle } from 'lucide-react';
import { brands, shop, creatorIntro } from '@/lib/creator';
import { getAllChannelVideos } from '@/lib/youtube';
import { profile } from '@/lib/content';

export const metadata = {
  title: `Beyond the Data | ${profile.name}`,
  description:
    'Travels of Joy and Prints of Joy — cinematic travel films with original music, and 3D printing layer by layer.',
};

const accentClasses = {
  amber: {
    text: 'text-signal-amber',
    chip: 'bg-signal-amber/10 text-signal-amber',
    button: 'bg-signal-amber text-ink-900',
  },
  teal: {
    text: 'text-signal-teal',
    chip: 'bg-signal-teal/10 text-signal-teal',
    button: 'bg-signal-teal text-ink-900',
  },
} as const;

const linkIcon = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  shop: ShoppingBag,
} as const;

export default async function BeyondPage() {
  const videosByBrand = await getAllChannelVideos(3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="section-eyebrow">{creatorIntro.eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
        {creatorIntro.heading}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{creatorIntro.blurb}</p>

      <div className="mt-16 space-y-20">
        {brands.map((brand) => {
          const accent = accentClasses[brand.accent];
          const videos = videosByBrand[brand.key] ?? [];

          return (
            <section key={brand.key} id={brand.key} className="scroll-mt-24">
              <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <Youtube className={`h-6 w-6 shrink-0 ${accent.text}`} />
                    <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                      {brand.name}
                    </h2>
                  </div>
                  <p className="mt-2 font-mono text-sm text-muted">{brand.handle}</p>
                  <p className={`mt-4 font-display text-lg ${accent.text}`}>{brand.tagline}</p>
                  <p className="mt-4 max-w-xl text-muted">{brand.description}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {brand.topics.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${accent.chip}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={brand.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`focus-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm font-medium transition-transform hover:scale-105 ${accent.button}`}
                    >
                      <PlayCircle className="h-4 w-4" />
                      Watch on YouTube
                    </a>
                    {brand.links.map((link) => {
                      const Icon = linkIcon[link.kind];
                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-ring inline-flex items-center gap-2 rounded-full border border-current px-4 py-2.5 font-mono text-xs transition-colors hover:border-signal-teal hover:text-signal-teal"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </div>

                {brand.stats && brand.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/10 dark:border-white/10">
                    {brand.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="surface flex flex-col gap-1 p-5"
                        style={{ borderRadius: 0 }}
                      >
                        <span className={`kpi-value text-2xl font-semibold ${accent.text}`}>
                          {stat.value}
                        </span>
                        <span className="text-sm text-muted">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {videos.length > 0 && (
                <>
                  <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
                    Latest uploads
                  </p>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                      <a
                        key={video.videoId}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring surface group flex flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
                      >
                        <div className="relative aspect-video overflow-hidden bg-ink-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={video.thumbnail}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <PlayCircle className="absolute bottom-3 right-3 h-8 w-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <h3 className="font-display text-sm font-semibold leading-snug">
                            {video.title}
                          </h3>
                          <span className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                            {video.published}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </section>
          );
        })}
      </div>

      <section className="surface mt-24 rounded-2xl p-8">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-signal-teal" />
          <h2 className="font-display text-2xl font-semibold tracking-tight">{shop.name}</h2>
        </div>
        <p className="mt-4 max-w-2xl text-muted">{shop.description}</p>
        <a
          href={shop.url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full border border-current px-5 py-2.5 font-mono text-sm transition-colors hover:border-signal-teal hover:text-signal-teal"
        >
          Visit the shop →
        </a>
      </section>
    </div>
  );
}
