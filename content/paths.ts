/**
 * Asset paths that are not routed through next/image or next/link.
 *
 * Those two prefix `basePath` themselves; a plain <a href="/docs/x.pdf"> does
 * not, and would 404 wherever the site is served from a sub-path. Everything
 * pointing at /public goes through here.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const asset = (p: string) => `${BASE}${p}`
