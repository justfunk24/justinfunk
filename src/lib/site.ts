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

  /** Certifications, in the order they should render. */
  certifications: [
    { name: 'Dialpad Contact Center & Agentic Delivery Partner', status: 'Certified' },
    { name: 'Selling Through Curiosity', status: 'Certified' },
    { name: 'Axiom Science of Consultative Selling', status: 'Certified' },
    { name: 'Python 3, Codecademy', status: 'Certified' },
  ],
} as const;

/* ----------------------------------------------------------------------------
   HOMEPAGE COPY

   The hero is a routing diagram: a reader's question comes in on the left and
   routes to the part of the site that answers it. Editing the wording below
   changes the hero — no component file involved.
   -------------------------------------------------------------------------*/

export const home = {
  /** The thesis. Not a tagline — a claim the rest of the page has to support.
   *  Opens with an opinion rather than a title, which is how Justin writes. */
  thesis:
    'In contact centers, the technology is almost never what fails. Adoption is. I build agentic AI environments where that fact decides whether they work.',

  /** The inbound call on the diagram — the question a reader actually arrives with. */
  inbound: 'Can he do this job?',

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
      value: 'Certified',
      label: 'Dialpad Contact Center & Agentic Delivery Partner',
      href: '/work/matrice',
    },
  ],

  /** The three routes. Each is a real destination in the nav. */
  routes: [
    {
      label: 'CX & Contact Center',
      href: '/work',
      detail: 'A decade across six companies, and the numbers behind each one.',
    },
    {
      label: 'Applied AI',
      href: '/projects',
      detail: 'Agentic builds on Zoom and Dialpad, plus what I write in code.',
    },
    {
      label: 'Background',
      href: '/about',
      detail: 'Credentials, certifications, and how I got here.',
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
