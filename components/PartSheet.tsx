import Link from 'next/link'
import Image from 'next/image'
import { Sheet, RailHead, RailRow } from './Sheet'
import { StatusStamp, EvidenceChips } from './Stamp'
import { Measurements } from './Measurements'
import type { Part } from '@/content/parts/types'
import { dc03Classes, dc03MetricsNote } from '@/content/parts/dc-03'
import { truthTicketFields, th04Copy, th04Disclaimer } from '@/content/parts/th-04'

export function PartSheet({ part }: { part: Part }) {
  const countOn = part.measurements.find((m) => m.from)?.label

  /**
   * Sheets are numbered by what this part actually has. A part with no plates and
   * no case study runs 01–06, not 01–05 then 08 — a gap in the numbering would read
   * as a missing section rather than an absent one.
   */
  let n = 0
  const num = () => String(++n).padStart(2, '0')

  return (
    <>
      {/* ---------- HEAD ---------- */}
      <section className="pt-16 pb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center text-graphite hover:text-ink lg:min-h-0"
          >
            Work
          </Link>{' '}
          / {part.id}
        </p>

        <h1 className="t-display m-register mt-6 text-[clamp(38px,7.5vw,92px)]">{part.name}</h1>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <StatusStamp status={part.status} animate />
          <EvidenceChips evidence={part.evidence} />
        </div>

        <hr className="mt-7 h-px w-full border-0 bg-vermillion" />

        <p className="t-thesis measure mt-7 text-[clamp(22px,3vw,32px)]">{part.thesis}</p>
      </section>

      {/* ---------- LIMITATIONS FIRST ---------- */}
      <Sheet
        num={num()}
        label="Limits"
        open
        margin={
          <>
            <RailHead>Sheet</RailHead>
            <RailRow k="part" v={part.id} />
            <RailRow k="status" v={part.status} />
            <RailRow k="stack items" v={String(part.stack.length)} />
            <RailRow k="removals" v={String(part.notBuilt.length)} hot />
            <RailRow k="limitations" v={String(part.limitations.length)} />
          </>
        }
      >
        <h2 className="t-section mb-4">What it does not do</h2>
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-graphite">
          Printed before the result, not after it
        </p>
        <ul className="flex list-none flex-col gap-3">
          {part.limitations.map((l) => (
            <li key={l} className="relative pl-6 leading-[1.6]">
              <span
                aria-hidden
                className="absolute left-0 top-[0.72em] h-px w-[11px] bg-vermillion"
              />
              {l}
            </li>
          ))}
        </ul>
      </Sheet>

      {/* ---------- PROBLEM / RESULT ---------- */}
      <Sheet
        num={num()}
        label="Brief"
        margin={
          <>
            <RailHead>Stack</RailHead>
            {part.stack.length === 0 ? (
              <p className="leading-[1.7] text-graphite">
                Empty. Nothing was built, so there is nothing to list.
              </p>
            ) : (
              part.stack.map((s) => <RailRow key={s} k={s} v="" />)
            )}
          </>
        }
      >
        <h2 className="t-section mb-4">The problem</h2>

        {part.id === 'TH-04' ? (
          <>
            {th04Copy.map((p) => (
              <p key={p.slice(0, 40)} className="mb-4 leading-[1.65]">
                {p}
              </p>
            ))}
            <p className="mt-6 border-l-2 border-vermillion py-1 pl-5 font-semibold leading-[1.6]">
              {th04Disclaimer}
            </p>
          </>
        ) : (
          <>
            <p className="leading-[1.65]">{part.problem}</p>
            {part.result && (
              <>
                <h3 className="t-sub mt-9 mb-3">Result</h3>
                <p className="leading-[1.65]">{part.result}</p>
              </>
            )}
          </>
        )}
      </Sheet>

      {/* ---------- MEASUREMENTS ---------- */}
      <Sheet
        num={num()}
        label="Measured"
        wide
        margin={
          <>
            <RailHead>Rail rule</RailHead>
            <p className="leading-[1.7]">
              Every row shows a real measurement or an honest stamp. There are no blanks.
            </p>
            <RailRow
              k="stamped"
              v={String(part.measurements.filter((m) => m.value === null).length)}
              hot
            />
          </>
        }
      >
        <h2 className="t-section mb-4">Measurements</h2>
        <Measurements rows={part.measurements} countOn={countOn} />

        {part.id === 'DC-03' && (
          <>
            <h3 className="t-sub mt-10 mb-4">Class distribution</h3>
            <ClassBars />
            <p className="mt-6 border-l-2 border-vermillion py-1 pl-5 leading-[1.6]">
              {dc03MetricsNote}
            </p>
          </>
        )}

        {part.id === 'TH-04' && (
          <>
            <h3 className="t-sub mt-10 mb-4">Truth Ticket — specified fields</h3>
            <ol className="grid list-none grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {truthTicketFields.map((f, i) => (
                <li key={f} className="flex gap-3 font-mono text-[12.5px] leading-[1.6]">
                  <span className="text-indigo">{String(i + 1).padStart(2, '0')}</span>
                  <span>{f}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-mono text-[11px] leading-[1.6] text-graphite">
              Twelve fields in one tamper-evident package. None of this has been implemented.
            </p>
          </>
        )}
      </Sheet>

      {/* ---------- DECISIONS ---------- */}
      <Sheet
        num={num()}
        label="Decided"
        margin={
          <>
            <RailHead>Count</RailHead>
            <RailRow k="decisions" v={String(part.decisions.length)} />
            <p className="mt-4 leading-[1.7]">
              Each one carries its reason. The build fails without it.
            </p>
          </>
        }
      >
        <h2 className="t-section mb-6">Decisions</h2>
        <dl className="flex flex-col gap-6">
          {part.decisions.map((d) => (
            <div key={d.choice} className="border-t border-rule pt-3.5">
              <dt className="font-mono text-[13px] font-semibold leading-[1.5]">{d.choice}</dt>
              <dd className="mt-1.5 leading-[1.6] text-graphite">{d.because}</dd>
            </div>
          ))}
        </dl>
      </Sheet>

      {/* ---------- NOT BUILT ---------- */}
      <Sheet
        num={num()}
        label="Not built"
        margin={
          <>
            <RailHead>Removed</RailHead>
            <RailRow k="entries" v={String(part.notBuilt.length)} hot />
            <p className="mt-4 leading-[1.7]">
              A removal may only appear here if its reason is recorded. No reason, no line.
            </p>
          </>
        }
      >
        <h2 className="t-section mb-6">What was not built</h2>
        <ul className="flex list-none flex-col gap-5">
          {part.notBuilt.map((r) => (
            <li key={r.rejected} className="border-t border-rule pt-3.5">
              <div className="flex gap-3">
                <span aria-hidden className="font-mono font-semibold text-vermillion">
                  −
                </span>
                <div>
                  <p className="font-mono text-[13px] leading-[1.5] line-through decoration-vermillion decoration-1">
                    {r.rejected}
                  </p>
                  <p className="mt-1.5 leading-[1.6] text-vermillion">{r.because}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Sheet>

      {/* ---------- PLATES ---------- */}
      {part.plates.length > 0 && (
        <Sheet
          num={num()}
          label="Plates"
          wide
          margin={
            <>
              <RailHead>Plates</RailHead>
              <RailRow k="count" v={String(part.plates.length)} />
              <RailRow k="treatment" v="duotone" />
            </>
          }
        >
          <h2 className="t-section mb-6">Plates</h2>
          <div className="grid gap-7 sm:grid-cols-2">
            {part.plates.map((pl) => (
              <figure key={pl.src} className="m-0">
                <div className="border border-rule">
                  <Image
                    src={pl.src}
                    alt={pl.alt}
                    width={960}
                    height={840}
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-2.5 font-mono text-[11px] leading-[1.6] text-graphite">
                  {pl.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Sheet>
      )}

      {/* ---------- CASE STUDY ---------- */}
      {part.caseStudy && (
        <Sheet
          num={num()}
          label="Case study"
          margin={
            <>
              <RailHead>Long form</RailHead>
              <RailRow k="sections" v={String(part.caseStudy.sections.length)} />
              <p className="mt-4 leading-[1.7]">
                The only deep case study on this record. The others are gated on the underlying work
                existing, not on a date.
              </p>
            </>
          }
        >
          <h2 className="t-section mb-4">Case study</h2>
          <p className="mb-9 text-[20px] leading-[1.5]">{part.caseStudy.standfirst}</p>

          {part.caseStudy.sections.map((s) => (
            <section key={s.heading} className="mb-11">
              <h3 className="t-sub mb-4">{s.heading}</h3>
              {s.body.map((b) => (
                <p key={b.slice(0, 40)} className="mb-4 leading-[1.68]">
                  {b}
                </p>
              ))}
              {s.aside && (
                <p className="t-thesis mt-6 border-l-2 border-vermillion py-1 pl-5 text-[21px]">
                  {s.aside}
                </p>
              )}
            </section>
          ))}
        </Sheet>
      )}

      {/* ---------- LINKS ---------- */}
      <Sheet num={num()} label="Evidence" margin={<RailHead>End of sheet</RailHead>}>
        <h2 className="t-section mb-5">Evidence</h2>
        {part.links.length > 0 ? (
          <ul className="flex list-none flex-col gap-2.5">
            {part.links.map((l) => (
              <li key={l.href} className="font-mono text-[13px]">
                <a href={l.href} className="inline-flex min-h-[44px] items-center">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="leading-[1.6] text-graphite">
            {part.status === 'design'
              ? 'None. There is no implementation, so there is nothing to link to.'
              : 'Not public yet. No link is printed here rather than one that would 404.'}
          </p>
        )}

        <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.16em]">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center text-graphite hover:text-ink lg:min-h-0"
          >
            ← Back to the index
          </Link>
        </p>
      </Sheet>
    </>
  )
}

/** Class distribution as a horizontal bar table. Indigo, because it is measurement. */
function ClassBars() {
  const max = Math.max(...dc03Classes.map((c) => c.count))
  return (
    <div className="scroll-x border-t border-ink">
      <table className="w-full min-w-[360px] border-collapse">
        <caption className="sr-only">
          Training image count by class, largest to smallest
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="border-b border-rule py-2 pr-4 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo"
            >
              Class
            </th>
            <th
              scope="col"
              className="w-full border-b border-rule py-2 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo"
            >
              Images
            </th>
            <th
              scope="col"
              className="border-b border-rule py-2 pl-4 text-right font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo"
            >
              n
            </th>
          </tr>
        </thead>
        <tbody>
          {dc03Classes.map((c) => (
            <tr key={c.label}>
              <th
                scope="row"
                className="border-b border-rule py-2 pr-4 text-left font-mono text-[12.5px] font-normal"
              >
                {c.label}
              </th>
              <td className="border-b border-rule py-2 align-middle">
                <span
                  className="block h-2.5 bg-indigo"
                  style={{ width: `${(c.count / max) * 100}%` }}
                />
              </td>
              <td className="border-b border-rule py-2 pl-4 text-right font-mono text-[12.5px]">
                {c.count.toLocaleString('en-IN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
