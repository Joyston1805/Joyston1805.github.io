import { MetadataRoute } from 'next';
import { profile } from '@/lib/content';
import { getAllSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/blog'].map((route) => ({
    url: `${profile.siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const blogRoutes = getAllSlugs().map((slug) => ({
    url: `${profile.siteUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes];
}
