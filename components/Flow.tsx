'use client'

import { useRef, type ReactNode } from 'react'

/**
 * Type that takes its colour from where your pointer is.
 *
 * The signal colour is painted into the letterforms at the cursor and falls off
 * to paper white within about twenty characters, so dragging across a heading
 * pulls red through it and leaves it behind. It is one gradient and two custom
 * properties; there is no per-letter markup and nothing is animated on a timer.
 *
 * Parked far off to the left at rest, which means the resting state is plain
 * white text and the effect only exists while somebody is actually pointing at
 * it. See `.flow` in globals.css, which also guards the whole thing behind
 * `@supports (background-clip: text)`.
 */
export function Flow({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  const track = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--fx', `${e.clientX - r.left}px`)
    el.style.setProperty('--fy', `${e.clientY - r.top}px`)
  }

  const park = () => ref.current?.style.setProperty('--fx', '-40ch')

  return (
    <span
      ref={ref}
      className={`flow ${className}`}
      onPointerMove={track}
      onPointerLeave={park}
    >
      {children}
    </span>
  )
}
