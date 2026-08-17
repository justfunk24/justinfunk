# justinfunk.ai

Personal site and professional portfolio for Justin Funk — enterprise CX, CCaaS, UCaaS, and applied AI.

Built with [Astro](https://astro.build), Tailwind CSS 4, and TypeScript. Deployed on Netlify from `main`.

---

## The one rule

**You edit content, never components.** Every word, number, date, and platform on this site lives in `src/content/`. Changing a job title, adding a project, or promoting a platform should never require opening a `.astro` file.

If you find yourself needing to edit a component to change what the site _says_, that's a bug — the content schema needs a new field instead.

---

## Running it locally

You need Node 22 or newer. It's installed via [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use 22
```

Then:

```bash
npm install
```

```bash
npm run dev
```

That starts the dev server at http://localhost:4321. **Drafts are visible in dev and stripped from the production build**, so you can leave half-written work in the repo safely.

Before pushing, run everything at once:

```bash
npm run verify
```

That checks formatting, lints, type-checks the content schemas, and does a production build. If it passes, the deploy will too.

### All the commands

| Command            | What it does                             |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Dev server with drafts visible           |
| `npm run build`    | Production build into `dist/`            |
| `npm run preview`  | Serve the production build locally       |
| `npm run verify`   | Format check + lint + type check + build |
| `npm run format`   | Auto-format everything                   |
| `npm run lint:fix` | Auto-fix what ESLint can                 |

---

## How to add things

### Add a writing post

1. Copy an existing file in `src/content/writing/` to a new name. The filename becomes the URL: `the-line-nobody-draws.md` → `/writing/the-line-nobody-draws`.
2. Edit the frontmatter at the top:

```yaml
---
title: Your title
date: 2026-08-20
hook: The opening line. Leads with an opinion or a scene, never a statistic.
tags:
  - ccaas
question: The question you end on.
linkedinUrl: https://www.linkedin.com/posts/... # optional
linkedinEmbedId: '7012345678901234567' # optional, see below
draft: false # set true to hide it
---
```

3. Write the post below the frontmatter in Markdown.
4. Commit and push. Netlify deploys in about a minute.

**About `linkedinEmbedId`:** only use it when the LinkedIn thread itself is worth showing — a good comment section. It's the long number from the post's URL. The embed is lazy-loaded and the page reads fine without it.

### Add a project

Copy a file in `src/content/projects/`. Required frontmatter: `title`, `summary`, `problem`, `stack` (a list), `status` (`shipped`, `in-progress`, or `experiment`), and `date`. Optional: `repo`, `demo`, `cover` + `coverAlt`.

Ship things as `in-progress`. Waiting for polish is how a build log dies.

For a screenshot: put the image in `src/assets/`, then add both `cover: ../../assets/your-image.png` and `coverAlt: "A real description"`. The build **fails** if you add a cover without alt text — that's deliberate.

### Add or edit a case study

Files live in `src/content/case-studies/`. `src/content/case-studies/matrice.md` is the fully-written one — copy its shape.

The structure is **Situation → What I did → Outcome**, 400–700 words, with the metric as the headline. Set `draft: true` until the copy is real; drafts don't ship.

### Change a job, or add one

Edit `src/content/career.json`. This one file feeds **both** the `/work` timeline and the `/resume` page, so they can't drift apart.

Each entry needs `lenses` — which of the four reader perspectives the role speaks to (`cx-customer-success`, `sales-enablement`, `applied-ai`, `revenue-ownership`). That's what the timeline filter uses.

**The `unverified` field:** list any field you haven't confirmed yet, e.g. `["role", "start", "end"]`. Those entries show a visible "Unconfirmed" marker in dev so you can't forget about them. Empty the array once you've checked it. See [Things that still need you](#things-that-still-need-you).

### Add a platform, or promote one

Edit `src/content/platforms.json`. Moving a platform from landscape familiarity to hands-on is a one-line change:

```json
"tier": "hands-on"
```

Only do that when it's true. The honesty of that line is the most valuable thing on the site — the whole platform matrix is built to make the distinction visible, and it stops meaning anything the moment it's inflated.

### Add a recommendation quote

Edit `src/content/recommendations.json`. **A quote only renders when `permission: true`.** Until the person has actually said yes in writing, leave it `false` and it stays invisible.

### Update /now

Edit `src/pages/now.astro`. It's the one page where the copy lives in the page file, because it's three short lists and a date. **Update the `updated` date whenever you change it** — a stale `/now` page is worse than none.

---

## Things that still need you

These are marked `PLACEHOLDER` in the files and will show up if you search the repo for that word.

- [ ] **Career dates and titles.** Every entry in `career.json` has an `unverified` list. The dates and job titles are my best inference from the brief and are almost certainly wrong in places — the _achievements_ are from your brief and should be right.
- [ ] **The RingCentral tenures.** I guessed at the sequence and what each one covered. Two of the three are mostly placeholder.
- [ ] **Case study copy.** Four of five are stubs marked `draft: true`. Matrice is written in full as the pattern — but its **Outcome** section still needs your real numbers.
- [ ] **Gong.** It's listed as hands-on with a placeholder description. Either fill it in or move it to familiarity.
- [ ] **GitHub username and LinkedIn URL** in `src/lib/site.ts`.
- [ ] **Resume PDF** at `public/justin-funk-resume.pdf`.
- [ ] **Recommendation quotes** and written permission for each.
- [ ] **A headshot** and any Matrice build screenshots or architecture diagrams.
- [ ] **Scheduling link** — set `scheduling` in `src/lib/site.ts` and the option appears on `/contact` automatically.

---

## How it's put together

```
src/
  content/            ← everything you edit
    career.json         one source for the timeline AND the resume
    platforms.json      the fluency matrix, with the tier field
    recommendations.json
    case-studies/
    projects/
    writing/
  content.config.ts   ← the schemas. Strict on purpose: a missing field
                        fails the build and tells you which file.
  components/         ← the interactive pieces
    PatchPanel.astro    the platform matrix. The signature element.
    Timeline.astro      lens-filtered career timeline
    RoutingHero.astro   the call-flow hero
  layouts/Base.astro  ← <head>, SEO, JSON-LD, theme handling
  lib/
    site.ts             site-wide config and homepage copy
    content.ts          sorting, draft filtering, date formatting
    og.ts               the list of social cards to generate
  pages/              ← routes
  styles/global.css   ← the design tokens. All color lives here.
```

### Design notes

The visual language is a **technical schematic** — a deployment diagram, not a magazine. Content sits on a measured grid, connectors turn at right angles, and metadata is annotated in monospace like callouts on a drawing.

**Boldness is spent in exactly one place**: the platform matrix, built as a patch panel. Hands-on platforms are ports with a cable seated; familiarity platforms are empty sockets. Everything else on the site stays quiet so that reads as the memorable element.

Colors are six tokens in `src/styles/global.css`, defined once and swapped per theme. Both light and dark are designed, not inverted. **Copper is the scarcity accent** — it marks only two things site-wide, a patched platform and the current role. It stops meaning anything if it gets used for decoration.

### Fonts

Self-hosted and latin-subset in `public/fonts/` (~116KB total): Archivo for display, IBM Plex Sans for body, IBM Plex Mono for annotations. Nothing loads from Google.

To refresh them after a package update:

```bash
cp node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2 public/fonts/archivo-var-latin.woff2
```

The other three follow the same pattern — see the paths in `src/styles/global.css`.

### Social cards

Generated per page at build time by `src/pages/og/[...route].png.ts` using satori. New case studies, projects, and posts get one automatically. Fixed pages are listed in `src/lib/og.ts` — **if you add a new fixed page, add it there too**, or its Open Graph tag will point at a 404.

---

## Deploying

Push to `main`. Netlify builds and deploys. Pull requests get deploy previews, which are set to `noindex` so they never compete with the real site in search.

Configuration is in `netlify.toml`. The contact form is Netlify Forms with a honeypot — submissions land in the Netlify dashboard under Forms.

### Environment variables

Copy `.env.example` to `.env` for local work. Real values go in the Netlify UI, never in the repo.

Analytics stays off until **both** `PUBLIC_ANALYTICS_DOMAIN` and `PUBLIC_ANALYTICS_SRC` are set, so it never runs in development and needs no cookie banner.

---

## Quality floor

Non-negotiable, and worth re-checking when you change layout:

- Responsive down to 375px
- Visible keyboard focus on everything interactive
- `prefers-reduced-motion` respected
- WCAG AA contrast in both themes
- Alt text on every image (enforced by the schema for project covers)
- Semantic heading hierarchy

A site claiming CX expertise that fails accessibility argues against itself.
