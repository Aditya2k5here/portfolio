'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { profile, education, languages } from '@/content/profile'
import { Stage } from './Stage'
import { Flow } from './Flow'

/**
 * Contact, with enough context that nobody has to guess.
 *
 * Most contact sections are three icons and a mailto. This one answers the
 * questions somebody actually has before they write: what is he available for,
 * when does he graduate, what time is it where he is, and will he reply.
 *
 * The clock is live and labelled with the offset, because half the people
 * reading this are in another timezone and that is the one fact a static page
 * can never tell them. It is also where the photograph lives, now that the
 * opening is a drawing: by this point in the page you have earned a face.
 */

const ROWS = [
  { k: 'Email', v: profile.email, href: `mailto:${profile.email}`, primary: true },
  { k: 'Phone', v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { k: 'GitHub', v: profile.githubHandle, href: profile.github },
  { k: 'LinkedIn', v: profile.linkedinHandle, href: profile.linkedin },
  { k: 'LeetCode', v: 'aditya-srinivas3', href: profile.leetcode },
]

export function Contact() {
  return (
    <Stage id="contact" n="06" title="Contact">
      <div className="grid gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="min-w-0">
          <p className="t-h2 text-[clamp(28px,4.4vw,54px)] leading-[1.06]">
            If you are building something
            <br />
            <Flow className="font-medium">interesting</Flow>, I would like to hear about it.
          </p>

          <p className="t-body mt-7 max-w-[46ch]">
            Graduating {profile.graduating}. Open to software, ML, data and quality roles,
            and to internships before then. I read everything and reply properly, including
            a no.
          </p>

          <ul className="cut seq mt-10 flex flex-col">
            {ROWS.map((r, i) => (
              <li
                key={r.k}
                style={{ '--i': i } as React.CSSProperties}
                className="group border-t border-[var(--edge)] transition-colors hover:border-[var(--sig-edge)]"
              >
                <a
                  href={r.href}
                  className="flex min-h-[62px] items-center justify-between gap-6 py-4"
                  {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                >
                  <span className="tag">{r.k}</span>
                  <span
                    className={`m text-right text-[clamp(13px,1.4vw,17px)] transition-colors group-hover:text-[var(--sig-lit)] ${
                      r.primary ? 'text-[var(--paper)]' : 'text-[var(--grey-1)]'
                    }`}
                  >
                    {r.v}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- the face, and the practicalities ---- */}
        <div className="flex flex-col gap-[clamp(20px,2.4vw,30px)]">
          <figure className="plate cut relative m-0 overflow-hidden">
            <div className="rim" aria-hidden />
            <Image
              src="/cut/aditya.webp"
              alt={`${profile.name}, ${profile.location}`}
              width={606}
              height={967}
              sizes="(min-width: 1024px) 420px, 90vw"
              className="relative mx-auto h-auto w-[74%] max-w-[300px]"
            />
            <figcaption className="tag absolute bottom-4 left-4 normal-case tracking-normal">
              {profile.name} · {profile.location}
            </figcaption>
          </figure>

          <aside className="panel p-[clamp(20px,2.6vw,32px)]">
            <p className="tag mb-5">Before you write</p>

            <dl className="flex flex-col gap-4">
              <Row k="Local time" v={<Clock />} />
              <Row k="Based" v={profile.location} />
              <Row
                k="Graduating"
                v={`${education.current.expected.replace('Graduating ', '')} · ${education.current.institution.split(' (')[0]}`}
              />
              <Row k="Standing" v={`${education.current.standing} · CGPA ${education.current.cgpa}`} />
              <Row k="Open to" v="Software · ML · Data · QA · Internships" />
              <Row k="Speaks" v={languages.join(', ')} />
            </dl>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <a className="btn btn--sig" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className="btn" href={profile.github} target="_blank" rel="noreferrer noopener">
                Read the code
              </a>
            </div>
          </aside>
        </div>
      </div>
    </Stage>
  )
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-5 border-b border-[var(--edge)] pb-3.5 last:border-0">
      <dt className="tag shrink-0">{k}</dt>
      <dd className="m m-0 text-right text-[13px] leading-snug text-[var(--paper)]">{v}</dd>
    </div>
  )
}

/**
 * Live IST clock.
 *
 * Renders a stable placeholder on the server and fills in after mount, so the
 * markup the server produced and the markup React expects always agree. A clock
 * that differs between the two is the classic hydration mismatch.
 */
function Clock() {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      )
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span suppressHydrationWarning>
      {now ?? '--:--'} <span className="text-[var(--grey-3)]">IST · UTC+5:30</span>
    </span>
  )
}
