'use client'

import { useEffect, useRef } from 'react'

/**
 * The name, and the red that follows you across it.
 *
 * Three lobes chase the pointer at three different rates. The fast one is
 * almost on the cursor, the slow one is a long way behind it, and an SVG goo
 * filter merges whatever shape they happen to be in. Move quickly and the mass
 * stretches into a tail; stop and it pulls back into one round blob. That
 * lag is the entire effect. A single circle following the cursor exactly is
 * what a basic hover looks like, and it reads as cheap immediately.
 *
 * The letterforms are filled from the same three points, so the colour inside
 * the type and the glow behind it are one object rather than two effects that
 * happen to overlap.
 *
 * Everything runs in one requestAnimationFrame loop writing custom properties.
 * No state, no re-render, no per-letter markup.
 */

const LOBES = [
  { r: 132, ease: 0.22 },
  { r: 104, ease: 0.13 },
  { r: 78, ease: 0.075 },
]

export function Name({ first, last }: { first: string; last: string }) {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* Touch has no hover, so the blob would only ever appear where somebody
       happened to tap. It stays off, and the name renders plain white. */
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const nodes = Array.from(el.querySelectorAll<HTMLElement>('.blobs i'))
    if (nodes.length !== LOBES.length) return

    let target = { x: 0, y: 0 }
    let live = false
    let raf = 0
    const at = LOBES.map(() => ({ x: 0, y: 0 }))

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target = { x: e.clientX - r.left, y: e.clientY - r.top }
      if (!live) {
        live = true
        /* Drop the lobes on the pointer on the first frame, so the blob does
           not fly in from the corner the moment you arrive. */
        at.forEach((p) => {
          p.x = target.x
          p.y = target.y
        })
        el.dataset.live = '1'
      }
    }

    const leave = () => {
      live = false
      el.dataset.live = '0'
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!live) return
      for (let i = 0; i < LOBES.length; i++) {
        const p = at[i]
        p.x += (target.x - p.x) * LOBES[i].ease
        p.y += (target.y - p.y) * LOBES[i].ease
        const d = LOBES[i].r
        nodes[i].style.transform = `translate3d(${p.x - d / 2}px, ${p.y - d / 2}px, 0)`
        el.style.setProperty(`--b${i + 1}x`, `${p.x}px`)
        el.style.setProperty(`--b${i + 1}y`, `${p.y}px`)
      }
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrap} className="namewrap" data-live="0">
      <span aria-hidden className="blobs">
        {LOBES.map((l, i) => (
          <i key={i} style={{ width: l.r, height: l.r }} />
        ))}
      </span>

      <h1 className="nametype">
        <span className="t-h1 block">{first}</span>
        <span className="t-mega -ml-[0.045em] block">{last}</span>
      </h1>
    </div>
  )
}

/**
 * The goo. Blur everything together, then push the alpha through a steep ramp
 * so the blurred edges snap back to a hard outline. Two overlapping circles
 * come out of it as one shape with a proper neck between them, which is the
 * thing that makes it read as liquid rather than as three circles.
 *
 * Rendered once, at the top of the page, referenced by CSS.
 */
export function GooFilter() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="17" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11"
            result="goo"
          />
          <feGaussianBlur in="goo" stdDeviation="6" />
        </filter>
      </defs>
    </svg>
  )
}
