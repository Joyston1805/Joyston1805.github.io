import { ImageResponse } from 'next/og';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { profile } from '@/lib/content';

// A branded social card per post, served at /og/blog/<slug>.png and built
// once at deploy time. Posts with a `cover` image use that instead.
// (Not /blog/<slug>/og.png: that would create a folder with the same name as
// the post's page, which GitHub Pages can resolve to the folder instead.)
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ image: `${slug}.png` }));
}

export function GET(_req: Request, { params }: { params: { image: string } }) {
  const post = getPostBySlug(params.image.replace(/\.png$/, ''));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0B1220',
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(242,183,5,0.20), transparent 45%), radial-gradient(circle at 100% 100%, rgba(45,212,191,0.20), transparent 45%)',
          color: '#E8ECF1',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', gap: 16, fontSize: 24, color: '#2DD4BF', letterSpacing: 4, textTransform: 'uppercase' }}>
          <span>Blog</span>
          <span style={{ color: '#7C8AA0' }}>·</span>
          <span style={{ color: '#7C8AA0' }}>{post.readingTime}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: post.title.length > 70 ? 54 : 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>
            {post.title}
          </div>
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              {post.tags.slice(0, 4).map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    padding: '6px 16px',
                    borderRadius: 999,
                    background: 'rgba(242,183,5,0.12)',
                    color: '#F2B705',
                    fontSize: 22,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#7C8AA0' }}>
          <span style={{ display: 'flex', color: '#E8ECF1' }}>
            {profile.name}
            <span style={{ color: '#F2B705' }}>.</span>
          </span>
          <span>{profile.siteUrl.replace('https://', '')}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
