import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
// Imported from 'astro/zod' rather than re-exported from 'astro:content',
// which is deprecated. Same zod instance Astro validates with.
import { z } from 'astro/zod';

/* ============================================================================
   CONTENT COLLECTIONS

   Every word, number, and date on this site comes from this directory. Adding
   a job, a platform, a case study, a project, or a post is a content edit —
   no .astro file should ever need to change for it.

   The schemas below are strict on purpose. If a required field is missing or
   misspelled, the build fails with the file name and the field name rather
   than silently rendering a blank. That's the safety net that makes editing
   content directly a reasonable thing to do.
   ========================================================================= */

/** The four lenses a reader might evaluate Justin through. A role in any one
 *  of these should be able to see its own thread through his history, which is
 *  what the /work timeline filter does. Every career entry tags at least one. */
export const LENSES = [
  'cx-customer-success',
  'sales-enablement',
  'applied-ai',
  'revenue-ownership',
] as const;

export const LENS_LABELS: Record<(typeof LENSES)[number], string> = {
  'cx-customer-success': 'CX & Customer Success',
  'sales-enablement': 'Sales Enablement',
  'applied-ai': 'Applied AI',
  'revenue-ownership': 'Revenue Ownership',
};

const lens = z.enum(LENSES);

/** "YYYY-MM". Kept as a string rather than a Date because month precision is
 *  all a resume needs, and a Date would invite a timezone bug that shifts a
 *  start date into the previous month. */
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected a "YYYY-MM" date, e.g. "2019-04"');

/* --- Career ---------------------------------------------------------------
   Single source of truth for BOTH the /work timeline and the /resume page.
   The brief is explicit that these must not drift, so there is exactly one
   file and both pages read it.
   -------------------------------------------------------------------------*/

const career = defineCollection({
  loader: file('src/content/career.json'),
  schema: z.object({
    /** Stable slug, used as the anchor target from the timeline. */
    id: z.string(),
    company: z.string(),
    role: z.string(),
    location: z.string(),
    start: yearMonth,
    /** null means "current". Exactly one entry should have this. */
    end: yearMonth.nullable(),
    /** Which lenses this role speaks to. Drives the timeline filter. */
    lenses: z.array(lens).min(1),
    /** One or two sentences. What the job actually was. */
    summary: z.string(),
    /** Resume bullets. Each should be verifiable — a number, a system, a name. */
    highlights: z.array(z.string()).min(1),
    /** Optional link to the case study that goes deeper on this role. */
    caseStudy: reference('caseStudies').optional(),

    /** Fields Justin still needs to confirm before this is publishable as
     *  fact. Anything listed here renders with a visible "unconfirmed" marker
     *  in dev and is reported by `npm run content:check`. Empty array = the
     *  entry has been reviewed and every claim in it is verified. */
    unverified: z.array(z.string()).default([]),
  }),
});

/* --- Platforms ------------------------------------------------------------
   Feeds the platform fluency matrix. The `tier` field is the whole point: the
   distinction between what he has built on and what he can speak to is the
   site's central credibility move. Promoting a platform is a one-line edit.
   -------------------------------------------------------------------------*/

const platforms = defineCollection({
  loader: file('src/content/platforms.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    /** 'hands-on'   — Justin has personally built, configured, or administered this.
     *  'familiarity' — He can evaluate and speak to it, but has not built on it. */
    tier: z.enum(['hands-on', 'familiarity']),
    category: z.enum(['ccaas', 'ucaas', 'enablement', 'crm']),
    /** Shown when the platform is selected. For hands-on entries this must
     *  describe specific work. For familiarity entries it should say plainly
     *  what the exposure was, without inflating it. */
    detail: z.string(),
    /** Where the reader can verify it. Optional, but a hands-on claim without
     *  one is weaker — prefer linking every hands-on entry to something. */
    evidence: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
    unverified: z.array(z.string()).default([]),
  }),
});

/* --- Case studies ---------------------------------------------------------
   Situation -> What I did -> Outcome, with the metric as the headline.
   -------------------------------------------------------------------------*/

const caseStudies = defineCollection({
  loader: glob({ base: 'src/content/case-studies', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    /** The headline number. This is what a skimming reader takes away, so it
     *  carries the weight — keep it short enough to read at a glance. */
    metric: z.object({
      value: z.string(),
      label: z.string(),
    }),
    /** One sentence, used on the index card and in the meta description. */
    summary: z.string(),
    period: z.string(),
    lenses: z.array(lens).min(1),
    /** Platform ids referenced by this study, for the matrix cross-links. */
    platforms: z.array(z.string()).default([]),
    order: z.number(),
    /** Draft studies are excluded from production builds but visible in dev,
     *  so the four stubs can sit in the repo without shipping half-written. */
    draft: z.boolean().default(false),
    updated: z.date().optional(),
    unverified: z.array(z.string()).default([]),
  }),
});

/* --- Projects -------------------------------------------------------------
   The build log. `status` exists so work in progress can go up honestly
   instead of waiting for polish.
   -------------------------------------------------------------------------*/

const projects = defineCollection({
  loader: glob({ base: 'src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        /** The problem it solved. Stated before the stack, because the problem
         *  is what makes the stack interesting. */
        problem: z.string(),
        stack: z.array(z.string()).min(1),
        status: z.enum(['shipped', 'in-progress', 'experiment']),
        repo: z.string().optional(),
        demo: z.string().optional(),
        /** Runs through Astro's image pipeline, so it is served as WebP/AVIF at
         *  the right size. `alt` is required by the schema, not by convention. */
        cover: image().optional(),
        coverAlt: z.string().optional(),
        date: z.date(),
        draft: z.boolean().default(false),
      })
      // A cover image without alt text is an accessibility failure, so make it a
      // build error rather than something to catch in review.
      .refine((p) => !p.cover || (p.coverAlt && p.coverAlt.length > 0), {
        message: 'A project with a `cover` image must also set `coverAlt`.',
        path: ['coverAlt'],
      }),
});

/* --- Recommendations ------------------------------------------------------
   Short quotes from named colleagues. `permission` is required and must be
   true to render — a quote cannot ship until someone has actually said yes.
   -------------------------------------------------------------------------*/

const recommendations = defineCollection({
  loader: file('src/content/recommendations.json'),
  schema: z.object({
    id: z.string(),
    quote: z.string(),
    name: z.string(),
    title: z.string(),
    company: z.string(),
    /** Written permission to publish. The /about page filters on this, so a
     *  quote sitting in the file without permission simply does not render. */
    permission: z.boolean(),
    source: z.string().optional(),
  }),
});

export const collections = {
  career,
  platforms,
  caseStudies,
  projects,
  recommendations,
};
