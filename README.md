# Aditya Srinivas

Personal portfolio. Final-year B.E. Information Science & Engineering at Atria Institute of
Technology, Bangalore, graduating May 2027.

I build the layer underneath the thing everyone else is looking at — compilers, collectors,
gateways, verifiers — and then I measure whether it actually worked. Several of the results on
this site went against me. Those are the ones worth keeping.

**Live:** [aditya2k5here.github.io/portfolio](https://aditya2k5here.github.io/portfolio/)

**One-page version, for recruiters:** [aditya2k5here.github.io/hr-portfolio](https://aditya2k5here.github.io/hr-portfolio/)

---

## Get in touch

I read everything and reply properly, including a no.

| | |
|---|---|
| Email | adityasrinivasofficial@gmail.com |
| LinkedIn | [aditya-srinivas3](https://linkedin.com/in/aditya-srinivas3) |
| GitHub | [Aditya2k5here](https://github.com/Aditya2k5here) |
| LeetCode | [aditya-srinivas3](https://leetcode.com/u/aditya-srinivas3) |
| Phone | +91 99724 52243 |
| Location | Bangalore, India |

Open to internships, full-time roles in software, AI/ML, data, analytics, QA and business
analysis, and to interesting collaborations.

---

## What's on the site

| Project | | |
|---|---|---|
| **Dermora AI** | A skin lesion classifier that knows when to stay quiet | [code](https://github.com/Aditya2k5here/skin-lesion-classifier) |
| **Hotpath** | A regex engine that writes x86-64 at runtime, and knows when not to | [code](https://github.com/Aditya2k5here/hotpath) |
| **TerraHawk** | Verification infrastructure for physical claims. Co-founder | |
| **Riches Garden** | A live festival site, and the features I talked the committee out of | [live](https://riches-garden-ganeshothsava.vercel.app/) |
| **AI Lifestyle Mirror** | Vision, voice and memory on one surface | [code](https://github.com/Aditya2k5here/smart-mirror) |
| **Halflife-GC** | A garbage collector that predicts object lifetimes before allocation | [code](https://github.com/Aditya2k5here/halflife-gc) |
| **RaftFuzz** | Finds the schedule that breaks consensus, then shrinks it | [code](https://github.com/Aditya2k5here/counterexample) |
| **NNVerify** | A neural network verifier that never answers "I don't know" | [code](https://github.com/Aditya2k5here/envelope) |
| **LoadShed** | An API gateway that decides what to fail under overload | [code](https://github.com/Aditya2k5here/ballast) |

**Published:** *Digital Heritage Preservation Technologies for Monasteries of Sikkim*, first
author of five — Advancement in Image Processing and Pattern Recognition, 2026.
[DOI](https://doi.org/10.5281/zenodo.19413268)

---

## Running it

```bash
npm install
npm run dev
```

| script | does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | static export to `out/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | eslint |

Next.js 16, React 19, TypeScript, Tailwind CSS v4. Static export — no server, no database, no
third-party scripts. Two typefaces, self-hosted.

## Layout

```
app/            routes, global stylesheet
components/     one file per section, plus the hero interactions
content/        every fact on the site lives here, nowhere else
public/         hero artwork, portrait, documents
hr/             a separate short-form build for recruiters
```

Every number on the site is transcribed from the project's own results file, or from a run
recorded with its date. Nothing is rounded up.
