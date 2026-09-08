/**
 * Every path into /public.
 *
 * `next/link` prefixes `basePath` on its own. `next/image` does NOT once
 * `images.unoptimized` is set, which is how the hero shipped to Pages as
 * /hero/aditya-room.webp and 404'd; and a plain <a href="/docs/x.pdf"> never
 * did. So all three go through here, and nothing writes a bare /public path.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const asset = (p: string) => `${BASE}${p}`
