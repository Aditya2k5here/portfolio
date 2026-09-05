import type { MetadataRoute } from 'next'
import { parts } from '@/content/parts'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://adityas.dev'
  const routes = ['', '/not-built', '/notes', '/about', '/contact']
  return [
    ...routes.map((r) => ({ url: `${base}${r}/`, lastModified: new Date() })),
    ...parts.map((p) => ({ url: `${base}/work/${p.slug}/`, lastModified: new Date() })),
  ]
}
