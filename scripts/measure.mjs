/**
 * Measures what a visitor actually downloads for a cold load of each route,
 * from the static export in out/. Gzipped, because that is what ships.
 *
 *   npm run measure
 *
 * The colophon publishes budget vs actual. This is where the actuals come from.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const OUT = 'out'
const kb = (n) => `${(n / 1024).toFixed(1)} KB`

if (!existsSync(OUT)) {
  console.error('  no out/ — run `npm run build` first')
  process.exit(1)
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, acc)
    else acc.push(p)
  }
  return acc
}

const gz = (p) => (existsSync(p) ? gzipSync(readFileSync(p)).length : 0)

/** True if a unicode-range value includes U+0041 ('A') — i.e. the browser needs it for English. */
function coversBasicLatin(value) {
  for (const part of value.split(',')) {
    const t = part.trim().replace(/^U\+/i, '')
    const [lo, hi] = t.split('-')
    const expand = (s, fill) => parseInt(s.replace(/\?/g, fill), 16)
    const start = expand(lo, '0')
    const end = hi ? parseInt(hi, 16) : lo.includes('?') ? expand(lo, 'F') : start
    if (0x41 >= start && 0x41 <= end) return true
  }
  return false
}

/** Resolve an href found in HTML/CSS to a path inside out/. */
function toPath(href, fromFile) {
  const clean = href.split('?')[0].split('#')[0]
  if (clean.startsWith('/')) return join(OUT, clean)
  return resolve(dirname(fromFile), clean)
}

const pages = walk(OUT).filter((f) => f.endsWith('.html'))
const rows = []

for (const page of pages) {
  const html = readFileSync(page, 'utf8')

  const js = new Set()
  const css = new Set()
  for (const m of html.matchAll(/<script[^>]+src="([^"]+)"/g)) js.add(toPath(m[1], page))
  for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g))
    css.add(toPath(m[1], page))
  for (const m of html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)) css.add(toPath(m[1], page))

  /**
   * Fonts are referenced from the stylesheets, and each family ships several
   * unicode-range subsets. A browser rendering English fetches only the subsets
   * whose range covers the characters on the page — counting all of them would
   * publish a number roughly twice the truth.
   */
  const fonts = new Set()
  for (const sheet of css) {
    if (!existsSync(sheet)) continue
    const text = readFileSync(sheet, 'utf8')
    for (const face of text.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
      const body = face[1]
      const url = body.match(/url\(([^)]+\.woff2?)\)/)
      if (!url) continue
      const range = body.match(/unicode-range:\s*([^;}]+)/)
      if (range && !coversBasicLatin(range[1])) continue
      fonts.add(toPath(url[1].replace(/["']/g, ''), sheet))
    }
  }

  const imgs = new Set()
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) imgs.add(toPath(m[1], page))

  const sum = (set) => [...set].reduce((n, p) => n + gz(p), 0)
  const route = '/' + page.replace(/\\/g, '/').replace(`${OUT}/`, '').replace(/index\.html$/, '')

  rows.push({
    route,
    html: gzipSync(Buffer.from(html)).length,
    js: sum(js),
    css: sum(css),
    fonts: sum(fonts),
    fontFiles: fonts.size,
    // Images are not gzipped — WebP is already compressed.
    img: [...imgs].reduce((n, p) => (existsSync(p) ? n + statSync(p).size : n), 0),
  })
}

rows.sort((a, b) => b.js + b.html - (a.js + a.html))

const pad = (s, n) => String(s).padEnd(n)
console.log(`\n  Cold load per route — gzipped (images as-is)\n`)
console.log(
  `  ${pad('route', 26)}${pad('html', 10)}${pad('js', 10)}${pad('css', 10)}${pad('fonts', 12)}${pad('img', 10)}total`,
)
console.log(`  ${'-'.repeat(84)}`)

for (const r of rows) {
  const total = r.html + r.js + r.css + r.fonts + r.img
  console.log(
    `  ${pad(r.route, 26)}${pad(kb(r.html), 10)}${pad(kb(r.js), 10)}${pad(kb(r.css), 10)}${pad(
      `${kb(r.fonts)} (${r.fontFiles})`,
      12,
    )}${pad(r.img ? kb(r.img) : '—', 10)}${kb(total)}`,
  )
}

const worst = rows.reduce((a, b) => (b.js > a.js ? b : a))
const fontMax = Math.max(...rows.map((r) => r.fonts))
const imgMax = Math.max(
  ...walk(join(OUT, 'plates')).map((p) => statSync(p).size),
  0,
)

const budgets = [
  ['JS shipped', 40 * 1024, worst.js, `worst route: ${worst.route}`],
  ['Fonts', 90 * 1024, fontMax, 'per cold load'],
  ['Largest image', 180 * 1024, imgMax, 'plates/'],
]

console.log(`\n  Budget vs actual\n`)
for (const [name, budget, actual, note] of budgets) {
  const ok = actual <= budget
  const flag = ok ? '\x1b[2mok\x1b[0m  ' : '\x1b[31mMISS\x1b[0m'
  console.log(
    `  ${pad(name, 18)}${pad(`< ${kb(budget)}`, 12)}${pad(kb(actual), 12)}${flag}  \x1b[2m${note}\x1b[0m`,
  )
}
console.log(
  `\n  \x1b[2mA missed budget stated honestly is stronger than a met budget nobody can see.\x1b[0m\n`,
)
