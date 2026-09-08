import type { NextConfig } from 'next'

/**
 * Static export. There is no server, no database and no API route on this site.
 * That is not a limitation of the tooling — it is the argument the site makes.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath: base || undefined,
  assetPrefix: base || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default nextConfig
