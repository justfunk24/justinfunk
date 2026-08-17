import { getCollection, type CollectionEntry } from 'astro:content';

/* ============================================================================
   CONTENT HELPERS

   Two jobs: hide drafts in production (but show them in dev, so work in
   progress is visible while writing), and keep sorting rules in one place so
   the homepage, index pages, and resume can't disagree about ordering.
   ========================================================================= */

/** Drafts render in `npm run dev` and are stripped from `npm run build`. */
const showDrafts = import.meta.env.DEV;

const isPublished = (entry: { data: { draft?: boolean } }) => showDrafts || !entry.data.draft;

/* --- Case studies --------------------------------------------------------*/

export async function getCaseStudies(): Promise<CollectionEntry<'caseStudies'>[]> {
  const studies = await getCollection('caseStudies', isPublished);
  return studies.sort((a, b) => a.data.order - b.data.order);
}

/** Paths of case studies that will actually exist in this build. Used to avoid
 *  linking to a draft study from the platform matrix or the timeline, which
 *  would 404 in production while working fine in dev. */
export async function getPublishedCaseStudyPaths(): Promise<Set<string>> {
  const studies = await getCaseStudies();
  return new Set(studies.map((s) => `/work/${s.id}`));
}

/* --- Projects ------------------------------------------------------------*/

export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', isPublished);
  // Newest first.
  return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/* --- Writing -------------------------------------------------------------*/

export async function getPosts(): Promise<CollectionEntry<'writing'>[]> {
  const posts = await getCollection('writing', isPublished);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/* --- Career --------------------------------------------------------------*/

export async function getCareer(): Promise<CollectionEntry<'career'>[]> {
  const career = await getCollection('career');
  // Most recent first. A null `end` means current, which always sorts to top.
  return career.sort((a, b) => {
    if (a.data.end === null) return -1;
    if (b.data.end === null) return 1;
    return b.data.start.localeCompare(a.data.start);
  });
}

/* --- Platforms -----------------------------------------------------------*/

export async function getPlatforms(): Promise<CollectionEntry<'platforms'>[]> {
  const platforms = await getCollection('platforms');
  // Hands-on first, then alphabetical inside each tier. The tier ordering is
  // deliberate: the matrix should read as "here's what I've built" before
  // "here's what I can speak to".
  return platforms.sort((a, b) => {
    if (a.data.tier !== b.data.tier) return a.data.tier === 'hands-on' ? -1 : 1;
    return a.data.name.localeCompare(b.data.name);
  });
}

/* --- Recommendations -----------------------------------------------------*/

/** Only quotes with explicit written permission are ever returned. A quote
 *  sitting in the JSON without `permission: true` simply doesn't render. */
export async function getRecommendations() {
  return getCollection('recommendations', ({ data }) => data.permission === true);
}

/* --- Formatting ----------------------------------------------------------*/

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2019-04" -> "Apr 2019". Parsed manually rather than through Date to avoid
 *  the timezone shift that turns an early-month date into the month before. */
export function formatYearMonth(value: string): string {
  const [year, month] = value.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** "Apr 2019 — Present", as shown on the timeline and resume. */
export function formatRange(start: string, end: string | null): string {
  return `${formatYearMonth(start)} — ${end ? formatYearMonth(end) : 'Present'}`;
}

/** Whole months between two YYYY-MM values, inclusive of the start month. */
function monthsBetween(start: string, end: string | null): number {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  return (ey - sy) * 12 + (em - sm) + 1;
}

/** "1 yr 8 mos" — the resume convention. */
export function formatDuration(start: string, end: string | null): string {
  const total = monthsBetween(start, end);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years === 1 ? '' : 's'}`);
  if (months) parts.push(`${months} mo${months === 1 ? '' : 's'}`);
  return parts.join(' ') || '1 mo';
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
