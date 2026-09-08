'use client'

import { useEffect, useRef } from 'react'

/**
 * The lamp, drawn live so it can be played with.
 *
 * The reference render has a lamp baked into it, and a baked lamp cannot
 * swing, so the artwork is cropped just to the right of it and this hangs in
 * the black where it used to be. The warm falloff still present on the left
 * edge of the photograph reads as this lamp's light.
 *
 * It is a pendulum on a cord that stretches. Pull it and the cord lengthens up
 * to a limit and the shade follows your hand; let go and both spring back,
 * angle and length on separate springs with different stiffness, which is why
 * the recoil looks like a weight on a wire instead of a rotating sprite.
 *
 * The glow is a sibling that reads the same two custom properties, so the light
 * goes where the bulb actually is rather than staying where it was drawn.
 *
 * The cord pays out rather than the whole assembly sliding: rotating and then
 * translating the rig moved the cord's top end off the ceiling and opened a
 * gap at the crop line, so `#rig` only rotates now, the two cord lines have
 * their y2 driven, and `#fixture` alone carries the travel.
 *
 * A note on the sign. In SVG's y-down space rotate(+θ) about the ceiling fixing
 * maps the hanging point (0, L) to (-L·sinθ, L·cosθ), so a positive angle
 * swings the shade left. Taking the pointer's angle straight out of atan2 drove
 * the lamp away from the hand; it is negated, and the bulb's x is derived with
 * the matching sign.
 *
 * There is no label on it. A lamp that swings the moment you touch it does not
 * need one, and the annotation was the only piece of interface left in the
 * picture.
 */

/* Anchor is the ceiling fixing, in the SVG's own coordinates. */
const AX = 150
const AY = -12
const REST = 232

const GRAVITY = 0.0055
const ANG_DAMP = 0.988
const LEN_STIFF = 0.14
const LEN_DAMP = 0.78
const MAX_STRETCH = 92

