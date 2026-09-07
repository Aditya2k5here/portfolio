import type { Metadata, Viewport } from 'next'
import { Schibsted_Grotesk, Azeret_Mono } from 'next/font/google'
import { profile } from '@/content/profile'
import './globals.css'

const sans = Schibsted_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-schibsted' })
const mono = Azeret_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-azeret',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://adityas.dev'),
  title: `${profile.name} · ${profile.headline}`,
  description:
    'One page. Backend and systems engineer in Bangalore, graduating May 2027. A JIT regex engine, a garbage collector with a learned lifetime predictor, an overload-aware gateway, and a skin lesion classifier whose evaluation I broke on purpose.',
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
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  )
}
