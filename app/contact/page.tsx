import type { Metadata } from 'next'
import { Sheet, RailHead, RailRow } from '@/components/Sheet'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email, GitHub, LinkedIn, resume. No form, no icons.',
}

const rows: { k: string; label: string; href: string | null }[] = [
  { k: 'Email', label: site.email, href: `mailto:${site.email}` },
  { k: 'GitHub', label: site.githubLabel, href: site.github },
  { k: 'LinkedIn', label: site.linkedinLabel, href: site.linkedin },
  { k: 'Resume', label: site.resumeLabel, href: site.resumeFile },
]

export default function Page() {
  return (
    <>
      <section className="pt-16 pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">04 / Contact</p>
      </section>

      <Sheet
        open
        wide
        margin={
          <>
            <RailHead>Response</RailHead>
            <RailRow k="form" v="none" />
            <RailRow k="icons" v="none" />
            <RailRow k="location" v="Bangalore" />
            <RailRow k="graduating" v="2027" />
          </>
        }
      >
        <h1
          className="m-register text-[clamp(30px,6.4vw,64px)] uppercase leading-[1.04] tracking-[0.01em]"
          style={{ fontStretch: '70%', fontWeight: 700 }}
        >
          {site.contactStatement}
        </h1>

        <hr className="mt-9 h-px w-full border-0 bg-vermillion" />

        <dl className="mt-9 flex flex-col">
          {rows.map((r) => (
            <div
              key={r.k}
              className="flex flex-col gap-x-8 gap-y-1 border-b border-rule py-4 sm:flex-row"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo sm:w-[120px] sm:shrink-0 sm:pt-1">
                {r.k}
              </dt>
              <dd className="m-0 font-mono text-[15px] leading-[1.5]">
                {r.href ? (
                  <a href={r.href} className="inline-flex min-h-[44px] items-center">
                    {r.label}
                  </a>
                ) : (
                  <span className="inline-flex min-h-[44px] items-center">
                    <span className="border border-graphite px-2 py-[3px] text-[10px] uppercase tracking-[0.16em] text-graphite">
                      Not uploaded
                    </span>
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-9 max-w-[52ch] font-mono text-[11px] leading-[1.7] text-graphite">
          The resume will be a single dated PDF. It is not uploaded yet, so this page says so
          rather than linking to one that is not there. Either way, the record you are on is the
          more current document.
        </p>
      </Sheet>
    </>
  )
}
