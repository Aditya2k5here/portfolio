# As built / Not built

An as-built record of four systems. Not a portfolio — the word appears nowhere on the site.

The record reads in two directions. `/` is **as built**: what each system is, what it measured
at, what it cannot do. `/not-built` is the same four parts with the stack struck through and
replaced by what was deliberately left out, each with the reason it was left out.

The part with no implementation is the emptiest sheet in one view and the fullest in the other.
That inversion is the argument.

## Run

```bash
npm install
npm run dev
```

| script | does |
|---|---|
| `npm run dev` | dev server |
| `npm run validate` | content validation only |
| `npm run build` | validate, then static export to `out/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run measure` | cold-load weight per route, gzipped, vs budget |

## Shape

```
content/parts/      one file per part + types + index   ← every fact lives here
content/site.ts     nav, field notes, about, budget, colophon
components/         Sheet primitive, PartsIndex, PartSheet, Stamp, Measurements
app/                routes only; no facts written inside a component
scripts/            validate-content.ts, run in prebuild
```

Nothing about a project is written inside a component. Adding a part is one file in
`content/parts/` plus one line in `content/parts/index.ts`.

## The validator

`scripts/validate-content.ts` runs in `prebuild`, so a violation fails the build rather than
shipping. It throws on:

- an empty `limitations` array
- a `thesis` over 120 characters
- a `measurements` array where every value is `null` and no note explains why
- a `notBuilt` entry with no reason — *a removal without a reason does not ship*
- a `decisions` entry with no reason
- `status: 'design'` with a non-empty stack, or missing `evidence: ['none']`
- `status: 'design'` prose containing "I built", "I developed", "working on"
- a stack naming TensorFlow or Keras
- a field note with no citation, or citing a part that does not exist
- a budget row with no actual and no note explaining why

It warns on evidence promising a link that is not present.

## Honesty rules

- No metric appears unless it is in the content data. Missing measurements render a
  `NOT MEASURED` stamp, never a blank.
- Status is never conveyed by colour alone; the stamp always carries the word.
- No link is printed that would 404. `SM-02` and `DC-03` are `evidence: ['none']` until their
  repos are public; the resume shows a `NOT UPLOADED` stamp until `site.resumeFile` is set.

## Open items

- [ ] Push `smart-mirror` (no remote configured) and `Derma-Care` (not a git repo), then set
      their `evidence` back to `['repo']` and add the links.
- [ ] Add the resume PDF to `public/` and set `site.resumeFile`.
- [ ] Re-measure Smart Mirror's Python LOC and state the scope on the sheet.
- [ ] Measure LCP on a real device; it is the one budget row still unmeasured.
- [ ] Decide what to do about two missed budgets (`npm run measure` prints them):
      **JS 180 KB against a 40 KB budget** — Next.js App Router ships a React runtime that
      cannot reach 40 KB. Site code is under 3 KB of that. Hitting the budget means Astro or
      hand-written HTML, not a smaller page. **Fonts 132 KB against 90 KB** — Archivo variable
      is 88 KB of it. Subsetting it with `fonttools` (installed) to the characters actually
      used, keeping the `wdth` axis and the layout tables, would likely clear the budget; that
      is the same technique RG-01's case study describes.

## Colour

Every colour is a token on `:root`. Light is the base; dark is redefined under
`prefers-color-scheme` guarded by `:not([data-theme="light"])` and again under
`[data-theme="dark"]`. No colour is declared only inside a media query.

Contrast is computed from the token values and published in the colophon. `graphite` and
`vermillion` were darkened slightly from their original values because both landed just under
4.5:1 on paper in the light theme.
