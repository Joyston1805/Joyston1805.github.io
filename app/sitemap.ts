import { MetadataRoute } from 'next';
import { profile } from '@/lib/content';
import { getPublishedSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/beyond', '/blog'].map((route) => ({
    url: `${profile.siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const blogRoutes = getPublishedSlugs().map((slug) => ({
    url: `${profile.siteUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes];
}
