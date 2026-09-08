'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * The red amoeba the pointer drags around.
 *
 * The previous version already generated an uneven path (measured radii 63 to
 * 97 around a mean of 78) and it still read as a spotlight, because two things
 * were flattening it before it reached the screen:
 *
 *   1. a Gaussian blur of stdDeviation 11, on a shape whose bulges were about
 *      49px apart, which is a low-pass filter tuned almost exactly to erase
 *      them, and
 *   2. a radialGradient fill, which is the orb look itself, painted on top.
 *
 * So the silhouette is now carried by a nearly crisp body layer, and the glow
 * is a separate heavily blurred copy underneath it. The fill is flat and a
 * little translucent rather than a gradient.
 *
 * The outline is asymmetric by construction, not by animation: each of the
 * twelve points has its own fixed radius multiplier between 0.76 and 1.24, so
 * even frozen it is not a circle. Slow sine terms on top keep it alive.
 *
 * Movement is soft-body. Every point is a spring pulled toward its resting
 * offset, and each time the centre moves, every point takes an impulse in the
 * opposite direction. Move quickly and the points fall behind and the mass
 * stretches into a tail; stop and the springs draw it back. Because the group
 * is translated to the pointer and the points only ever move in local space,
 * the focal point sits on the cursor by construction and cannot drift.
 */

const N = 12
const R = 74
const WIDE = 1.62 // horizontal stretch of the resting shape
const TALL = 0.86

/* Fixed, not random: the server and the client have to agree, and it should be
   the same creature every time the page loads. */
const BASE = [1.0, 0.79, 1.18, 0.87, 1.24, 0.76, 1.07, 0.93, 1.21, 0.82, 1.13, 0.88]
const PHASE = Array.from({ length: N }, (_, i) => ({ a: i * 1.7, b: i * 2.9 + 0.6 }))

const K = 0.13 // spring toward the resting outline
const DAMP = 0.8
const LAG = 0.62 // how much of the centre's motion each point resists
const MAX_LAG = 46 // ceiling, so a fast flick stretches instead of tearing

type Pt = { ox: number; oy: number; vx: number; vy: number }

/** Closed Catmull-Rom through the points, as cubics, so the edge stays smooth. */
function toPath(pts: Pt[]) {
  const p = pts.map((q) => [q.ox, q.oy] as [number, number])
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`
  for (let i = 0; i < N; i++) {
    const p0 = p[(i - 1 + N) % N]
    const p1 = p[i]
    const p2 = p[(i + 1) % N]
    const p3 = p[(i + 2) % N]
    d +=
      `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)}` +
      ` ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)}` +
      ` ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d + 'Z'
}

export function Blob({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return

    /* No pointer, no effect. On touch the name renders plain white rather than
       leaving a blob wherever somebody last happened to tap. */
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const g = el.querySelector<SVGGElement>('.blob-g')
    const paths = Array.from(el.querySelectorAll<SVGPathElement>('.blob-p'))
    const core = el.querySelector<SVGPathElement>('.blob-core')
    if (!g || !paths.length) return

    const pts: Pt[] = Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2
      return {
        ox: Math.cos(a) * R * BASE[i] * WIDE,
        oy: Math.sin(a) * R * BASE[i] * TALL,
        vx: 0,
        vy: 0,
      }
    })

    let cx = 0
    let cy = 0
    let live = false
    let raf = 0

    const step = (t: number) => {
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2
        const wob =
          BASE[i] +
          0.035 * Math.sin(t * 0.0005 + PHASE[i].a) +
          0.022 * Math.sin(t * 0.0008 + PHASE[i].b)
        const bx = Math.cos(a) * R * wob * WIDE
        const by = Math.sin(a) * R * wob * TALL

        const p = pts[i]
        p.vx = (p.vx + (bx - p.ox) * K) * DAMP
        p.vy = (p.vy + (by - p.oy) * K) * DAMP
        p.ox += p.vx
        p.oy += p.vy
      }
      const d = toPath(pts)
      paths.forEach((p) => p.setAttribute('d', d))
      core?.setAttribute('transform', 'scale(0.62)')
      g.setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`)
    }

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top

      if (!live) {
        live = true
        el.dataset.live = '1'
      } else {
        /* The impulse, applied differentially. A uniform one moved every point
           by the same amount, which slides the whole outline backwards and
           reads as the blob trailing the cursor rather than stretching. Here
           the leading edge barely resists and the trailing edge resists fully,
           so the front stays pinned under the pointer and the back drags out
           into a tail. That is what makes it deform like liquid. */
        const mx = x - cx
        const my = y - cy
        const speed = Math.hypot(mx, my)
        if (speed > 0.01) {
          const ux = mx / speed
          const uy = my / speed
          const kick = Math.min(speed * LAG, MAX_LAG)
          for (const p of pts) {
            const len = Math.hypot(p.ox, p.oy) || 1
            /* +1 on the leading edge, -1 on the trailing edge. */
            const facing = (p.ox / len) * ux + (p.oy / len) * uy
            const resist = 0.5 - 0.5 * facing
            p.ox -= ux * kick * resist
            p.oy -= uy * kick * resist
          }
        }
      }

      cx = x
      cy = y
      el.style.setProperty('--bx', `${x}px`)
      el.style.setProperty('--by', `${y}px`)
      /* Stepped here as well, so the shape is correct on the first event and
         stays correct if a frame is dropped. */
      step(e.timeStamp)
    }

    const leave = () => {
      live = false
      el.dataset.live = '0'
    }

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (live) step(t)
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
      <svg className="blobs" aria-hidden preserveAspectRatio="none">
        <defs>
          {/* The glow, on its own copy so it can bloom without ever touching
              the silhouette. */}
          <filter id="blob-glow" x="-90%" y="-90%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="30" />
          </filter>
          {/* The body. Just enough to take the hardness off the edge and no
              more. This is the filter that used to erase the shape. */}
          <filter id="blob-body" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6.5" />
          </filter>
        </defs>

        <g className="blob-g">
          <path className="blob-p" d="" fill="#e11d33" opacity="0.5" filter="url(#blob-glow)" />
          <path className="blob-p" d="" fill="#dd1b31" opacity="0.6" filter="url(#blob-body)" />
          {/* The core. Same outline at 62%, so the density falls off from the
              middle without a radial gradient anywhere near it. */}
          <path
            className="blob-p blob-core"
            d=""
            fill="#ff4d5f"
            opacity="0.34"
            filter="url(#blob-body)"
          />
        </g>
      </svg>
      {children}
    </div>
  )
}
