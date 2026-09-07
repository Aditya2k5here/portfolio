import Image from 'next/image'
import { profile } from '@/content/profile'
import { Blob, GooFilter } from './Blob'
import { Lamp } from './Lamp'

/**
 * The first screen.
 *
 * The room is the reference render, cropped right of the type that was baked
 * into it and below the baked navigation. What is left of the interface in its
 * top-left corner falls inside the mask that dissolves the image into the page,
 * so it never reaches the screen.
 *
 * The lamp is not in the photograph. It was cropped off deliberately and drawn
 * live instead, hanging in the black where the artwork's own warm falloff still
 * points, because a lamp baked into a JPEG cannot be pulled about.
 *
 * The name and the blob are the only other things here. Everything the hero
 * used to say in prose is one scroll down in About.
 */
export function Opening() {
  return (
    <header id="top" className="relative isolate overflow-hidden">
      <GooFilter />

      {/* the room */}
      <div className="scene-bleed absolute inset-y-0 right-0 hidden w-[62%] lg:block xl:w-[60%]">
        <Image
          src="/hero/room.webp"
          alt="Aditya at night on a beanbag with a laptop and a mug of coffee, lit by a hanging lamp"
          fill
          priority
          sizes="62vw"
          className="object-cover object-left"
        />
      </div>

      {/* the lamp, hanging in the black where the artwork was cut */}
      <Lamp className="pointer-events-none absolute left-[22%] top-0 z-10 hidden h-[66%] w-auto lg:block xl:left-[24%] [&_.grab]:pointer-events-auto" />

      <div className="shell relative z-20 flex min-h-[72vh] flex-col justify-center pt-[clamp(88px,12vh,150px)] pb-[clamp(28px,5vh,64px)] lg:min-h-[92vh]">
        <p className="m text-[11px] uppercase tracking-[0.16em] text-[var(--grey-3)]">
          {profile.location} / graduating {profile.graduating}
        </p>

        <Blob>
          <h1 className="nametype mt-6">
            <span className="t-h1 block">Aditya</span>
            <span className="t-mega -ml-[0.045em] block">Srinivas</span>
          </h1>
        </Blob>

        <p className="t-h3 mt-8 font-medium">Curious by default.</p>

        <p className="mt-2.5 max-w-[32ch] text-[16.5px] leading-[1.55] text-[var(--grey-1)]">
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
        </div>

        <a
          href="#about"
          className="tag mt-[clamp(32px,6vh,64px)] inline-flex items-center gap-3 transition-colors hover:text-[var(--paper)]"
        >
          <span aria-hidden className="block h-px w-8 bg-[var(--edge-3)]" />
          Scroll
        </a>
      </div>

      {/* Below lg the room gets its own band at full width rather than being
          cropped to a sliver behind the name. No lamp: there is no pointer to
          pull it with, and a toy nobody can reach is just weight. */}
      <div className="relative aspect-[10/8] w-full sm:aspect-[16/10] lg:hidden">
        <Image
          src="/hero/room.webp"
          alt="Aditya at night on a beanbag with a laptop and a mug of coffee"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </header>
  )
}
