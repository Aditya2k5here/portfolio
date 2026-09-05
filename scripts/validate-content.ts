/**
 * Build-time content validation. Runs in `prebuild`, so a violation fails the build
 * rather than shipping. The honesty rules on this site are enforced here, not by memory.
 *
 *   node --experimental-strip-types scripts/validate-content.ts
 */
import { parts } from '../content/parts/index.ts'
import { fieldNotes, budget } from '../content/site.ts'
import type { Part } from '../content/parts/types.ts'

const errors: string[] = []
const warnings: string[] = []

const fail = (id: string, msg: string) => errors.push(`${id}: ${msg}`)
const warn = (id: string, msg: string) => warnings.push(`${id}: ${msg}`)

/** Numbers that may appear on the site. Anything else numeric is suspect. */
const BANNED_WORDS = [
  'passionate',
  'aspiring',
  'enthusiast',
  'journey',
  'humble',
  'dedicated',
  'hardworking',
]

const BANNED_STACK = ['tensorflow', 'keras']

for (const p of parts as Part[]) {
  // 1. limitations required, min length 1
  if (!Array.isArray(p.limitations) || p.limitations.length < 1) {
    fail(p.id, 'limitations is required and must have at least one entry')
  }

  // 2. thesis <= 120 chars
  if (p.thesis.length > 120) {
    fail(p.id, `thesis is ${p.thesis.length} chars, limit is 120`)
  }

  // 3. a measurements array where every value is null AND there is no explanatory note
  if (p.measurements.length > 0) {
    const allNull = p.measurements.every((m) => m.value === null)
    const anyNote = p.measurements.some((m) => m.note && m.note.trim().length > 0)
    if (allNull && !anyNote) {
      fail(p.id, 'every measurement is null and no explanatory note is given')
    }
  }

  // 4. every removal must carry a reason — this is what the NOT BUILT view is made of
  p.notBuilt.forEach((r, i) => {
    if (!r.rejected?.trim()) fail(p.id, `notBuilt[${i}] has no subject`)
    if (!r.because?.trim()) {
      fail(p.id, `notBuilt[${i}] "${r.rejected}" has no reason — a removal without a reason does not ship`)
    }
  })

  // 5. every decision must carry a reason
  p.decisions.forEach((d, i) => {
    if (!d.because?.trim()) fail(p.id, `decisions[${i}] "${d.choice}" has no reason`)
  })

  // 6. TerraHawk-specific truth constraints
  if (p.status === 'design') {
    if (p.stack.length > 0) {
      fail(p.id, `status is 'design' but stack is non-empty — nothing was built`)
    }
    if (!p.evidence.includes('none')) {
      fail(p.id, `status is 'design' but evidence does not include 'none'`)
    }
    const prose = [p.problem, p.result ?? '', p.thesis].join(' ').toLowerCase()
    for (const verb of ['i built', 'i developed', 'i architected', 'working on', 'i am building']) {
      if (prose.includes(verb)) {
        fail(p.id, `status is 'design' but prose contains "${verb}"`)
      }
    }
  }

  // 7. banned stacks
  for (const s of p.stack) {
    if (BANNED_STACK.includes(s.toLowerCase())) {
      fail(p.id, `stack contains "${s}" — check the real stack before claiming it`)
    }
  }

  // 8. evidence must not promise a link that does not exist
  if (p.evidence.includes('repo') && !p.links.some((l) => /github\.com/i.test(l.href))) {
    warn(p.id, `evidence includes 'repo' but no GitHub link is present — do not print a link that 404s`)
  }
  if (p.evidence.includes('live') && !p.links.some((l) => /^https?:/i.test(l.href))) {
    warn(p.id, `evidence includes 'live' but no live URL is present`)
  }

  // 9. banned self-description
  const allProse = [p.problem, p.result ?? '', ...p.limitations].join(' ').toLowerCase()
  for (const w of BANNED_WORDS) {
    if (new RegExp(`\\b${w}\\b`).test(allProse)) {
      fail(p.id, `prose contains banned word "${w}"`)
    }
  }

  // 10. index fact must exist — the rail rule: no blanks anywhere
  if (!p.indexFact?.trim()) fail(p.id, 'indexFact is empty — every part shows a fact or a stamp')
}

// 11. a field note without a citation does not ship
fieldNotes.forEach((n, i) => {
  if (!n.cites?.trim()) fail('field-notes', `note[${i}] "${n.text}" has no citation`)
  if (!parts.some((p) => p.id === n.cites)) {
    fail('field-notes', `note[${i}] cites "${n.cites}", which is not a part on this site`)
  }
})
if (fieldNotes.length > 6) fail('field-notes', `${fieldNotes.length} notes, cap is 6`)

// 12. budget rows must either state an actual or say why not
budget.forEach((b, i) => {
  if (b.actual === null && !b.note) {
    fail('colophon', `budget[${i}] "${b.metric}" has no actual and no note explaining why`)
  }
})

// ---- report ----
const label = (s: string) => `\x1b[2m${s}\x1b[0m`
console.log(label(`\n  validate-content — ${parts.length} parts, ${fieldNotes.length} field notes\n`))

for (const w of warnings) console.log(`  \x1b[33mwarn\x1b[0m  ${w}`)

if (errors.length) {
  for (const e of errors) console.log(`  \x1b[31mfail\x1b[0m  ${e}`)
  console.log(`\n  \x1b[31m${errors.length} error(s). Build stopped.\x1b[0m\n`)
  process.exit(1)
}

const removals = parts.reduce((n, p) => n + p.notBuilt.length, 0)
const stamped = parts.reduce((n, p) => n + p.measurements.filter((m) => m.value === null).length, 0)
console.log(
  label(
    `  ok — ${removals} removals recorded, ${stamped} measurements stamped, ${warnings.length} warning(s)\n`,
  ),
)
