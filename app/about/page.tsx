import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Sheet, RailHead, RailRow } from '@/components/Sheet'
import { about, site } from '@/content/site'
import { totalRemovals, parts } from '@/content/parts'

export const metadata: Metadata = {
  title: 'About',
  description:
    'B.E. Information Science Engineering, Atria Institute of Technology, graduating 2027. Backend and real-time systems.',
}

export default function Page() {
  return (
    <>
      <section className="pt-16 pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">03 / About</p>
        <h1 className="t-display m-register mt-6 text-[clamp(38px,8vw,104px)]">{site.name}</h1>
        <hr className="mt-7 h-px w-full border-0 bg-vermillion" />
      </section>

      <Sheet
        open
        margin={
          <figure className="m-0 max-w-[290px]">
            <div className="border border-rule">
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                width={580}
                height={580}
                className="block h-auto w-full"
                priority
              />
            </div>
            <figcaption className="mt-2.5 font-mono text-[11px] leading-[1.6] text-graphite">
              {about.portrait.caption}
            </figcaption>
          </figure>
        }
      >
        <p className="t-thesis measure text-[clamp(22px,3vw,32px)]">{about.opening}</p>

        <div className="measure mt-10 flex flex-col gap-5">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="leading-[1.68]">
              {p}
            </p>
          ))}
        </div>
      </Sheet>

      <Sheet
        num="01"
        label="Research"
        margin={
          <>
            <RailHead>Published</RailHead>
            <RailRow k="type" v="paper" />
            <p className="mt-4 leading-[1.7]">
              It does not belong to the spine of this record, so it is not forced into one.
            </p>
          </>
        }
      >
        <h2 className="t-section mb-4">Research</h2>
        <p className="font-mono text-[13px] leading-[1.55]">{about.research.title}</p>
        <p className="mt-2 text-graphite">{about.research.note}</p>
      </Sheet>

      <Sheet
        num="02"
        label="Method"
        margin={
          <>
            <RailHead>This record</RailHead>
            <RailRow k="parts" v={String(parts.length)} />
            <RailRow k="removals" v={String(totalRemovals)} hot />
            <RailRow k="invented metrics" v="0" />
          </>
        }
      >
        <h2 className="t-section mb-4">How this record works</h2>
        <p className="measure leading-[1.68]">
          Every part on this site is presented the same way: what it does not do, then the problem,
          then the measurements, then the decisions, then what was deliberately not built. Where a
          measurement does not exist, the page prints a stamp saying so rather than leaving a gap or
          reaching for a number that would sound better.
        </p>
        <p className="measure mt-4 leading-[1.68]">
          That is not modesty. Four of the five things I would most want to tell you about these
          systems are decisions to leave something out, and there is no honest way to show those
          except to show them.{' '}
          <Link href="/not-built/">Read the record the other way</Link> and the four parts invert:
          the one with no implementation becomes the fullest sheet on the site.
        </p>
      </Sheet>
    </>
  )
}
