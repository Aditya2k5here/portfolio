'use client'

import Image from 'next/image'
import { profile } from '@/content/profile'
import { cv } from '@/content/credentials'
import { Stage } from './Stage'
import { Flow } from './Flow'

/**
 * Contact.
 *
 * The last page of the thing, so it is a sign-off rather than a dashboard. The
 * six-row table of practicalities that used to sit beside this said the same
 * facts About and Education had already said twice.
 *
 * What is left: one sentence, the links, and a small photograph. The red comes
 * back on one word, the same system as the hero at a tenth of the volume.
 */

const LINKS = [
  { k: 'Email', v: profile.email, href: `mailto:${profile.email}` },
  { k: 'Phone', v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { k: 'GitHub', v: profile.githubHandle, href: profile.github },
  { k: 'LinkedIn', v: profile.linkedinHandle, href: profile.linkedin },
  { k: 'LeetCode', v: 'aditya-srinivas3', href: profile.leetcode },
  { k: 'CV', v: 'PDF', href: cv },
]

export function Contact() {
  return (
    <Stage id="contact" n="07" title="Contact">
      <div className="cut grid gap-x-[clamp(28px,4vw,80px)] gap-y-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div className="min-w-0">
          <p className="t-h2 max-w-[16ch] text-[clamp(28px,4.6vw,56px)] leading-[1.06]">
            If you are building something{' '}
            <Flow className="font-medium">interesting</Flow>, I would like to hear
            about it.
          </p>

          <p className="t-body mt-7 max-w-[42ch]">
            Graduating {profile.graduating}, and looking for something before then.
            I reply to everything, including a no.
          </p>

          <a className="btn btn--sig mt-8" href={`mailto:${profile.email}`}>
            Say hello
            <span aria-hidden>&rarr;</span>
          </a>

          <ul className="seq mt-12 grid gap-x-10 sm:grid-cols-2">
            {LINKS.map((r, i) => (
              <li
                key={r.k}
                style={{ '--i': i } as React.CSSProperties}
                className="group border-t border-[var(--edge)] transition-colors hover:border-[var(--sig-edge)]"
              >
                <a
                  href={r.href}
                  className="flex min-h-[56px] items-center justify-between gap-5 py-3"
                  {...(r.href.startsWith('http') || r.href.startsWith('/docs')
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                >
                  <span className="tag">{r.k}</span>
                  <span className="m truncate text-right text-[13.5px] text-[var(--grey-1)] transition-colors group-hover:text-[var(--sig-lit)]">
                    {r.v}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* The only photograph below the hero. Small, and at the end. */}
        <figure className="m-0 flex flex-col justify-end">
          <div className="relative w-[168px] sm:w-[196px]">
            <span className="rim" aria-hidden />
            <Image
              src="/cut/aditya-bust.webp"
              alt={`${profile.name}, ${profile.location}`}
              width={606}
              height={487}
              sizes="196px"
              className="cutout relative h-auto w-full"
            />
          </div>
          <figcaption className="mt-3">
            <p className="text-[15px] font-medium leading-snug">{profile.name}</p>
            <p className="m mt-1 text-[11px] leading-relaxed text-[var(--grey-3)]">
              Bangalore · Still building something
            </p>
          </figcaption>
        </figure>
      </div>
    </Stage>
  )
}
