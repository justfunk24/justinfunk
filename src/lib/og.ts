import { getCaseStudies, getProjects } from './content';

/**
 * The authoritative list of social cards to generate.
 *
 * Base.astro derives each page's card URL from its own pathname, so this list
 * has to cover every route the site emits — a page missing from here would
 * point at a 404 in its Open Graph tags. The content-driven entries are pulled
 * from the same helpers the pages use, so new case studies, projects, and
 * posts get cards automatically.
 */

export interface OgPage {
  /** Route segment after /og/, without extension. '/' is 'index'. */
  route: string;
  /** Small monospace label above the title. */
  eyebrow: string;
  title: string;
}

/** Fixed pages. Keep in sync with src/pages/*.astro. */
const STATIC_PAGES: OgPage[] = [
  { route: 'index', eyebrow: 'Denver, Colorado', title: 'Enterprise CX, CCaaS & Applied AI' },
  { route: 'work', eyebrow: 'Work', title: 'The record, and the receipts behind it' },
  {
    route: 'projects',
    eyebrow: 'Build log',
    title: "What I've built, including the parts that aren't finished",
  },
  {
    route: 'about',
    eyebrow: 'About',
    title: 'A decade of watching good technology fail for non-technical reasons',
  },
  { route: 'resume', eyebrow: 'Resume', title: 'Justin Funk' },
  { route: 'contact', eyebrow: 'Contact', title: 'Two reasons people usually land here' },
  // Noindex, but Base still emits an og:image for it, so it needs a card.
  { route: 'thanks', eyebrow: 'Sent', title: "Got it. I'll come back to you shortly." },
];

export async function getOgPages(): Promise<OgPage[]> {
  const [studies, projects] = await Promise.all([getCaseStudies(), getProjects()]);

  return [
    ...STATIC_PAGES,
    ...studies.map((s) => ({
      route: `work/${s.id}`,
      eyebrow: `${s.data.company} · ${s.data.metric.value} ${s.data.metric.label}`,
      title: s.data.title,
    })),
    ...projects.map((p) => ({
      route: `projects/${p.id}`,
      eyebrow: `Build log · ${p.data.stack.slice(0, 3).join(' · ')}`,
      title: p.data.title,
    })),
  ];
}

/** Maps a page pathname to its generated card path. Mirrors the route shapes
 *  produced above so Base.astro and this module can't disagree. */
export function ogPathFor(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? '/og/index.png' : `/og${clean}.png`;
}
