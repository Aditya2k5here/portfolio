'use client'

import { useEffect, useRef } from 'react'

/**
 * One in the morning.
 *
 * Drawn rather than photographed, and drawn for its lighting: a warm bulb on
 * the left, a cold laptop in the middle, and a city through the window on the
 * right, three sources that disagree with each other, which is what a room
 * actually looks like at this hour.
 *
 * The lamp is draggable. Pull it and it swings on a damped pendulum, and the
 * warm pool, the rim on his face and the highlight on the table all move with
 * it, because a lamp you can move that does not change the light is a toy
 * rather than a light. Physics runs in one rAF loop writing two custom
 * properties; nothing re-renders.
 *
 * On touch there is no hover and dragging competes with scrolling, so the lamp
 * takes a tap instead and swings once. Reduced motion gets a still scene.
 */

/* Pendulum. Light damping and a slow period, so it settles over a couple of
   seconds rather than snapping back like a spring toy. */
const GRAVITY = 0.0042
const DAMPING = 0.986
const ANCHOR = { x: 404, y: -40 }

export function Scene({ className = '' }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = root.current
    if (!svg) return

    const lamp = svg.querySelector<SVGGElement>('#lamp')
    const hint = svg.querySelector<SVGGElement>('#lamp-hint')
    if (!lamp) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let angle = reduce ? 0 : -0.055
    let vel = 0
    let dragging = false
    let raf = 0

    /* Client point -> viewBox point, so the maths works at any rendered size
       and survives the slice cropping. */
    const toLocal = (e: PointerEvent) => {
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const m = svg.getScreenCTM()
      return m ? pt.matrixTransform(m.inverse()) : null
    }

    const paint = () => {
      lamp.setAttribute(
        'transform',
        `rotate(${(angle * 180) / Math.PI} ${ANCHOR.x} ${ANCHOR.y})`,
      )
      /* Where the bulb actually ended up, so the light can follow it. */
      const len = 300
      svg.style.setProperty('--lx', String(ANCHOR.x + Math.sin(angle) * len))
      svg.style.setProperty('--ly', String(ANCHOR.y + Math.cos(angle) * len))
      svg.style.setProperty('--tilt', String((angle * 180) / Math.PI))
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!dragging) {
        vel += -GRAVITY * Math.sin(angle)
        vel *= DAMPING
        angle += vel
        if (Math.abs(angle) < 0.0004 && Math.abs(vel) < 0.0004) {
          angle = 0
          vel = 0
        }
      }
      paint()
    }

    const down = (e: PointerEvent) => {
      dragging = true
      hint?.style.setProperty('opacity', '0')
      ;(e.target as Element).setPointerCapture?.(e.pointerId)
      e.preventDefault()
    }

    const move = (e: PointerEvent) => {
      if (!dragging) return
      const p = toLocal(e)
      if (!p) return
      const next = Math.atan2(p.x - ANCHOR.x, p.y - ANCHOR.y)
      /* Clamped, so it cannot be swung over the top and left upside down. */
      const clamped = Math.max(-0.42, Math.min(0.42, next))
      vel = clamped - angle
      angle = clamped
      e.preventDefault()
    }

    const up = () => {
      dragging = false
    }

    const grabs = Array.from(svg.querySelectorAll<SVGElement>('.lamp-grab'))
    grabs.forEach((g) => g.addEventListener('pointerdown', down))
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)

    if (reduce) {
      paint()
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      grabs.forEach((g) => g.removeEventListener('pointerdown', down))
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <svg
      ref={root}
      viewBox="0 0 900 700"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Illustration: Aditya at night on a beanbag with a laptop and a mug of coffee, lit by a hanging lamp you can drag."
      xmlns="http://www.w3.org/2000/svg"
      style={{ ['--lx' as string]: '404', ['--ly' as string]: '260' }}
    >
      <defs>
        <linearGradient id="s-wall" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#14171e" />
          <stop offset="55%" stopColor="#0d1015" />
          <stop offset="100%" stopColor="#08090d" />
        </linearGradient>

        <radialGradient id="s-warm">
          <stop offset="0%" stopColor="#ffc061" stopOpacity="0.5" />
          <stop offset="34%" stopColor="#f59331" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#f59331" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="s-bulb" cx="40%" cy="34%">
          <stop offset="0%" stopColor="#fff6dc" />
          <stop offset="52%" stopColor="#ffc558" />
          <stop offset="100%" stopColor="#ef8f24" />
        </radialGradient>

        <radialGradient id="s-screen" cx="50%" cy="90%">
          <stop offset="0%" stopColor="#a8e6ff" stopOpacity="0.34" />
          <stop offset="52%" stopColor="#4cc9f0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#4cc9f0" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="s-skin" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#f0b47c" />
          <stop offset="42%" stopColor="#c98d61" />
          <stop offset="100%" stopColor="#8a5738" />
        </linearGradient>

        <linearGradient id="s-hair" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#3b4450" />
          <stop offset="42%" stopColor="#171c24" />
          <stop offset="100%" stopColor="#090b0f" />
        </linearGradient>

        <linearGradient id="s-hoodie" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#2a313d" />
          <stop offset="46%" stopColor="#1a1f28" />
          <stop offset="100%" stopColor="#0e1116" />
        </linearGradient>

        <linearGradient id="s-bag" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#a51a2e" />
          <stop offset="44%" stopColor="#741321" />
          <stop offset="100%" stopColor="#3d0a13" />
        </linearGradient>

        <linearGradient id="s-table" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a2a1c" />
          <stop offset="38%" stopColor="#241a11" />
          <stop offset="100%" stopColor="#12100d" />
        </linearGradient>

        <linearGradient id="s-lid" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#464f5d" />
          <stop offset="60%" stopColor="#2b323d" />
          <stop offset="100%" stopColor="#1b2028" />
        </linearGradient>

        <filter id="s-blur" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="s-blur-sm" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* ================================================== the room shell */}
      <rect width="900" height="700" fill="url(#s-wall)" />

      {/* panelling, just enough to give the wall a grain */}
      <g stroke="#161b23" strokeWidth="1.5" opacity="0.45">
        <path d="M196 0v470M372 0v300M556 0v210" />
      </g>

      {/* ------------------------------------------------------- window --- */}
      <g>
        <rect x="648" y="52" width="252" height="404" fill="#0b1119" />
        <rect x="648" y="52" width="252" height="404" fill="#101a2b" opacity="0.85" />
        {/* the city, deterministic so server and client agree */}
        {Array.from({ length: 34 }, (_, i) => {
          const x = 662 + ((i * 53) % 224)
          const y = 250 + ((i * 71) % 180)
          const w = 3 + ((i * 7) % 4)
          const h = 3 + ((i * 5) % 5)
          const warm = i % 3 === 0
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              fill={warm ? '#ffc061' : '#7fb4e0'}
              opacity={warm ? 0.5 : 0.26}
            />
          )
        })}
        {/* building masses */}
        <g fill="#0a0f18">
          <path d="M648 300h48v156h-48zM712 262h40v194h-40zM772 322h52v134h-52zM840 286h60v170h-60z" />
        </g>
        <rect x="648" y="52" width="252" height="404" fill="none" stroke="#1d242f" strokeWidth="2" />
        <path d="M770 52v404M648 250h252" stroke="#1d242f" strokeWidth="2" />
      </g>

      {/* ------------------------------------------------- framed picture -- */}
      <g>
        <rect x="576" y="86" width="104" height="128" fill="#0e1218" stroke="#272e3a" strokeWidth="3" />
        <path d="M584 190l30-42 22 26 18-20 20 36z" fill="#1b2432" />
        <circle cx="652" cy="116" r="10" fill="var(--sig)" opacity="0.75" />
      </g>

      {/* =============================================== light from the lamp
           Positioned from --lx/--ly, which the pendulum updates, so the pool
           tracks the bulb instead of staying where it was drawn. */}
      <g style={{ transform: 'translate(calc((var(--lx) - 404) * 1px), 0)' }}>
        <circle cx="404" cy="264" r="300" fill="url(#s-warm)" />
        <ellipse cx="440" cy="556" rx="340" ry="62" fill="url(#s-warm)" opacity="0.7" />
      </g>

      {/* ------------------------------------------------------- the plant - */}
      <g>
        <path d="M236 516c-7-50-5-90 4-120l44 2c9 32 10 74 4 118z" fill="#1c2419" />
        <g fill="#2c3d26">
          <path d="M262 400c-38-9-64-42-62-84 29 7 55 35 62 84z" />
          <path d="M264 398c29-20 42-60 31-97-27 15-40 51-31 97z" />
          <path d="M260 396c-33-29-42-71-24-106 24 22 33 64 24 106z" />
          <path d="M266 394c33-4 60-33 62-71-31 0-58 27-62 71z" />
        </g>
        <g fill="#3d5334" opacity="0.75">
          <path d="M263 396c-22-24-26-57-13-84 18 18 22 51 13 84z" />
        </g>
      </g>

      {/* ================================================== the lamp itself */}
      <g id="lamp">
        <line x1={ANCHOR.x} y1={ANCHOR.y} x2={ANCHOR.x} y2="188" stroke="#2b313d" strokeWidth="3" />
        <path
          className="lamp-grab"
          d={`M${ANCHOR.x - 9} 186h18a5 5 0 0 1 5 5v14h-28v-14a5 5 0 0 1 5-5z`}
          fill="#3b4450"
          stroke="none"
        />
        <rect className="lamp-grab" x={ANCHOR.x - 15} y="204" width="30" height="9" rx="3" fill="#333b47" />

        {/* the glass shade */}
        <path
          className="lamp-grab"
          d={`M${ANCHOR.x - 56} 213h112l-14 62a44 44 0 0 1-84 0z`}
          fill="#ffcf7a"
          opacity="0.16"
        />
        <path
          className="lamp-grab"
          d={`M${ANCHOR.x - 56} 213h112l-14 62a44 44 0 0 1-84 0z`}
          fill="none"
          stroke="#ffc061"
          strokeWidth="2.5"
          opacity="0.55"
        />

        <circle cx={ANCHOR.x} cy="266" r="52" fill="#ffc061" opacity="0.5" filter="url(#s-blur)" />
        <circle className="lamp-grab" cx={ANCHOR.x} cy="264" r="21" fill="url(#s-bulb)" />
        <path
          d={`M${ANCHOR.x - 6} 272c0-8 3-9 3-15s-4-6-4-11M${ANCHOR.x + 6} 272c0-8-3-9-3-15s4-6 4-11`}
          stroke="#fff8e4"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        <g id="lamp-hint" className="a-hint">
          <path
            d={`M${ANCHOR.x - 104} 150c26 10 42 26 50 50`}
            stroke="var(--grey-2)"
            strokeWidth="1.6"
            fill="none"
            strokeDasharray="3 4"
          />
          <path d={`M${ANCHOR.x - 50} 208l-3-16 13 5z`} fill="var(--grey-2)" />
          <text
            className="lamp-hint"
            x={ANCHOR.x - 118}
            y="142"
            textAnchor="end"
            fontStyle="italic"
            fontSize="15"
          >
            drag me
          </text>
        </g>
      </g>

      {/* ================================================== the floor plane */}
      <path d="M0 496h900v204H0z" fill="#0a0c11" />
      <path d="M0 496h900v2H0z" fill="#242b36" />

      {/* The seated group is transformed as a unit. It was drawn small and
          too far left, where the mask that dissolves the scene into the page
          was eating half of him. */}
      <g transform="translate(23,-54) scale(1.1)">
      {/* ==================================================== the beanbag -- */}
      <g>
        <ellipse cx="452" cy="512" rx="196" ry="34" fill="#000" opacity="0.5" />
        <path
          d="M282 508c-14-58 6-104 56-128 34-16 58-46 106-46 62 0 104 34 124 82 16 38 18 76 8 92z"
          fill="url(#s-bag)"
        />
        {/* seams */}
        <path
          d="M330 420c40 22 92 30 148 20M300 470c60 26 140 30 216 8"
          stroke="#4d0c16"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
      </g>

      {/* ====================================================== the figure - */}
      <g className="a-breathe">
        {/* far leg, folded */}
        <path d="M336 486c-6-30 8-52 40-60l70-8 6 46-64 24z" fill="#171b22" />
        {/* near leg, crossed in front */}
        <path d="M368 500c-10-26 4-46 34-54l86-16 10 44-72 32z" fill="#1e232c" />
        <path d="M368 500c-10-26 4-46 34-54" stroke="#2b323d" strokeWidth="2" fill="none" />
        {/* sock */}
        <path d="M354 494c-14 2-22 8-20 16 2 8 16 10 30 6l10-4-8-20z" fill="#d9dde3" />

        {/* torso, leaning back into the bag */}
        <path d="M404 400c-8-58 12-100 56-104 46-4 74 32 78 92 2 22 0 38-4 48l-124 6z" fill="url(#s-hoodie)" />

        {/* hood bunched behind the neck */}
        <path d="M436 316c-14 10-20 24-18 38 18-14 46-18 74-8 12 4 20 12 24 22 4-22-4-42-22-52-18-10-42-10-58 0z" fill="#141920" />

        {/* the arm that holds the mug */}
        <path
          d="M424 352c-24 18-32 44-24 62 6 14 22 16 32 4 10-14 18-38 20-52z"
          fill="#232a35"
        />
        <path d="M430 396c-6 12-4 22 6 26 10 4 18-2 20-14z" fill="#c98d61" />

        {/* neck */}
        <path d="M456 292h30v40h-30z" fill="#9c6a45" />

        {/* head, tipped down toward the mug */}
        <g transform="rotate(-7 472 250)">
          <path
            d="M438 248c0-40 16-62 40-62s40 22 40 62c0 36-15 66-40 68s-40-32-40-68z"
            fill="url(#s-skin)"
          />
          {/* ear */}
          <path d="M516 246c8-4 12 2 11 11s-7 14-12 12z" fill="#a97350" />

          {/* hair: short sides, mass swept up and back */}
          <path
            d="M436 252c-4-30 2-52 16-64 16-15 40-19 56-9 19 11 21 31 11 44 11 6 15 17 14 32
               -5-16-13-24-24-27-15 17-44 21-61 9-6 4-10 9-12 15z"
            fill="url(#s-hair)"
          />
          <path d="M452 194c14-16 37-20 51-11-18-3-37 1-51 11z" fill="#4a5462" opacity="0.45" />

          {/* looking down at the screen */}
          <path d="M450 252c5-7 15-7 20 0-5 6-15 6-20 0z" fill="#0e1218" />
          <path d="M482 252c5-7 15-7 20 0-5 6-15 6-20 0z" fill="#0e1218" />
          <path
            d="M447 236c7-5 16-5 22-1M479 235c7-4 16-4 22 1"
            stroke="#141920"
            strokeWidth="4.2"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M476 262c2 7 3 10-2 11" stroke="#8b5837" strokeWidth="2.6" strokeLinecap="round" fill="none" />

          {/* the warm side */}
          <path
            d="M438 248c0-40 16-62 40-62-18 6-27 26-27 62 0 32 8 59 24 67-22-4-37-32-37-67z"
            fill="#ffb45e"
            opacity="0.22"
          />
        </g>

        {/* the mug, at his mouth */}
        <g>
          <g stroke="#c9cfd8" strokeWidth="2.6" strokeLinecap="round" fill="none">
            <path className="a-steam" d="M424 292c-8-11 7-17 0-29" opacity="0" />
            <path className="a-steam-2" d="M438 288c-8-12 7-18 0-31" opacity="0" />
          </g>
          <path d="M416 300h40v34a10 10 0 0 1-10 10h-20a10 10 0 0 1-10-10z" fill="#1c2129" />
          <path d="M416 300h40v5h-40z" fill="#39414f" />
          <path
            d="M456 308c12-3 16 4 15 11s-7 12-16 10"
            stroke="#1c2129"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* fingers round it */}
          <path d="M436 344c-12 2-20-2-21-10s6-13 17-13z" fill="#c98d61" />
        </g>
      </g>

      {/* ====================================================== the laptop - */}
      <ellipse cx="508" cy="424" rx="122" ry="70" fill="url(#s-screen)" className="a-screen" />
      <g>
        {/* lid, seen from behind, resting on his lap */}
        <path d="M474 378l84 5 17 74-108-6z" fill="url(#s-lid)" />
        <path d="M475 381l82 4 1 4-83-4z" fill="#9fe3ff" opacity="0.55" filter="url(#s-blur-sm)" />
        {/* deck */}
        <path d="M467 451l108 6 11 13-118-6z" fill="#242a34" />
        <path d="M468 464l117 6v4l-117-6z" fill="#414a58" />
      </g>
      </g>

      {/* ============================================= the table, foreground */}
      <path d="M0 566h900v134H0z" fill="url(#s-table)" />
      <path d="M0 566h900v3H0z" fill="#6b5334" opacity="0.55" />
      <g style={{ transform: 'translate(calc((var(--lx) - 404) * 0.6px), 0)' }}>
        <path d="M210 566h430v3H210z" fill="#ffc061" opacity="0.5" />
      </g>

      {/* notebook and pen */}
      <g>
        <rect x="120" y="596" width="188" height="62" rx="4" fill="#161b22" />
        <rect x="120" y="596" width="188" height="6" rx="3" fill="#232a34" />
        <rect x="330" y="612" width="120" height="7" rx="3.5" fill="#2b323d" />
        <circle cx="452" cy="615" r="4" fill="var(--sig)" />
      </g>

      {/* the books, stacked on the table, spines out */}
      <g>
        {['SYSTEMS', 'PRODUCTS', 'IDEAS', 'DISCIPLINE'].map((t, i) => (
          <g key={t}>
            <rect
              x={694 - i * 5}
              y={614 - i * 20}
              width={186 + i * 10}
              height="19"
              rx="2"
              fill={i % 2 ? '#1c222b' : '#161b23'}
              stroke="#2f3846"
              strokeWidth="1"
            />
            <text
              x={710 - i * 5}
              y={628 - i * 20}
              fill="#7a828f"
              fontSize="10"
              letterSpacing="1.8"
              fontFamily="var(--font-azeret), monospace"
            >
              {t}
            </text>
          </g>
        ))}
      </g>

      {/* the glasses on the table */}
      <g stroke="#39414f" strokeWidth="3" fill="none">
        <circle cx="500" cy="614" r="17" />
        <circle cx="548" cy="614" r="17" />
        <path d="M517 612h14M483 606l-18-6M565 606l20-4" />
      </g>
    </svg>
  )
}
