import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';
import { services } from '@/lib/services/data';

const lastModified = new Date('2026-05-08');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/oferta`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${siteUrl}/oferta/${s.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/o-mnie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/kontakt`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
