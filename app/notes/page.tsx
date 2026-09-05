import type { Metadata } from 'next'
import Link from 'next/link'
import { Sheet, RailHead, RailRow } from '@/components/Sheet'
import { fieldNotes } from '@/content/site'
import { parts } from '@/content/parts'

export const metadata: Metadata = {
  title: 'Field notes',
  description: 'Five things the work taught me. Each one cites the part it came from.',
}

export default function Page() {
  return (
    <>
      <section className="pt-16 pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">02 / Field notes</p>
        <h1 className="t-display m-register mt-6 text-[clamp(38px,8vw,104px)]">Field notes</h1>
        <hr className="mt-7 h-px w-full border-0 bg-vermillion" />
      </section>

      <Sheet
        open
        wide
        margin={
          <>
            <RailHead>Rule</RailHead>
            <RailRow k="notes" v={String(fieldNotes.length)} />
            <RailRow k="cap" v="6" />
            <RailRow k="uncited" v="0" hot />
            <p className="mt-4 leading-[1.7]">
              A note without a citation does not ship. The validator refuses a note whose citation
              is not a part on this record.
            </p>
          </>
        }
      >
        <ol className="list-none">
          {fieldNotes.map((n, i) => {
            const part = parts.find((p) => p.id === n.cites)
            return (
              <li key={n.text} className="border-t border-rule py-9 first:border-t-0 first:pt-0">
                <div className="grid gap-x-9 gap-y-4 lg:grid-cols-[52px_minmax(0,1fr)]">
                  <span className="font-mono text-[12px] font-semibold tracking-[0.08em] text-vermillion">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="t-thesis text-[clamp(21px,3.1vw,31px)]">{n.text}</p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-graphite">
                      {part ? (
                        <Link
                          href={`/work/${part.slug}/`}
                          className="inline-flex min-h-[44px] items-center text-graphite hover:text-ink lg:min-h-0"
                        >
                          {n.cites} · {part.name}
                        </Link>
                      ) : (
                        n.cites
                      )}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </Sheet>
    </>
  )
}
