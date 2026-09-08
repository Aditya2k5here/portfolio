'use client'

import { useEffect, useState } from 'react'
import { profile } from '@/content/profile'
import { cv } from '@/content/credentials'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/**
 * The bar.
 *
 * Two jobs. The sections are always reachable, and the name arrives late: at
 * the top of the page it is already set at 172px behind the figure, and
 * printing it a second time in the corner is just noise. It fades in once you
 * have scrolled past it and the page needs to re-introduce itself.
 *
 * The underline on each link is also the position indicator, so there is one
 * mechanism doing hover and current-section rather than two competing ones.
 *
 * Below 768px the five words no longer fit — measured, not guessed: they run
 * 15px past a 375px screen and clip the last one. So the strip becomes a
 * single control that is labelled with the section you are currently in, and
 * opens the same five as a full-screen menu. The bar keeps telling you where
 * are, which was the only thing the underline was doing anyway.
 */
export function Nav() {
  const [stuck, setStuck] = useState(false)
  const [here, setHere] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 220)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Which section is under the top third of the viewport. */
  useEffect(() => {
    const nodes = LINKS.map((l) => document.getElementById(l.id)).filter(
      (n): n is HTMLElement => Boolean(n),
    )
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting)
        if (seen.length) {
          setHere(seen.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id)
        }
      },
      { rootMargin: '-18% 0px -62% 0px' },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  /* Hold the page still behind the menu, and let Escape out of it. */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', esc)
    }
  }, [open])

  const current = LINKS.find((l) => l.id === here)

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          stuck && !open
            ? 'border-b border-[var(--edge)] bg-[rgb(6_7_10_/_0.82)] backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="shell flex h-[62px] items-center justify-between gap-4">
          <a href="#top" className="wordmark" data-on={stuck ? '1' : '0'}>
            <span>
              <i>A</i>ditya <i>S</i>rinivas
            </span>
          </a>

          {/* Seven short words fit on a laptop, so on a laptop they stay put:
              a hamburger for seven words is theatre, and it hides the only map
              of the page a reader gets. */}
          <nav
            aria-label="Sections"
            className="barnav -mr-[var(--pad)] hidden min-w-0 items-center gap-4 overflow-x-auto pr-[var(--pad)] sm:gap-5 lg:gap-6 md:mr-0 md:flex md:overflow-visible md:pr-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="navlink"
                data-on={here === l.id ? '1' : '0'}
                aria-current={here === l.id ? 'true' : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* The phone control. Reads as a position indicator first and a menu
              second, which is the honest order: you glance at it far more
              often than you tap it. */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="sections-menu"
            className="navtrig md:hidden"
          >
            <span className="navtrig-label">{open ? 'Close' : (current?.label ?? 'Menu')}</span>
            <span className="navtrig-glyph" data-on={open ? '1' : '0'} aria-hidden>
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      {/* The menu. Numbered, because five is a countable list and saying so
          costs nothing; the one you are in is already lit when it opens. */}
      <div
        id="sections-menu"
        className={`menu md:hidden ${open ? 'menu--on' : ''}`}
        inert={!open}
      >
        <nav aria-label="Sections" className="shell flex h-full flex-col justify-center pb-8 pt-[62px]">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="menu-row"
              data-on={here === l.id ? '1' : '0'}
              aria-current={here === l.id ? 'true' : undefined}
            >
              <span className="menu-no m">{String(i + 1).padStart(2, '0')}</span>
              <span className="menu-name">{l.label}</span>
              <span className="menu-arrow" aria-hidden>
                &rarr;
              </span>
            </a>
          ))}

          <a
            href={cv}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            className="btn btn--sig mt-8 w-full"
          >
            Resume
            <span aria-hidden>&#8599;</span>
          </a>

          <p className="tag mt-7">
            {profile.location} / graduating {profile.graduating}
          </p>
        </nav>
      </div>
    </>
  )
}
