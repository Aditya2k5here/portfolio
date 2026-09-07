'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'education', label: 'Education' },
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
 */
export function Nav() {
  const [stuck, setStuck] = useState(false)
  const [here, setHere] = useState<string>('')

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

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        stuck
          ? 'border-b border-[var(--edge)] bg-[rgb(6_7_10_/_0.82)] backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-[62px] items-center justify-between gap-4">
        <a href="#top" className="wordmark" data-on={stuck ? '1' : '0'} aria-hidden={!stuck}>
          <span>
            <i>A</i>ditya <i>S</i>rinivas
          </span>
        </a>

        {/* Scrollable on narrow screens rather than collapsed behind a button.
            Seven short words fit on a laptop; a hamburger for seven words is
            theatre, and it hides the only map of the page a reader gets. */}
        <nav
          aria-label="Sections"
          className="fade-r -mr-[var(--pad)] flex min-w-0 items-center gap-4 overflow-x-auto pr-[var(--pad)] sm:gap-5 lg:gap-6 md:mr-0 md:overflow-visible md:pr-0"
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
      </div>
    </div>
  )
}
