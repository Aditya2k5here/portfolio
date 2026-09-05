import Link from 'next/link'
import { Sheet, RailHead, RailRow } from './Sheet'
import { PartsIndex, type View } from './PartsIndex'
import { parts, totalRemovals } from '@/content/parts'
import { site, fieldNotes, budget, siteNotBuilt, contrast } from '@/content/site'

/**
 * Four screens, no more.
 * 1 Thesis · 2 Parts index · 3 One field note · 4 Colophon
 */
export function Home({ view }: { view: View }) {
  const note = fieldNotes[0]

  return (
    <>
      {/* ---------- 1. THESIS ---------- */}
      <section className="flex min-h-[86vh] flex-col justify-center py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
          {site.name} · {site.location}
        </p>

        <h1 className="t-display m-register mt-7 text-[clamp(46px,11vw,148px)]">
          {site.statement}
        </h1>

        <hr className="mt-8 h-px w-full border-0 bg-vermillion" />

        <p className="mt-5 font-mono text-[13px] uppercase tracking-[0.16em] text-graphite">
          {site.disciplines}
        </p>
      </section>

      {/* ---------- 2. PARTS INDEX — the most important screen ---------- */}
      <Sheet
        num="01"
        label="Work"
        wide
        id="work"
        margin={
          <>
            <RailHead>Record</RailHead>
            <RailRow k="parts" v={String(parts.length)} />
            <RailRow k="shipped" v="1" />
            <RailRow k="no implementation" v="1" />
            <RailRow k="removals" v={String(totalRemovals)} hot />
            <p className="mt-4 leading-[1.7]">
              Read it in either direction. As built is what was made. Not built is what came out
              during the making, and why.
            </p>
          </>
        }
      >
        <h2 className="t-section mb-4">The parts</h2>
        <p className="measure mb-8 text-[20px] leading-[1.5]">
          Four systems. What each one is, what it was measured at, and — on the other side of the
          switch — what was deliberately left out of it.
        </p>

        <PartsIndex parts={parts} initialView={view} />
      </Sheet>

      {/* ---------- 3. ONE FIELD NOTE ---------- */}
      <Sheet
        num="02"
        label="Field note"
        margin={
          <>
            <RailHead>Cited</RailHead>
            <RailRow k="from" v={note.cites} />
            <RailRow k="notes total" v={String(fieldNotes.length)} />
            <p className="mt-4 leading-[1.7]">
              A note without a citation does not ship.
            </p>
          </>
        }
      >
        <blockquote className="t-thesis text-[clamp(24px,3.6vw,40px)]">
          <p>{note.text}</p>
        </blockquote>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-graphite">
          {note.cites} ·{' '}
          <Link
            href="/notes/"
            className="inline-flex min-h-[44px] items-center text-graphite hover:text-ink lg:min-h-0"
          >
            Four more
          </Link>
        </p>
      </Sheet>

      {/* ---------- 4. COLOPHON ---------- */}
      <Sheet
        num="03"
        label="Colophon"
        wide
        margin={
          <>
            <RailHead>Stack</RailHead>
            <RailRow k="framework" v="Next.js 16" />
            <RailRow k="output" v="static" />
            <RailRow k="database" v="0" />
            <RailRow k="api routes" v="0" />
            <RailRow k="third-party" v="0" />
            <RailRow k="fonts" v="3, self-hosted" />
          </>
        }
      >
        <h2 className="t-section mb-4">Colophon</h2>
        <p className="measure mb-7">
          Next.js with the App Router, TypeScript and Tailwind, exported as static files. Content
          is typed TypeScript under <code className="font-mono text-[14px]">content/</code>; nothing
          about a project is written inside a component. A validator runs before every build and
          fails it on an empty limitations list, an over-long thesis, an all-null measurement set
          with no explanation, or a removal recorded without a reason.
        </p>

        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo">
              Budget vs actual
            </h3>
            <div className="scroll-x border-t border-ink">
              <table className="w-full min-w-[340px] border-collapse">
                <thead>
                  <tr>
                    {['Metric', 'Budget', 'Actual'].map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={`border-b border-rule py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo ${
                          i === 0 ? 'pr-4 text-left' : 'pl-4 text-right'
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {budget.map((b) => (
                    <tr key={b.metric}>
                      <th
                        scope="row"
                        className="border-b border-rule py-2 pr-4 text-left align-top font-mono text-[12px] font-normal leading-[1.5]"
                      >
                        {b.metric}
                        {b.note && (
                          <span className="block text-[10.5px] text-graphite">{b.note}</span>
                        )}
                      </th>
                      <td className="border-b border-rule py-2 pl-4 text-right align-top font-mono text-[12px] text-graphite">
                        {b.budget}
                      </td>
                      <td className="border-b border-rule py-2 pl-4 text-right align-top font-mono text-[12px]">
                        {b.actual ?? (
                          <span className="border border-graphite px-1.5 py-px text-[9.5px] uppercase tracking-[0.14em] text-graphite">
                            Not measured
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 font-mono text-[11px] leading-[1.6] text-graphite">
              Measured from the static export with <code className="font-mono">npm run measure</code>,
              gzipped, counting only the font subsets a browser rendering English actually fetches.
              Two budgets are missed and say so; one is still unmeasured and says that.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo">
              What this site did not build
            </h3>
            <ul className="flex list-none flex-col gap-2.5">
              {siteNotBuilt.map((r) => (
                <li key={r.rejected} className="flex gap-3 font-mono text-[12px] leading-[1.55]">
                  <span aria-hidden className="font-semibold text-vermillion">
                    −
                  </span>
                  <span>
                    {r.rejected}
                    <span className="block text-[11px] text-vermillion">{r.because}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[11px] leading-[1.6] text-graphite">
              The colophon is subject to the same rule as the parts.
            </p>

            <h3 className="mt-9 mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo">
              Measured contrast
            </h3>
            <div className="scroll-x border-t border-ink">
              <table className="w-full min-w-[300px] border-collapse">
                <caption className="sr-only">
                  Contrast ratio of each text colour against the page ground, per theme
                </caption>
                <thead>
                  <tr>
                    {['Pair', 'Light', 'Dark'].map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={`border-b border-rule py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo ${
                          i === 0 ? 'pr-4 text-left' : 'pl-4 text-right'
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contrast.map((c) => (
                    <tr key={c.pair}>
                      <th
                        scope="row"
                        className="border-b border-rule py-2 pr-4 text-left font-mono text-[12px] font-normal"
                      >
                        {c.pair}
                      </th>
                      <td className="border-b border-rule py-2 pl-4 text-right font-mono text-[12px]">
                        {c.light}
                      </td>
                      <td className="border-b border-rule py-2 pl-4 text-right font-mono text-[12px]">
                        {c.dark}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 font-mono text-[11px] leading-[1.6] text-graphite">
              Computed from the token values, not estimated. AA needs 4.5:1 for body text; the two
              tightest pairs were darkened until they cleared it.
            </p>
          </div>
        </div>
      </Sheet>
    </>
  )
}
