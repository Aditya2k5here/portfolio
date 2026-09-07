import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://adityas.dev'
  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}/`,
      lastModified: new Date(),
      priority: 0.7,
    })),
  ]
}
