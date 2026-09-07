import type { Metadata, Viewport } from 'next'
import { Schibsted_Grotesk, Azeret_Mono } from 'next/font/google'
import { profile } from '@/content/profile'
import { Cut } from '@/components/Cut'
import './globals.css'

/* One family doing the whole hierarchy, 10px to 172px. Not a display serif,
   because every generated "premium" site in 2026 reaches for the same one. */
const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-schibsted',
})

/* Figures only. Chosen for its numerals. */
const mono = Azeret_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-azeret',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://adityas.dev'),
  title: {
    default: `${profile.name}, ${profile.headline}`,
    template: `%s · ${profile.name}`,
  },
  description:
    'Backend and systems engineer in Bangalore. A JIT regex engine, a garbage collector with a learned lifetime predictor, a deterministic consensus bug-finder, a complete neural network verifier, and an overload-aware API gateway. Graduating 2027.',
  openGraph: {
    title: `${profile.name}, ${profile.headline}`,
    description: 'Systems work, measured. Graduating May 2027.',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#06070A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--sig)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to the work
        </a>
        {children}
        <Cut />
      </body>
    </html>
  )
}
