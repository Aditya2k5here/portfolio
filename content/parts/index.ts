import type { Part } from './types.ts'
import { rg01 } from './rg-01.ts'
import { sm02 } from './sm-02.ts'
import { dc03 } from './dc-03.ts'
import { th04 } from './th-04.ts'

export const parts: Part[] = [rg01, sm02, dc03, th04].sort((a, b) => a.order - b.order)

export function partBySlug(slug: string): Part | undefined {
  return parts.find((p) => p.slug === slug)
}

/** Counted from the content, never typed. */
export const totalRemovals = parts.reduce((n, p) => n + p.notBuilt.length, 0)
export const totalParts = parts.length
export const shippedCount = parts.filter((p) => p.status === 'shipped').length

export * from './types.ts'
export { rg01, sm02, dc03, th04 }
