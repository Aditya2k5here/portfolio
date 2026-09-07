import { profile } from '@/content/profile'
import { Name, GooFilter } from './Name'
import { Scene } from './Scene'

/**
 * The first screen.
 *
 * The name and the scene, and almost nothing else. Everything that used to sit
 * here as a paragraph moved into About, one scroll down, because the opening
 * of a portfolio is the one place where a wall of text costs the most and
 * proves the least.
 *
 * The scene bleeds off the right edge and dissolves into the page on its left,
 * so the type sits on flat black rather than on a picture. It is the only
 * illustration on the site until the very last section.
 */
export function Opening() {
  return (
    <header id="top" className="relative isolate overflow-hidden">
      <GooFilter />

      {/* The scene, bleeding right. Hidden below lg, where it gets its own
          block underneath instead of being squeezed behind the type. */}
      <div className="scene-bleed absolute inset-y-0 right-0 hidden w-[60%] lg:block xl:w-[58%]">
        <Scene className="h-full w-full" />
      </div>

      <div className="shell relative z-10 flex min-h-[92vh] flex-col justify-center pt-[clamp(96px,14vh,150px)] pb-[clamp(36px,6vh,64px)]">
        <p className="m text-[11px] uppercase tracking-[0.16em] text-[var(--grey-3)]">
          {profile.location} / graduating {profile.graduating}
        </p>

        <div className="mt-6 max-w-[16ch] lg:max-w-none">
          <Name first="Aditya" last="Srinivas" />
        </div>

        <p className="t-h3 mt-8 font-medium">Curious by default.</p>

        <p className="mt-2.5 max-w-[34ch] text-[16.5px] leading-[1.55] text-[var(--grey-1)]">
          Building systems, products, and things I probably should not be building.
        </p>

        <div className="mt-9 flex flex-wrap gap-2.5">
          <a className="btn btn--sig" href="#work">
            See my work
            <span aria-hidden>&rarr;</span>
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a className="btn" href="#contact">
            Contact
          </a>
        </div>

        <a
          href="#about"
          className="tag mt-[clamp(32px,6vh,64px)] inline-flex items-center gap-3 transition-colors hover:text-[var(--paper)]"
        >
          <span aria-hidden className="block h-px w-8 bg-[var(--edge-3)]" />
          Scroll
        </a>
      </div>

      {/* Below lg the scene gets its own band, full width, rather than being
          cropped to a sliver behind the name. */}
      <div className="relative aspect-[10/8] w-full sm:aspect-[16/9] lg:hidden">
        <Scene className="h-full w-full" />
      </div>
    </header>
  )
}
