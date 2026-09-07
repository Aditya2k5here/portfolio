import type { Bar, EnvRow } from '@/content/charts'

/**
 * Charts.
 *
 * These are the only place saturated colour appears on the site. Everything
 * else is grey, so when a bar goes red it means something rather than
 * decorating something.
 *
 * All SVG, no library. Each one is small enough to hand-draw and hand-drawing
 * it means the axis, the baseline and the labels can carry the argument instead
 * of being generic chart furniture.
 */

const TONE: Record<NonNullable<Bar['tone']> | 'default', string> = {
  sig: 'var(--sig)',
  good: 'var(--c-2)',
  bad: 'var(--c-4)',
  mute: 'var(--edge-3)',
  default: 'var(--grey-3)',
}

function Frame({
  title,
  sub,
  source,
  children,
}: {
  title: string
  sub: string
  source: string
  children: React.ReactNode
}) {
  return (
    <figure className="panel m-0 p-[clamp(18px,2.2vw,28px)]">
      <figcaption className="mb-6">
        <p className="t-h3">{title}</p>
        <p className="t-small mt-1.5 max-w-[56ch]">{sub}</p>
      </figcaption>
      {children}
      <p className="tag mt-5">{source}</p>
    </figure>
  )
}

/* ------------------------------------------------------------------------- */

/**
 * Log-scale horizontal bars.
 *
 * The spread here is 1.38 to 132.73. On a linear axis the winner is a sliver
 * one pixel wide, which hides the whole point, so the axis is log10 and it is
 * labelled as such rather than quietly rescaled.
 */
