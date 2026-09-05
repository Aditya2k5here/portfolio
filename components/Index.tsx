'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { nav, site } from '@/content/site'

/**
 * Vertical index, fixed on desktop, full height.
 * Never a bar, never sticky-on-top, never a hamburger.
 * The three external links are plain underlined text and are reachable from every screen.
 */
export function SiteIndex() {
  const path = usePathname()

  return (
    <nav
      aria-label="Site index"
      className="
        border-b border-rule bg-paper px-5 py-4
        lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:flex lg:w-[196px] lg:flex-col
        lg:justify-between lg:border-r lg:border-b-0 lg:px-7 lg:py-9
      "
    >
      <div>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] no-underline lg:min-h-0"
        >
          {site.name}
        </Link>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
          {site.category}
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 lg:mt-11 lg:flex-col lg:gap-y-[7px]">
          {nav.map((n) => {
            const active = n.href === '/' ? path === '/' || path === '/not-built/' : path.startsWith(n.href)
            return (
              <li key={n.num}>
                <Link
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] no-underline lg:min-h-0 lg:py-[3px] ${
                    active ? 'text-ink' : 'text-graphite hover:text-ink'
                  }`}
                >
                  <span className={active ? 'text-vermillion' : 'text-graphite'}>{n.num}</span>
                  <span className="text-graphite">/</span>
                  <span>{n.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-7 border-t border-rule pt-4 lg:mt-0">
        <ul className="flex flex-wrap gap-x-6 font-mono text-[10px] uppercase tracking-[0.14em] lg:flex-col lg:gap-y-[5px]">
          <li>
            <a href={site.github} className="inline-flex min-h-[44px] items-center text-graphite hover:text-ink lg:min-h-0">
              GitHub
            </a>
          </li>
          {site.resumeFile && (
            <li>
              <a
                href={site.resumeFile}
                className="inline-flex min-h-[44px] items-center text-graphite hover:text-ink lg:min-h-0"
              >
                Resume
              </a>
            </li>
          )}
          <li>
            <a href={site.linkedin} className="inline-flex min-h-[44px] items-center text-graphite hover:text-ink lg:min-h-0">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
