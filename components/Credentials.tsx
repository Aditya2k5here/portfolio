'use client'

import { useState } from 'react'
import { publication, certifications, achievements } from '@/content/credentials'
import { languages } from '@/content/profile'
import { Stage } from './Stage'

/**
 * The things somebody else signed off on.
 *
 * The paper leads, because it is the only item on this page that went through
 * review, and it now opens onto the actual PDF and the actual publication
 * certificate rather than promising them on request. The DOI is printed in
 * full: it is the one link here that will still resolve in ten years.
 *
 * "Competitive & organisational" was a category name, not a heading. What is
 * actually in that list is hackathons he won and a chapter he ran, so it says
 * that instead.
 */
export function Credentials() {
  const [paper, setPaper] = useState(false)
  const [cert, setCert] = useState<string | null>(null)

  return (
    <Stage id="credentials" n="04" title="Credentials">
      {/* ------------------------------------------------------- the paper -- */}
      <article className="cut border-t border-[var(--edge)] pt-[clamp(24px,3vw,40px)]">
        <div className="grid gap-x-[clamp(28px,4vw,64px)] gap-y-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip chip--sig">Peer reviewed</span>
              <span className="chip">{publication.position}</span>
              <span className="chip">{publication.date}</span>
            </div>

            <h3 className="t-h2 mt-5 max-w-[22ch] text-[clamp(23px,3.1vw,38px)]">
              {publication.title}
            </h3>

            <p className="m mt-4 text-[12.5px] leading-relaxed text-[var(--grey-1)]">
              {publication.venue}
              <br />
              <span className="text-[var(--grey-3)]">
                {publication.volume} · {publication.issn}
              </span>
            </p>
          </div>

          <div className="min-w-0">
            <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--grey-1)]">
              {publication.note}
            </p>

            <button
              type="button"
              onClick={() => setPaper(!paper)}
              aria-expanded={paper}
              aria-controls="paper-record"
              className="discl mt-6 inline-flex w-auto items-center gap-3 text-[14.5px] font-medium transition-colors hover:text-[var(--sig-lit)]"
            >
              <span className="sign" data-on={paper ? '1' : '0'} aria-hidden />
              {paper ? 'Close' : 'Open the paper'}
            </button>

            <div className="drawer" data-on={paper ? '1' : '0'} id="paper-record">
              <div>
                <div className="pt-5" inert={!paper}>
                  <p className="max-w-[50ch] text-[15px] leading-relaxed text-[var(--grey-1)]">
                    {publication.body}
                  </p>

                  <dl className="mt-6 flex flex-col">
                    <Line k="Authors" v={publication.authorLine} />
                    <Line k="Publisher" v={publication.publisher} />
                    <Line k="DOI" v="10.5281/zenodo.19413268" />
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <a
                      className="btn btn--sig"
                      href={publication.file}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Read the paper
                      <span aria-hidden>&#8599;</span>
                    </a>
                    <a
                      className="btn"
                      href={publication.certificate}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Certificate
                    </a>
                    <a className="btn" href={publication.doi} target="_blank" rel="noreferrer noopener">
                      DOI
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-[clamp(34px,4.5vw,64px)] grid gap-[clamp(28px,4vw,60px)] lg:grid-cols-2">
        {/* ------------------------------------------- won, and ran --------- */}
        <div className="cut">
          <div className="mb-5 flex items-baseline justify-between gap-5 border-t border-[var(--edge-2)] pt-5">
            <h3 className="subhead">Hackathons &amp; chapters</h3>
            <span className="m text-[11px] text-[var(--grey-3)]">{achievements.length}</span>
          </div>

          <ul className="seq flex flex-col">
            {achievements.map((a, i) => (
              <li
                key={a.title}
                style={{ '--i': i } as React.CSSProperties}
                className="group border-t border-[var(--edge)] py-4 transition-colors hover:border-[var(--sig-edge)]"
              >
                <p className="text-[16.5px] font-medium leading-snug transition-colors group-hover:text-[var(--sig-lit)]">
                  {a.title}
                </p>
                {a.detail && (
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--grey-1)]">
                    {a.detail}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------ certifications -- */}
        <div className="cut">
          <div className="mb-5 flex items-baseline justify-between gap-5 border-t border-[var(--edge-2)] pt-5">
            <h3 className="subhead">Certifications</h3>
            <span className="m text-[11px] text-[var(--grey-3)]">{certifications.length}</span>
          </div>

          <ul className="seq flex flex-col">
            {certifications.map((c, i) => {
              const on = cert === c.name
              return (
                <li
                  key={c.name}
                  style={{ '--i': i } as React.CSSProperties}
                  className="border-t border-[var(--edge)]"
                >
                  <button
                    type="button"
                    onClick={() => setCert(on ? null : c.name)}
                    aria-expanded={on}
                    className="discl group flex w-full items-start justify-between gap-5 py-4"
                  >
                    <span className="min-w-0">
                      <span
                        className={`block text-[16px] font-medium leading-snug transition-colors ${
                          on ? 'text-[var(--sig-lit)]' : 'group-hover:text-[var(--sig-lit)]'
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="m mt-1.5 block text-[12px] text-[var(--grey-3)]">
                        {c.issuer}
                      </span>
                    </span>
                    <span
                      className="sign mt-2 shrink-0 text-[var(--grey-2)] group-hover:text-[var(--sig-lit)]"
                      data-on={on ? '1' : '0'}
                      aria-hidden
                    />
                  </button>

                  <div className="drawer" data-on={on ? '1' : '0'}>
                    <div>
                      <div className="pb-5" inert={!on}>
                        {c.file ? (
                          <a className="btn" href={c.file} target="_blank" rel="noreferrer noopener">
                            Open the certificate
                            <span aria-hidden>&#8599;</span>
                          </a>
                        ) : (
                          <p className="tag normal-case tracking-normal">
                            Not hosted here. Available on request.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8">
            <p className="tag mb-3">Languages</p>
            <ul className="flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <li key={l} className="chip">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Stage>
  )
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--edge)] py-2.5 last:border-0">
      <dt className="tag shrink-0">{k}</dt>
      <dd className="m m-0 max-w-[38ch] text-right text-[12.5px] leading-snug text-[var(--paper)]">
        {v}
      </dd>
    </div>
  )
}