export function LogBars({
  data,
  axis,
  title,
  sub,
  source,
}: {
  data: Bar[]
  axis: string
  title: string
  sub: string
  source: string
}) {
  const max = Math.max(...data.map((d) => d.value))
  const scale = (v: number) => (Math.log10(v) / Math.log10(max)) * 100
  const ticks = [1, 10, 100]

  return (
    <Frame title={title} sub={sub} source={source}>
      <div className="relative">
        {/* gridlines */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute top-0 bottom-6 border-l border-edge"
              style={{ left: `${scale(t)}%` }}
            />
          ))}
        </div>

        <ul className="seq relative flex flex-col gap-3.5">
          {data.map((d, i) => (
            <li key={d.label} style={{ '--i': i } as React.CSSProperties}>
              <div className="mb-1.5 flex items-baseline justify-between gap-4">
                <span className="t-small text-grey-1">{d.label}</span>
                <span
                  className="m text-[14px]"
                  style={{ color: TONE[d.tone ?? 'default'] === 'var(--grey-3)' ? 'var(--grey-1)' : TONE[d.tone ?? 'default'] }}
                >
                  {d.value.toLocaleString('en-GB', { maximumFractionDigits: 2 })}×
                </span>
              </div>
              <div className="h-[10px] w-full bg-[var(--ink)]">
                <span
                  className="block h-full"
                  style={{
                    width: `${Math.max(scale(d.value), 1.5)}%`,
                    background: TONE[d.tone ?? 'default'],
                  }}
                />
              </div>
              {d.note && <p className="tag mt-1.5 normal-case tracking-normal">{d.note}</p>}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between">
          {ticks.map((t) => (
            <span key={t} className="tag">
              {t}×
            </span>
          ))}
        </div>
        <p className="tag mt-1 text-right">{axis} · log scale</p>
      </div>
    </Frame>
  )
}

/* ------------------------------------------------------------------------- */

/**
 * Bars against a baseline. The baseline is drawn as a hard line, so a bar
 * crossing it is visibly a loss rather than just a longer bar.
 */
export function BaselineBars({
  data,
  baseline,
  baselineLabel = 'stock',
  axis,
  title,
  sub,
  source,
}: {
  data: Bar[]
  baseline: number
  /** What the dashed line represents. Naming it is the whole point of drawing it. */
  baselineLabel?: string
  axis: string
  title: string
  sub: string
  source: string
}) {
  const max = Math.max(...data.map((d) => d.value), baseline * 1.25)
  const pct = (v: number) => (v / max) * 100

  return (
    <Frame title={title} sub={sub} source={source}>
      <div className="relative">
        <span
          aria-hidden
          className="absolute top-0 bottom-7 z-10 border-l border-dashed border-[var(--grey-2)]"
          style={{ left: `${pct(baseline)}%` }}
        />
        <span
          className="tag absolute -top-1 z-10 -translate-x-1/2"
          style={{ left: `${pct(baseline)}%` }}
        >
          {baselineLabel}
        </span>

        <ul className="seq mt-6 flex flex-col gap-3.5">
          {data.map((d, i) => (
            <li key={d.label} style={{ '--i': i } as React.CSSProperties}>
              <div className="mb-1.5 flex items-baseline justify-between gap-4">
                <span className="t-small text-grey-1">{d.label}</span>
                <span
                  className="m text-[14px]"
                  style={{ color: d.tone ? TONE[d.tone] : 'var(--grey-1)' }}
                >
                  {d.value}%
                </span>
              </div>
              <div className="h-[10px] w-full bg-[var(--ink)]">
                <span
                  className="block h-full"
                  style={{
                    width: `${Math.max(pct(d.value), 0.6)}%`,
                    background: TONE[d.tone ?? 'default'],
                  }}
                />
              </div>
              {d.note && <p className="tag mt-1.5 normal-case tracking-normal">{d.note}</p>}
            </li>
          ))}
        </ul>
        <p className="tag mt-4 text-right">{axis}</p>
      </div>
    </Frame>
  )
}

/* ------------------------------------------------------------------------- */

/** Proportion of a fixed total. Reads as a gauge rather than a bar chart. */
export function ServedBars({
  data,
  total,
  axis,
  title,
  sub,
  source,
}: {
  data: Bar[]
  total: number
  axis: string
  title: string
  sub: string
  source: string
}) {
  return (
    <Frame title={title} sub={sub} source={source}>
      <ul className="seq flex flex-col gap-4">
        {data.map((d, i) => (
          <li key={d.label} style={{ '--i': i } as React.CSSProperties}>
            <div className="mb-1.5 flex items-baseline justify-between gap-4">
              <span className="t-small text-grey-1">{d.label}</span>
              <span className="m text-[14px]" style={{ color: d.tone ? TONE[d.tone] : 'var(--grey-1)' }}>
                {d.value} / {total}
              </span>
            </div>
            {/* 735 ticks would be unreadable; 49 blocks at 15 each is legible
                and still shows 3/735 as almost nothing. */}
            <div className="flex gap-[2px]">
              {Array.from({ length: 49 }, (_, k) => {
                const filled = (k + 1) * (total / 49) <= d.value
                const partial = !filled && k * (total / 49) < d.value
                return (
                  <span
                    key={k}
                    className="h-[18px] flex-1"
                    style={{
                      background: filled || partial ? TONE[d.tone ?? 'default'] : 'var(--ink)',
                      opacity: partial ? 0.45 : 1,
                    }}
                  />
                )
              })}
            </div>
            {d.note && <p className="tag mt-1.5 normal-case tracking-normal">{d.note}</p>}
          </li>
        ))}
      </ul>
      <p className="tag mt-4 text-right">{axis}</p>
    </Frame>
  )
}

/* ------------------------------------------------------------------------- */

/**
 * Stacked outcome columns per radius, with the relaxation-only result drawn as
 * a line behind. The area between them is what the complete search buys.
 */
export function EnvelopeChart({
  rows,
  title,
  sub,
  source,
}: {
  rows: EnvRow[]
  title: string
  sub: string
  source: string
}) {
  const W = 720
  const H = 220
  const pad = { l: 30, r: 8, t: 10, b: 26 }
  const iw = W - pad.l - pad.r
  const ih = H - pad.t - pad.b
  const colW = iw / rows.length

  const y = (v: number) => pad.t + ih - (v / 60) * ih

  const line = rows
    .map((r, i) => `${pad.l + colW * i + colW / 2},${y(r.deepPoly)}`)
    .join(' ')

  return (
    <Frame title={title} sub={sub} source={source}>
      <div className="scroll-x">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[560px]" role="img"
             aria-label="Verified, falsified and unknown counts across nine perturbation radii. Unknown is zero at every radius.">
          {[0, 20, 40, 60].map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--edge)" />
              <text x={0} y={y(t) + 4} className="m" fontSize="9" fill="var(--grey-3)">
                {t}
              </text>
            </g>
          ))}

          {rows.map((r, i) => {
            const x = pad.l + colW * i + colW * 0.18
            const w = colW * 0.64
            const hv = (r.verified / 60) * ih
            const hf = (r.falsified / 60) * ih
            return (
              <g key={r.eps}>
                <rect x={x} y={pad.t + ih - hv} width={w} height={hv} fill="var(--c-2)" opacity="0.9" />
                <rect x={x} y={pad.t + ih - hv - hf} width={w} height={hf} fill="var(--edge-2)" />
                <text
                  x={x + w / 2}
                  y={H - 8}
                  textAnchor="middle"
                  className="m"
                  fontSize="9"
                  fill="var(--grey-3)"
                >
                  {r.eps}
                </text>
              </g>
            )
          })}

          <polyline points={line} fill="none" stroke="var(--c-1)" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
        <Key c="var(--c-2)" t="Verified by complete search" />
        <Key c="var(--edge-2)" t="Falsified, with a witness" />
        <Key c="var(--c-1)" t="DeepPoly relaxation alone" dashed />
        <li className="tag normal-case tracking-normal text-[var(--c-2)]">Unknown: 0 at every radius</li>
      </ul>
    </Frame>
  )
}

function Key({ c, t, dashed }: { c: string; t: string; dashed?: boolean }) {
  return (
    <li className="tag flex items-center gap-2 normal-case tracking-normal">
      <span
        aria-hidden
        className="inline-block h-[3px] w-4"
        style={{
          background: dashed ? 'transparent' : c,
          borderTop: dashed ? `2px dashed ${c}` : undefined,
        }}
      />
      {t}
    </li>
  )
}
