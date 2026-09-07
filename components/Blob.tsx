'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * The red, dragged around by the pointer.
 *
 * The first version lagged all three lobes behind the cursor, which is why it
 * read as a decorative shape moving near the mouse rather than a thing the
 * mouse was holding. The fix is that the leading lobe is pinned to the pointer
 * exactly, every frame, with no easing at all. Zero offset is the whole
 * difference between "attached" and "nearby".
 *
 * The other two lobes trail it and an SVG goo filter welds all three together,
 * so the mass grows a tail when you move and pulls back into one shape when you
 * stop. The leading lobe also squashes along its direction of travel in
 * proportion to speed, which is what makes it read as material rather than as
 * a sprite.
 *
 * The letterforms inside are filled from the same three points, so the colour
 * in the type and the glow behind it are one object.
 *
 * Scoped to this element. Moving the pointer out over the photograph does not
 * drag red across it.
 */

const TRAIL = [
  { r: 150, ease: 1 },      // pinned to the pointer
  { r: 116, ease: 0.26 },
  { r: 84, ease: 0.13 },
]

export function Blob({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return

    /* No pointer, no effect. On touch the name renders plain white rather than
       painting a blob wherever somebody last happened to tap. */
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = Array.from(el.querySelectorAll<HTMLElement>('.blobs i'))
    if (nodes.length !== TRAIL.length) return

    const target = { x: 0, y: 0 }
    const at = TRAIL.map(() => ({ x: 0, y: 0 }))
    let vx = 0
    let vy = 0
    let live = false
    let raf = 0

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (!live) {
        live = true
        at.forEach((p) => {
          p.x = x
          p.y = y
        })
        el.dataset.live = '1'
      }
      vx = x - target.x
      vy = y - target.y
      target.x = x
      target.y = y
    }

    const leave = () => {
      live = false
      el.dataset.live = '0'
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!live) return

      /* Speed, smoothed, drives how far the head stretches. Capped so a fast
         flick across the name deforms it without tearing it apart. */
      const speed = Math.min(Math.hypot(vx, vy), 90)
      const pull = speed / 90
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI
      vx *= 0.82
      vy *= 0.82

      for (let i = 0; i < TRAIL.length; i++) {
        const p = at[i]
        const e = TRAIL[i].ease
        p.x += (target.x - p.x) * e
        p.y += (target.y - p.y) * e

        const d = TRAIL[i].r
        const base = `translate3d(${p.x - d / 2}px, ${p.y - d / 2}px, 0)`

        if (i === 0) {
          const sx = 1 + pull * 0.55
          const sy = 1 - pull * 0.26
          nodes[i].style.transform = `${base} rotate(${angle}deg) scale(${sx}, ${sy}) rotate(${-angle}deg)`
        } else {
          nodes[i].style.transform = base
        }

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
        {TRAIL.map((l, i) => (
          <i key={i} style={{ width: l.r, height: l.r }} />
        ))}
      </span>
      {children}
    </div>
  )
}

/**
 * The goo. Blur everything together, then push alpha through a steep ramp so
 * the blurred edges snap back to a hard outline. Two overlapping circles come
 * out of it as one shape with a proper neck between them, which is the thing
 * that makes it read as liquid rather than as three circles.
 */
export function GooFilter() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12"
            result="goo"
          />
          <feGaussianBlur in="goo" stdDeviation="7" />
        </filter>
      </defs>
    </svg>
  )
}
