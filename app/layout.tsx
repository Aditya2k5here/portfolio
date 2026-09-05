import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono, Newsreader } from 'next/font/google'
import { SiteIndex } from '@/components/Index'
import { site } from '@/content/site'
import './globals.css'

/* Self-hosted by next/font. No font request leaves the domain. */
/* Variable, so the wdth axis is available: section titles sit at 66–78%. */
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
})

/* Italic only — the thesis face is never set upright anywhere on the site. */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-newsreader',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — As built / Not built`,
    template: `%s — ${site.name}`,
  },
  description:
    'An as-built record of four systems: what was made, and what was deliberately not made.',
  metadataBase: new URL('https://adityas.dev'),
  openGraph: {
    title: `${site.name} — As built / Not built`,
    description: 'An as-built record of four systems.',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E8E3D9' },
    { media: '(prefers-color-scheme: dark)', color: '#131209' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.16em] focus:text-paper"
        >
          Skip to content
        </a>

        <SiteIndex />

        <main id="main" className="px-5 pb-28 lg:pl-[236px] lg:pr-10">
          <div className="mx-auto max-w-[1180px]">{children}</div>
        </main>
      </body>
    </html>
  )
}
