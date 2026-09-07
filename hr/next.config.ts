import type { NextConfig } from 'next'

/**
 * Static export. There is no server, no database and no API route on this site.
 * That is not a limitation of the tooling — it is the argument the site makes.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default nextConfig
