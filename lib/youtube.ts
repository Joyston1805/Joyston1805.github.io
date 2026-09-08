import { brands } from './creator';

export type Video = {
  videoId: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
};

/**
 * Pulls the latest uploads from YouTube's public RSS feed.
 *
 * Why RSS and not the YouTube Data API: RSS needs no API key, no quota, and
 * no secrets stored in the repo. The tradeoff is you only get the ~15 most
 * recent uploads and no view counts — which is all this page needs.
 *
 * This runs at BUILD TIME (during `next build` on the GitHub Actions runner),
 * so visitors get pre-baked HTML and YouTube is never called from a browser.
 * Rebuild the site to refresh the list — the deploy workflow also runs on a
 * weekly schedule so it stays current on its own.
 *
 * Every failure path returns an empty array on purpose: a YouTube outage, a
 * typo'd channel ID, or a sandboxed build environment should never take the
 * whole site build down.
 */
function decodeEntities(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&');
}

function parseFeed(xml: string, limit: number): Video[] {
  const entries = xml.split('<entry>').slice(1);

  return entries.slice(0, limit).map((entry) => {
    const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? '';
    const rawTitle = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
    const published = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? '';
    const thumbFromFeed = entry.match(/<media:thumbnail\s+url="(.*?)"/)?.[1];

    return {
      videoId,
      title: decodeEntities(rawTitle.trim()),
      url: `https://www.youtube.com/watch?v=${videoId}`,
      // i.ytimg.com is the stable thumbnail CDN — predictable and always
      // available for any public video.
      thumbnail: thumbFromFeed ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      published: published.slice(0, 10),
    };
  });
}

export async function getLatestVideos(channelId: string, limit = 3): Promise<Video[]> {
  if (!channelId || !channelId.startsWith('UC')) return [];

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { headers: { 'User-Agent': 'joyston1805.github.io build' } }
    );
    if (!res.ok) {
      console.warn(`[youtube] feed for ${channelId} returned ${res.status}`);
      return [];
    }
    const xml = await res.text();
    return parseFeed(xml, limit).filter((v) => v.videoId);
  } catch (err) {
    console.warn(`[youtube] could not fetch feed for ${channelId}:`, err);
    return [];
  }
}

/** Keyed by brand.key, so components can look up videos per brand. */
export async function getAllChannelVideos(limit = 3): Promise<Record<string, Video[]>> {
  const results = await Promise.all(
    brands.map(async (b) => [b.key, await getLatestVideos(b.channelId, limit)] as const)
  );
  return Object.fromEntries(results);
}
