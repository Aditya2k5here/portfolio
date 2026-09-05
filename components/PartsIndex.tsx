'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Part } from '@/content/parts/types'
import { StatusStamp, EvidenceChips } from './Stamp'

export type View = 'as-built' | 'not-built'

const STAGGER = 42
const STRIKE = 210

/**
 * The parts index, readable in two directions.
 *
 * AS BUILT is the default and the root URL. NOT BUILT is /not-built — shareable,
 * never the landing. Both are real static routes, so this works with no JavaScript;
 * the control below upgrades them to an in-place toggle when JS is available.
 */
export function PartsIndex({ parts, initialView }: { parts: Part[]; initialView: View }) {
  const [view, setView] = useState<View>(initialView)
  const [striking, setStriking] = useState(false)
  const [struck, setStruck] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const removals = parts.reduce((n, p) => n + p.notBuilt.length, 0)
  const shipped = parts.filter((p) => p.status === 'shipped').length

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const go = useCallback(
    (next: View) => {
      if (next === view || striking) return

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const url = next === 'not-built' ? '/not-built/' : '/'
      window.history.replaceState(null, '', url)

      if (reduce) {
        setView(next)
        return
      }

      // Redline: strike the visible stack line by line, then typeset the other list in.
      const rows = parts.reduce(
        (n, p) => n + (view === 'as-built' ? p.stack.length || 1 : p.notBuilt.length),
        0,
      )
      setStriking(true)
      setStruck(0)

      for (let i = 1; i <= rows; i++) {
        timers.current.push(setTimeout(() => setStruck(i), i * STAGGER))
      }
      timers.current.push(
        setTimeout(
          () => {
            setView(next)
            setStriking(false)
            setStruck(0)
          },
          rows * STAGGER + STRIKE,
        ),
      )
    },
    [parts, view, striking],
  )

  // Running index so the stagger runs across the whole index, not per part.
  let cursor = 0

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink pb-3">
        <ViewSwitch view={view} onChange={go} busy={striking} />
        <p aria-live="polite" className="font-mono text-[11px] tracking-[0.08em] text-indigo">
          {view === 'not-built' ? (
            <>
              <b className="font-semibold text-vermillion">{removals}</b> removals recorded ·{' '}
              {parts.length} parts
            </>
          ) : (
            <>
              {parts.length} parts · <b className="font-semibold text-vermillion">{shipped}</b>{' '}
              shipped · 1 with no implementation
            </>
          )}
        </p>
      </div>

      <ol className="list-none">
        {parts.map((part) => {
          const items =
            view === 'as-built'
              ? part.stack.map((s) => ({ head: s, why: null as string | null }))
              : part.notBuilt.map((r) => ({ head: r.rejected, why: r.because }))

          const start = cursor
          cursor += items.length || 1

          return (
            <PartRow
              key={part.id}
              part={part}
              view={view}
              items={items}
              striking={striking}
              struck={struck}
              start={start}
            />
          )
        })}
      </ol>
    </div>
  )
}

function ViewSwitch({
  view,
  onChange,
  busy,
}: {
  view: View
  onChange: (v: View) => void
  busy: boolean
}) {
  return (
    <div
      role="group"
      aria-label="Record view"
      className="flex border border-ink font-mono text-[11px] uppercase tracking-[0.16em]"
    >
      {(
        [
          ['as-built', 'As built'],
          ['not-built', 'Not built'],
        ] as const
      ).map(([v, label]) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          disabled={busy}
          onClick={() => onChange(v)}
          className={`min-h-[44px] cursor-pointer px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
            view === v ? 'bg-ink text-paper' : 'bg-transparent text-graphite hover:text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function PartRow({
  part,
  view,
  items,
  striking,
  struck,
  start,
}: {
  part: Part
  view: View
  items: { head: string; why: string | null }[]
  striking: boolean
  struck: number
  start: number
}) {
  const empty = items.length === 0

  return (
    <li className="border-b border-rule py-7">
      <div className="grid gap-x-9 gap-y-4 lg:grid-cols-[104px_minmax(0,1fr)_190px]">
        <div className="font-mono text-[12px] font-semibold tracking-[0.1em] text-indigo">
          {part.id}
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 className="t-sub">
              <Link
                href={`/work/${part.slug}/`}
                className="inline-flex min-h-[44px] items-center no-underline hover:underline lg:min-h-0"
              >
                {part.name}
              </Link>
            </h3>
            <StatusStamp status={part.status} />
            {part.status === 'design' && (
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite">
                No implementation
              </span>
            )}
          </div>

          <ul className="flex list-none flex-col gap-1.5">
            {empty && (
              <li className="font-mono text-[12.5px] italic text-graphite">
                Nothing was built. This part has no stack.
              </li>
            )}
            {items.map((it, i) => {
              const isStruck = striking && struck > start + i
              return (
                <li
                  key={it.head}
                  className={`flex flex-col gap-x-3 gap-y-0.5 font-mono text-[12.5px] leading-[1.5] sm:flex-row sm:items-baseline ${
                    isStruck ? 'text-graphite' : ''
                  }`}
                >
                  <span
                    aria-hidden
                    className={`font-semibold ${
                      view === 'not-built' ? 'text-vermillion' : 'text-indigo'
                    }`}
                  >
                    {view === 'not-built' ? '−' : '+'}
                  </span>
                  <span className="relative inline-block">
                    {it.head}
                    <span
                      aria-hidden
                      className="absolute left-0 top-[53%] h-px bg-vermillion transition-[width] duration-[210ms] ease-linear"
                      style={{ width: isStruck ? '100%' : 0 }}
                    />
                  </span>
                  {it.why && (
                    <span className="text-[11px] text-vermillion sm:ml-1">{it.why}</span>
                  )}
                </li>
              )
            })}
          </ul>

          {view === 'not-built' && part.status === 'design' && (
            <p className="mt-3 font-mono text-[11px] leading-[1.6] text-vermillion">
              The emptiest part of this record in as-built, and the fullest here. That inversion is
              the argument.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] leading-[1.6] text-graphite">{part.indexFact}</p>
          <EvidenceChips evidence={part.evidence} />
          <Link
            href={`/work/${part.slug}/`}
            className="inline-flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-[0.16em] text-graphite hover:text-ink lg:min-h-0"
          >
            Open sheet →
          </Link>
        </div>
      </div>
    </li>
  )
}