export function Lamp({ className = '' }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = root.current
    if (!svg) return
    const rig = svg.querySelector<SVGGElement>('#rig')
    const fixture = svg.querySelector<SVGGElement>('#fixture')
    const cords = Array.from(svg.querySelectorAll<SVGLineElement>('.cord'))
    if (!rig) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Dead straight at rest. It used to start tilted and settle, which read
       as the lamp reacting to the pointer merely arriving. */
    let angle = 0
    let angVel = 0
    let stretch = 0
    let stretchVel = 0
    let dragging = false
    let raf = 0

    const toLocal = (e: PointerEvent) => {
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const m = svg.getScreenCTM()
      return m ? pt.matrixTransform(m.inverse()) : null
    }

    const paint = () => {
      const len = REST + stretch
      rig.setAttribute('transform', `rotate(${(angle * 180) / Math.PI} ${AX} ${AY})`)
      /* The cord grows; only the fixture travels. Translating the whole rig
         dragged the cord's top end away from the ceiling and opened a gap. */
      cords.forEach((c) => c.setAttribute('y2', String(AY + 150 + stretch)))
      fixture?.setAttribute('transform', `translate(0 ${stretch})`)
      /* Where the bulb ended up, for the glow and for anything outside that
         wants to follow the light. */
      svg.style.setProperty('--bx', String(AX - Math.sin(angle) * len))
      svg.style.setProperty('--by', String(AY + Math.cos(angle) * len))
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!dragging) {
        angVel += -GRAVITY * Math.sin(angle)
        angVel *= ANG_DAMP
        angle += angVel

        stretchVel += -stretch * LEN_STIFF
        stretchVel *= LEN_DAMP
        stretch += stretchVel

        if (
          Math.abs(angle) < 0.0005 && Math.abs(angVel) < 0.0005 &&
          Math.abs(stretch) < 0.05 && Math.abs(stretchVel) < 0.05
        ) {
          angle = angVel = stretch = stretchVel = 0
        }
      }
      paint()
    }

    const down = (e: PointerEvent) => {
      dragging = true
      /* Throws if the pointer went away between the event being queued and
         handled. Capture is an optimisation here; the window listeners below
         already track the drag without it. */
      try {
        ;(e.target as Element).setPointerCapture?.(e.pointerId)
      } catch {
        /* no capture, drag still works */
      }
      e.preventDefault()
    }

    const move = (e: PointerEvent) => {
      if (!dragging) return
      const p = toLocal(e)
      if (!p) return
      const dx = p.x - AX
      const dy = p.y - AY
      const next = Math.max(-0.72, Math.min(0.72, -Math.atan2(dx, dy)))
      angVel = next - angle
      angle = next

      const dist = Math.hypot(dx, dy)
      const want = Math.max(0, Math.min(MAX_STRETCH, dist - REST))
      stretchVel = want - stretch
      stretch = want
      paint()
      e.preventDefault()
    }

    const up = () => {
      dragging = false
    }

    const grabs = Array.from(svg.querySelectorAll<SVGElement>('.grab'))
    grabs.forEach((g) => g.addEventListener('pointerdown', down))
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)

    if (reduce) paint()
    else raf = requestAnimationFrame(tick)

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
      viewBox="0 0 400 470"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      style={{ ['--bx' as string]: String(AX), ['--by' as string]: String(AY + REST) }}
    >
      <defs>
        <radialGradient id="l-halo">
          <stop offset="0%" stopColor="#ffc061" stopOpacity="0.62" />
          <stop offset="30%" stopColor="#f7991f" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#f7991f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="l-glass" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#ffcf7d" stopOpacity="0.34" />
          <stop offset="46%" stopColor="#ffb347" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#c9752a" stopOpacity="0.26" />
        </linearGradient>
        <radialGradient id="l-bulb" cx="42%" cy="34%">
          <stop offset="0%" stopColor="#fffaee" />
          <stop offset="46%" stopColor="#ffcf72" />
          <stop offset="100%" stopColor="#f2971f" />
        </radialGradient>
        <linearGradient id="l-collar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6d5a3c" />
          <stop offset="42%" stopColor="#c9a35f" />
          <stop offset="100%" stopColor="#4a3d29" />
        </linearGradient>
        <filter id="l-soft" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      {/* the throw, following the bulb rather than staying where it was drawn */}
      <circle
        cx="0"
        cy="0"
        r="196"
        fill="url(#l-halo)"
        style={{ transform: 'translate(calc(var(--bx) * 1px), calc(var(--by) * 1px))' }}
      />

      <g id="rig" className="grab">
        {/* cord: y2 is driven, so it pays out as the lamp is pulled down */}
        <line className="cord" x1={AX} y1={AY} x2={AX} y2={AY + 150} stroke="#15181d" strokeWidth="5" />
        <line className="cord" x1={AX} y1={AY} x2={AX} y2={AY + 150} stroke="#2c323c" strokeWidth="1.5" />

        <g id="fixture">
        {/* collar */}
        <path
          d={`M${AX - 15} ${AY + 150}h30l-3 30h-24z`}
          fill="url(#l-collar)"
        />
        <rect x={AX - 22} y={AY + 178} width="44" height="12" rx="3" fill="#8a7145" />

        {/* the bell. Wide mouth, slightly domed shoulder, like the reference. */}
        <path d={`M${AX - 58} ${AY + 214}C${AX - 58} ${AY + 188} ${AX - 34} ${AY + 182} ${AX} ${AY + 182}C${AX + 34} ${AY + 182} ${AX + 58} ${AY + 188} ${AX + 58} ${AY + 214}L${AX + 66} ${AY + 288}A66 20 0 0 1 ${AX - 66} ${AY + 288}Z`} fill="url(#l-glass)" />
        <path
          d={`M${AX - 58} ${AY + 214}C${AX - 58} ${AY + 188} ${AX - 34} ${AY + 182} ${AX} ${AY + 182}C${AX + 34} ${AY + 182} ${AX + 58} ${AY + 188} ${AX + 58} ${AY + 214}L${AX + 66} ${AY + 288}A66 20 0 0 1 ${AX - 66} ${AY + 288}Z`}
          fill="none"
          stroke="#ffc061"
          strokeWidth="2.5"
          opacity="0.75"
        />
        <ellipse cx={AX} cy={AY + 288} rx="66" ry="20" fill="none" stroke="#ffd28a" strokeWidth="2" opacity="0.6" />

        {/* the bulb, and the light it actually makes */}
        <circle cx={AX} cy={AY + 248} r="58" fill="#ffc061" opacity="0.6" filter="url(#l-soft)" />
        <path
          d={`M${AX - 15} ${AY + 210}h30v40a15 28 0 0 1 -30 0z`}
          fill="url(#l-bulb)"
        />
        <path
          d={`M${AX - 7} ${AY + 262}c0 -15 4 -17 4 -28s-6 -10 -6 -17M${AX + 7} ${AY + 262}c0 -15 -4 -17 -4 -28s6 -10 6 -17`}
          stroke="#fffaee"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* the spill on the floor under it */}
        <ellipse cx={AX} cy={AY + 306} rx="36" ry="10" fill="#ffe0a6" opacity="0.5" filter="url(#l-soft)" />
        </g>
      </g>

    </svg>
  )
}
