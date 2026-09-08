import Image from 'next/image'
import { profile } from '@/content/profile'
import { Blob } from './Blob'
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
    <header id="top" className="portfolio-hero relative isolate overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/hero/aditya-room.webp"
          alt="Aditya at night on a beanbag with a laptop and a mug of coffee, lit by a hanging lamp"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center] lg:object-center"
        />
      </div>

      <span className="hero-scrim lg:hidden" aria-hidden />

      <Lamp className="pointer-events-none absolute left-[35.5%] top-0 z-30 hidden h-[63%] w-auto lg:block [&_#rig]:pointer-events-auto" />

      <div className="shell relative z-20 flex min-h-[72svh] flex-col justify-center pt-[132px] pb-12 lg:min-h-[100svh] lg:max-w-none lg:pb-24">
        <p className="m text-[11px] uppercase tracking-[0.16em] text-[var(--grey-1)]">
          {profile.location} / graduating {profile.graduating}
        </p>

        <Blob>
          <h1 className="nametype mt-7">
            <span className="hero-name-given block">Aditya</span>
            <span className="hero-name-family -ml-[0.05em] block">Srinivas</span>
          </h1>

          <p className="mt-8 text-[30px] font-medium leading-tight tracking-[-0.03em]">
            Curious by default.
          </p>

          <p className="mt-2.5 max-w-[31ch] text-[17px] leading-[1.55] text-[var(--grey-1)]">
            I&rsquo;m usually one &ldquo;wait, what if&hellip;&rdquo; away from building
            something.
          </p>
        </Blob>

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
          className="scroll-cue tag mt-10 inline-flex min-h-[44px] items-center gap-3 transition-colors hover:text-[var(--paper)]"
        >
          <span className="scroll-cue-line" aria-hidden>
            &darr;
          </span>
          Scroll
        </a>
      </div>

    </header>
  )
}
