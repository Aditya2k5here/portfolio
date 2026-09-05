'use client'

import { useEffect, useRef, useState } from 'react'
import type { Measurement } from '@/content/parts/types'
import { AbsentStamp } from './Stamp'

/**
 * Measurements table. A null value renders a stamp, never a blank.
 * A `from` enables the count animation — max one per screen, once, never looping.
 */
export function Measurements({ rows, countOn }: { rows: Measurement[]; countOn?: string }) {
  return (
    <div className="scroll-x my-6 border-t border-ink">
      <table className="w-full min-w-[420px] border-collapse">
        <caption className="sr-only">Measurements</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="border-b border-rule py-2.5 pr-4 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo"
            >
              Measurement
            </th>
            <th
              scope="col"
              className="border-b border-rule py-2.5 pl-4 text-right font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.label}>
              <th
                scope="row"
                className="border-b border-rule py-2.5 pr-4 text-left align-top font-normal"
              >
                <span className="font-mono text-[12.5px] leading-[1.55]">{m.label}</span>
                {m.note && (
                  <span className="block font-mono text-[10.5px] text-graphite">{m.note}</span>
                )}
              </th>
              <td className="border-b border-rule py-2.5 pl-4 text-right align-top">
                {m.value === null ? (
                  <AbsentStamp word={m.absent ?? 'Not measured'} />
                ) : m.from && m.label === countOn ? (
                  <CountFromTo from={m.from} to={m.value} />
                ) : (
                  <span className="font-mono text-[13px]">
                    {m.from && <span className="mr-2 text-graphite line-through">{m.from}</span>}
                    {m.value}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Count: rolls old → new once, 600ms, on first view. Never loops. */
function CountFromTo({ from, to }: { from: string; to: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(from)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || done.current) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(to)
      done.current = true
      return
    }

    const a = parseFloat(from)
    const b = parseFloat(to)
    const unit = to.replace(/[\d.,\s]/g, '')
    if (Number.isNaN(a) || Number.isNaN(b)) {
      setShown(to)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true
        io.disconnect()

        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 600)
          const eased = 1 - Math.pow(1 - p, 3)
          setShown(`${Math.round(a + (b - a) * eased)}${unit ? ` ${unit}` : ''}`)
          if (p < 1) requestAnimationFrame(tick)
          else setShown(to)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [from, to])

  return (
    <span ref={ref} className="font-mono text-[13px]">
      <span className="mr-2 text-graphite line-through">{from}</span>
      {shown}
    </span>
  )
}
