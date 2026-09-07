'use client'

import { useEffect } from 'react'

/**
 * Reveals `.cut` elements as they enter view.
 *
 * The document only gets marked once this runs, so the CSS default stays
 * visible. Nothing here can leave content hidden: without an observer every
 * element is revealed immediately, and a late sweep catches anything missed.
 */
export function Cut() {
  useEffect(() => {
    const root = document.documentElement
    const items = Array.from(document.querySelectorAll<HTMLElement>('.cut'))
    if (!items.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.classList.add('in'))
      return
    }

    root.classList.add('js-cut')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
    )
    items.forEach((el) => io.observe(el))

    const safety = window.setTimeout(() => {
      document.querySelectorAll('.cut:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.6) el.classList.add('in')
      })
    }, 2500)

    return () => {
      io.disconnect()
      window.clearTimeout(safety)
    }
  }, [])

  return null
}
