/**
 * The desk, drawn.
 *
 * A photograph of somebody at a laptop is the single most reused image on the
 * internet, and a cut-out portrait pinned to a dark page is the second. This is
 * neither: a flat vector scene lit by two sources that disagree with each other,
 * a warm bulb on the left and the cold laptop underneath, which is what a room
 * actually looks like at one in the morning.
 *
 * It is drawn for its silhouette, because it renders about 400px wide and
 * anything finer than a shoulder line is wasted there. Two arms were tried and
 * one was cut: the far one added a shape behind the laptop that read as a cape.
 *
 * Nothing moves fast. The bulb settles, the cord drifts a degree, steam leaves
 * the mug every five seconds, he breathes and occasionally blinks. If you
 * notice the animation you are looking at the wrong thing. Every animation is a
 * class in globals.css, which is also where they are switched off for anyone
 * who asked for reduced motion.
 */
export function Desk({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="66 44 448 508"
      className={className}
      role="img"
      aria-label="Illustration: Aditya at a desk at night, working on a laptop with a mug of coffee, lit by a hanging bulb."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="d-warm" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffc766" stopOpacity="0.44" />
          <stop offset="38%" stopColor="#f9a03f" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#f9a03f" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="d-bulb" cx="42%" cy="36%">
          <stop offset="0%" stopColor="#fff4d0" />
          <stop offset="55%" stopColor="#ffcb5e" />
          <stop offset="100%" stopColor="#f29a2e" />
        </radialGradient>

        <radialGradient id="d-screen" cx="50%" cy="100%">
          <stop offset="0%" stopColor="#9fe3ff" stopOpacity="0.4" />
          <stop offset="48%" stopColor="#4cc9f0" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#4cc9f0" stopOpacity="0" />
        </radialGradient>

        {/* Lit from the left, so every skin gradient runs the same way. */}
        <linearGradient id="d-skin" x1="0" y1="0.1" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#eaae78" />
          <stop offset="46%" stopColor="#c78b60" />
          <stop offset="100%" stopColor="#8c5a3b" />
        </linearGradient>

        <linearGradient id="d-shirt" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#2e3644" />
          <stop offset="48%" stopColor="#1c222c" />
          <stop offset="100%" stopColor="#0f1319" />
        </linearGradient>

        <linearGradient id="d-hair" x1="0.05" y1="0" x2="0.95" y2="1">
          <stop offset="0%" stopColor="#38414e" />
          <stop offset="40%" stopColor="#181d25" />
          <stop offset="100%" stopColor="#0a0d11" />
        </linearGradient>

        <linearGradient id="d-desk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#191e27" />
          <stop offset="32%" stopColor="#11151b" />
          <stop offset="100%" stopColor="#080a0e" />
        </linearGradient>

        <linearGradient id="d-lid" x1="0" y1="0" x2="1" y2="0.7">
          <stop offset="0%" stopColor="#2c3441" />
          <stop offset="55%" stopColor="#1c222b" />
          <stop offset="100%" stopColor="#12161c" />
        </linearGradient>

        <filter id="d-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="d-soft-sm" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ---------------------------------------------------- ambient warmth */}
      <g className="a-bulb">
        <circle cx="118" cy="182" r="220" fill="url(#d-warm)" />
        <ellipse cx="170" cy="498" rx="200" ry="32" fill="url(#d-warm)" opacity="0.8" />
      </g>

      {/* ----------------------------------------------------------- the bulb */}
      <g className="a-sway" style={{ transformOrigin: '118px 0px' }}>
        <line x1="118" y1="-10" x2="118" y2="126" stroke="#2b313d" strokeWidth="2.5" />
        <path d="M110 124h16a4 4 0 0 1 4 4v13h-24v-13a4 4 0 0 1 4-4z" fill="#39414f" />
        <rect x="105" y="140" width="26" height="7" rx="2.5" fill="#2b313d" />

        <circle cx="118" cy="172" r="44" fill="#ffc766" opacity="0.36" filter="url(#d-soft)" />
        <circle cx="118" cy="171" r="24" fill="url(#d-bulb)" />
        <path
          d="M112 179c0-8 3-9 3-15s-4-6-4-10M124 179c0-8-3-9-3-15s4-6 4-10"
          stroke="#fff6dd"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        <circle cx="110" cy="163" r="6" fill="#fffdf2" opacity="0.5" />
      </g>

      {/* --------------------------------------------------------- the figure */}
      <g className="a-breathe">
        {/* the chair, only enough of it to say he is sitting */}
        <path d="M214 500V352a30 30 0 0 1 30-30h94a30 30 0 0 1 30 30v148z" fill="#0e1116" />

        {/* torso and shoulders, one shape */}
        <path d="M198 500c0-102 24-166 92-170 68 4 92 68 92 170z" fill="url(#d-shirt)" />

        {/* collar */}
        <path
          d="M264 320c10 19 17 28 26 28s16-9 26-28c-10-5-17-8-26-8s-16 3-26 8z"
          fill="#0a0d12"
        />

        {/* neck */}
        <path d="M272 258h36v60h-36z" fill="#9b6945" />
        <path d="M272 258h14v60h-14z" fill="#b57c54" />

        {/* --- head. Face first, hair painted solidly over the crown. --- */}
        <path
          d="M246 212c0-44 18-68 44-68s44 24 44 68c0 40-17 72-44 74s-44-34-44-74z"
          fill="url(#d-skin)"
        />
        {/* jaw shadow, so the chin has an edge */}
        <path d="M258 250c8 24 20 36 32 36s24-12 32-36c-6 26-18 40-32 40s-26-14-32-40z" fill="#8c5a3b" opacity="0.4" />
        {/* ear */}
        <path d="M333 210c8-4 13 2 12 11s-8 15-13 12z" fill="#a97350" />

        {/* Hair: short at the sides, mass on top swept up and back. One closed
            filled shape, because an outlined one leaves the crown as scalp. */}
        <path
          d="M244 216c-3-32 2-54 16-68 16-16 42-20 60-10 20 11 22 32 11 45 11 6 16 18 15 33
             -5-17-13-25-25-28-16 18-46 22-64 10-6 4-11 10-13 18z"
          fill="url(#d-hair)"
        />
        {/* the sweep, catching the bulb */}
        <path d="M262 156c15-17 40-21 56-11-19-4-40 1-56 11z" fill="#4d5766" opacity="0.5" />

        {/* face. He is looking down at the screen, so everything sits low. */}
        <g className="a-blink" style={{ transformOrigin: '290px 220px' }}>
          <path d="M268 220c4-5 12-5 16 0-4 5-12 5-16 0z" fill="#12161d" />
          <path d="M300 220c4-5 12-5 16 0-4 5-12 5-16 0z" fill="#12161d" />
        </g>
        <path
          d="M262 204c7-5 15-5 21-1M296 203c6-4 14-4 21 1"
          stroke="#171b22"
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* nose: two short marks, not a line down the middle */}
        <path
          d="M292 232c2 6 3 9-2 10"
          stroke="#8b5837"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M279 256c7 5 15 5 21-1"
          stroke="#7a4c31"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* the warm side, because the bulb is on the left */}
        <path
          d="M246 212c0-44 18-68 44-68-20 6-30 29-30 68 0 35 9 65 26 74-24-4-40-35-40-74z"
          fill="#ffb45e"
          opacity="0.19"
        />
      </g>

      {/* --------------------------------------------- the arm, and the mug */}
      {/* One arm, drawn as a silhouette: down the outside, round the elbow,
          back up the inside to the mug. */}
      <path
        d="M244 330c-30 22-46 62-44 96 2 20 30 22 40 4 10-18 20-46 26-62 6-16-4-42-22-38z"
        fill="url(#d-shirt)"
      />
      <path
        d="M232 424c8 16 34 14 42-6 6-16 12-38 14-50l-30-8c-4 14-12 42-18 52z"
        fill="#252c37"
      />

      <g>
        <g stroke="#cdd3dd" strokeWidth="2.8" strokeLinecap="round" fill="none">
          <path className="a-steam" d="M264 344c-8-10 7-16 0-28" opacity="0" />
          <path className="a-steam-2" d="M279 342c-8-11 7-17 0-29" opacity="0" />
          <path className="a-steam-3" d="M251 346c-7-10 7-15 0-26" opacity="0" />
        </g>

        <path
          d="M288 372c14-4 19 5 18 13s-9 14-19 12"
          stroke="#b31629"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M245 354h44v42a11 11 0 0 1-11 11h-22a11 11 0 0 1-11-11z" fill="#e11d33" />
        <path d="M245 354h44v6h-44z" fill="#ff5468" />
        <path d="M275 354h14v53h-3a11 11 0 0 0 3-8z" fill="#b31629" opacity="0.5" />

        {/* the hand wrapped round it */}
        <path d="M264 408c-14 2-24-4-25-13s7-16 20-16z" fill="#c78b60" />
        <path
          d="M247 386h13M247 394h13M247 402h11"
          stroke="#a06c46"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* --------------------------------------------------------------- desk */}
      <path d="M0 500h560v100H0z" fill="url(#d-desk)" />
      <path d="M0 500h560v2H0z" fill="#414a5b" />
      <path d="M0 500h320v2H0z" fill="#ffc766" opacity="0.55" />

      {/* ------------------------------------------------------------ laptop */}
      <ellipse cx="322" cy="430" rx="130" ry="76" fill="url(#d-screen)" className="a-screen" />

      <path d="M268 404h112l12 68H256z" fill="url(#d-lid)" />
      {/* the sliver of screen light escaping over the top edge */}
      <path d="M269 407h110l1 4H268z" fill="#7fd8f5" opacity="0.6" filter="url(#d-soft-sm)" />
      {/* the deck, sitting on the desk rather than sunk into it */}
      <path d="M256 472h140l10 20a4 4 0 0 1-4 6H250a4 4 0 0 1-4-6z" fill="#2d3441" />
      <path d="M247 494h158v4H247z" fill="#4a5464" />
      <path d="M247 494h80v4H247z" fill="#ffc766" opacity="0.35" />

      {/* No lines of code on the lid: we are behind the machine, and drawing
          the screen on the back of it was the one thing in the picture that
          could not be true. The light escaping over the top edge does the job. */}
    </svg>
  )
}
