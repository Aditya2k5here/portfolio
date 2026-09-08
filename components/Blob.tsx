'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * The red, dragged around by the pointer.
 *
 * Two earlier attempts were wrong in the same way: they were circles. Merging
 * three circles with a goo filter looks organic only while they are separated,
 * and the moment the pointer stops they collapse into one obvious disc.
 *
 * This is a real closed path instead. Ten points around a centre, each with two
 * slow sine terms on its radius at different phases, so the outline is never a
 * circle and never repeats exactly. The path is drawn through them as cubics
 * with Catmull-Rom tangents, which is what keeps the edge smooth rather than
 * polygonal.
 *
 * The centre is the pointer. Not eased toward it, not offset from it: assigned
 * from clientX/clientY every frame, so the blob can never drift. The lag lives
 * in the shape instead. Speed stretches the outline along the direction of
 * travel about an origin pushed ahead of the centre, so the mass piles up
 * behind the cursor and reads as something being dragged, while the cursor
 * itself stays inside it.
 *
 * The letterforms are filled from the same centre, so the colour in the type
 * and the shape behind it are one object.
 */

const N = 10
const R = 78

/* Per-point phases. Fixed, not random, so the server and the client agree and
   the shape is the same one every reload. */
const PHASE = Array.from({ length: N }, (_, i) => ({
  a: i * 1.7,
  b: i * 2.9 + 0.6,
}))

function organicPath(r: number, t: number, pull: number) {
  const pts: [number, number][] = []
  for (let i = 0; i < N; i++) {
    const ang = (i / N) * Math.PI * 2
    const wob = 1 + 0.16 * Math.sin(t * 0.0009 + PHASE[i].a) + 0.09 * Math.sin(t * 0.0015 + PHASE[i].b)
    let x = Math.cos(ang) * r * wob
    let y = Math.sin(ang) * r * wob

    /* Stretch about a point ahead of centre, so the tail forms behind the
       pointer rather than the whole shape growing in both directions. */
    const ox = r * 0.42 * pull
    x = (x - ox) * (1 + pull * 0.85) + ox
    y = y * (1 - pull * 0.3)

    pts.push([x, y])
  }

  /* Closed Catmull-Rom, converted to cubics. */
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % N]
    const p3 = pts[(i + 2) % N]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
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
    const path = el.querySelector<SVGPathElement>('.blob-p')
    if (!g || !path) return

    let px = 0
    let py = 0
    let vx = 0
    let vy = 0
    let heading = 0
    let live = false
    let raf = 0

    /* The centre is written here, on the pointer event itself, not in the
       animation loop. If a frame is dropped the shape stops wobbling for a
       moment; the blob still cannot come off the cursor. */
    const place = (t = 0, pull = 0) => {
      path.setAttribute('d', organicPath(R, t, pull))
      g.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${heading.toFixed(1)})`)
      el.style.setProperty('--bx', `${px}px`)
      el.style.setProperty('--by', `${py}px`)
    }

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (!live) {
        live = true
        el.dataset.live = '1'
      } else {
        vx = x - px
        vy = y - py
      }
      px = x
      py = y
      if (Math.hypot(vx, vy) > 0.4) heading = (Math.atan2(vy, vx) * 180) / Math.PI
      place(e.timeStamp, Math.min(Math.hypot(vx, vy) / 70, 1))
    }

    const leave = () => {
      live = false
      el.dataset.live = '0'
    }

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (!live) return

      /* Smoothed speed. Decays on its own so the tail relaxes when the pointer
         stops rather than freezing mid-stretch. */
      vx *= 0.86
      vy *= 0.86
      const pull = Math.min(Math.hypot(vx, vy) / 70, 1)

      place(t, pull)
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
          <filter id="blob-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="11" />
          </filter>
          <radialGradient id="blob-fill" cx="42%" cy="38%">
            <stop offset="0%" stopColor="#ff4257" />
            <stop offset="58%" stopColor="#e11d33" />
            <stop offset="100%" stopColor="#a5122a" />
          </radialGradient>
        </defs>
        <g className="blob-g">
          <path className="blob-p" fill="url(#blob-fill)" filter="url(#blob-soft)" d="" />
        </g>
      </svg>
      {children}
    </div>
  )
}
