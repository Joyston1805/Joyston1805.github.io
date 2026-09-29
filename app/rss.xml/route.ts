import { getAllPostsMeta } from '@/lib/blog';
import { profile } from '@/lib/content';

// RSS feed for the blog at /rss.xml, generated at build time.
export const dynamic = 'force-static';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const posts = getAllPostsMeta();
  const items = posts
    .map((p) => {
      const url = `${profile.siteUrl}/blog/${p.slug}`;
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escape(p.excerpt)}</description>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(profile.name)} — Blog</title>
    <link>${profile.siteUrl}/blog</link>
    <description>${escape(profile.tagline)}</description>
    <language>en-us</language>
    <atom:link href="${profile.siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
