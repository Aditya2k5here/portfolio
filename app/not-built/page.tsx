import type { Metadata } from 'next'
import { Home } from '@/components/Home'

export const metadata: Metadata = {
  title: 'Not built',
  description: 'The same record, read the other way: what was deliberately not made, and why.',
}

/**
 * NOT BUILT — a real route, so the second view survives with no JavaScript
 * and can be linked to directly. It is never the landing.
 */
export default function Page() {
  return <Home view="not-built" />
}
