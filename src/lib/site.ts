/* ============================================================================
   SITE CONFIGURATION

   Everything here is content, not code. Names, links, nav order, and the
   default social card text all live in this one file so none of it has to be
   hunted for across components.
   ========================================================================= */

export const site = {
  name: 'Justin Funk',
  domain: 'justinfunk.ai',
  url: 'https://justinfunk.ai',

  /** Used in the <title> suffix and the JSON-LD Person `jobTitle`. */
  role: 'Agentic AI & Enterprise CX',

  /** The full positioning line, as it reads at the top of the resume. */
  positioning:
    'Agentic AI Deployment & Success · Enterprise CX, CCaaS & UCaaS · Contact Center AI Builder',

  /** The one-sentence version, used as the default meta description. */
  tagline:
    'Enterprise CX and cloud communications professional with 10+ years in UCaaS and CCaaS, now building and deploying agentic AI for the contact center on Zoom and Dialpad.',

  location: {
    city: 'Denver',
    region: 'CO',
    country: 'US',
  },

  email: 'justfunk24@gmail.com',

  linkedin: 'https://www.linkedin.com/in/funkjustin',

  /** Also feeds `sameAs` in the Person schema, which is how a search engine
   *  or an AI tool confirms this site and that profile are the same person. */
  github: 'https://github.com/justfunk24',

  /** PLACEHOLDER — Calendly or similar. Leave null and /contact simply
   *  doesn't render the scheduling option. */
  scheduling: null as string | null,

  /** Filename of the resume PDF in /public. Manually maintained — export from
   *  the Word original and drop it in with this name. */
  resumePdf: '/justin-funk-resume.pdf',

  /** Feeds the JSON-LD `knowsAbout` array. These are the terms an AI screening
   *  tool is most likely to match against, so they're stated plainly. */
  knowsAbout: [
    'Agentic AI Design & Deployment',
    'Contact Center AI',
    'Customer Experience',
    'CCaaS',
    'UCaaS',
    'Contact Center Transformation',
    'Customer Success & Adoption',
    'Sales Enablement',
    'Prompt Engineering',
  ],

  alumniOf: [
    { name: 'University of Denver', credential: 'MBA', year: '2020' },
    { name: 'University of Oklahoma', credential: 'BA, Communication', year: '2010' },
  ],

  /** Systems Justin has administered or delivered with that aren't CCaaS,
   *  UCaaS, or enablement platforms — so they belong on the resume rather than
   *  in the platform matrix, which is deliberately narrow. */
  otherSystems: {
    administration: [
      'Salesforce',
      'Gong',
      'Highspot',
      'Docebo',
      'Atlassian',
      'Airtable',
      'Expandi',
    ],
    delivery: ['Tableau (dashboards & access management)', 'Asana (cross-functional coordination)'],
    ai: ['Agentic AI development', 'LLM application', 'Prompt engineering', 'Python'],
  },

  /** Certifications, in the order they should render — most significant first,
   *  which is not the same as most recent.
   *
   *  `earned` is "YYYY-MM-DD", "YYYY-MM", or bare "YYYY" — whatever precision
   *  is actually known. All three sort correctly against each other as plain
   *  strings, and a vaguer value sorts before a more precise one in the same
   *  period, which is the conservative reading when comparing them.
   *
   *  It drives the "latest certification" card on the homepage, and is kept
   *  separate from array position so the sidebar can lead with the credential
   *  that matters most while the homepage shows the newest. null means the date
   *  isn't recorded — those are skipped when working out which is latest, so
   *  filling one in later can only improve the answer, never break it. */
  certifications: [
    {
      name: 'Zoom ZCX/ZVA AI Deployment',
      status: 'Certified',
      earned: '2026-08-17' as string | null,
    },
    {
      name: 'Dialpad Contact Center & Agentic Delivery Partner',
      status: 'Certified',
      earned: '2026-07' as string | null,
    },
    { name: 'Selling Through Curiosity', status: 'Certified', earned: '2017-04' as string | null },
    {
      name: 'Axiom Science of Consultative Selling',
      status: 'Certified',
      // Year only — the month isn't recorded, and asserting one would be a
      // precision the source doesn't have.
      earned: '2013' as string | null,
    },
    { name: 'Python 3, Codecademy', status: 'Certified', earned: '2026-08' as string | null },
  ],
} as const;

/* ----------------------------------------------------------------------------
   HOMEPAGE COPY

   The thesis and the proof numbers. Editing them here changes the homepage —
   no component file involved.
   -------------------------------------------------------------------------*/

export const home = {
  /** The line under the name and role on the homepage.
   *
   *  The role line above it already says "Agentic AI & Enterprise CX", so this
   *  has to earn its place by adding what a job title can't: the combination
   *  of a decade of CX domain depth and the hands-on skill to build the AI now
   *  reshaping that field. Naming the platforms keeps it checkable — the
   *  platform matrix backs it up. */
  thesis:
    'A decade in enterprise CX, now building the AI reshaping it — agentic contact center environments on Zoom and Dialpad.',

  /** The proof strip. Five hard numbers, each pointing at the thing that
   *  substantiates it. A number without an `href` renders as plain text —
   *  which is the honest fallback while a case study is still being written,
   *  and a nudge to go write it. */
  proof: [
    { value: '$30M+', label: 'ARR portfolio at AT&T', href: null },
    { value: '400+', label: 'sellers enabled at Twilio', href: '/work/twilio' },
    { value: '60%', label: 'YoY support ticket reduction', href: '/work/twilio' },
    { value: '108%', label: 'MBO at 9.7 NPS, RingCentral', href: '/work/ringcentral' },
    {
      value: '2',
      // Links to /about rather than a case study: that page lists both
      // certifications, and a claim should land where it can be checked.
      label: 'platform AI delivery certifications — Zoom and Dialpad',
      href: '/about',
    },
  ],
} as const;

/** Persistent top nav. Order is the order it renders. */
export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
] as const;

/** Analytics is opt-in via env so it never runs in development. Both vars must
 *  be set for the script to render — see .env.example. */
export const analytics = {
  domain: import.meta.env.PUBLIC_ANALYTICS_DOMAIN as string | undefined,
  src: import.meta.env.PUBLIC_ANALYTICS_SRC as string | undefined,
};
