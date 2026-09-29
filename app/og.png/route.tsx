import { ImageResponse } from 'next/og';
import { profile, kpis } from '@/lib/content';

// The preview card shown when the site is shared on LinkedIn, X, Slack, etc.
// Rendered once at build time, so it always matches lib/content.ts.
// Served as /og.png (a real file extension, so GitHub Pages sends image/png).
export const dynamic = 'force-static';
const size = { width: 1200, height: 630 };

export function GET() {
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
            'radial-gradient(circle at 0% 0%, rgba(242,183,5,0.22), transparent 45%), radial-gradient(circle at 100% 100%, rgba(45,212,191,0.22), transparent 45%)',
          color: '#E8ECF1',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: '#2DD4BF', textTransform: 'uppercase' }}>
            ML Deployment · Business Analytics
          </div>
          <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, marginTop: 24, letterSpacing: -2 }}>
            {profile.name}
            <span style={{ color: '#F2B705' }}>.</span>
          </div>
          <div style={{ fontSize: 32, color: '#7C8AA0', marginTop: 16, maxWidth: 900 }}>
            {profile.titleSuffix}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {kpis.slice(0, 3).map((k, i) => (
            <div
              key={k.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 28px',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <div style={{ fontSize: 44, fontWeight: 700, color: i % 2 === 0 ? '#F2B705' : '#2DD4BF' }}>
                {k.value}
              </div>
              <div style={{ fontSize: 20, color: '#7C8AA0', marginTop: 4 }}>{k.label}</div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: 'auto', fontSize: 24, color: '#7C8AA0' }}>
            {profile.siteUrl.replace('https://', '')}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
