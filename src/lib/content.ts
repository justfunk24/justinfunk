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

/** Split a quote into an opening preview and the remainder, so a long
 *  recommendation can lead with a couple of sentences and hide the rest
 *  behind a disclosure.
 *
 *  The split lands on a sentence boundary rather than a character count, so
 *  the preview never ends mid-clause. Quotes shorter than `floor` are returned
 *  whole with an empty remainder — collapsing three sentences behind a "read
 *  more" costs the reader a click and saves nothing.
 */
export function splitQuote(
  quote: string,
  { target = 190, floor = 330 } = {},
): { preview: string; rest: string[] } {
  const paragraphs = quote
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  if (quote.length <= floor) return { preview: paragraphs.join(' '), rest: [] };

  const [first, ...others] = paragraphs;
  // Keep the delimiter attached to the sentence it ends.
  const sentences = first.split(/(?<=[.!?])\s+/);

  const taken: string[] = [];
  let length = 0;
  for (const sentence of sentences) {
    // Stop once we're past target — but always take at least one sentence,
    // or a quote opening with a very long first sentence would preview empty.
    if (length >= target && taken.length > 0) break;
    taken.push(sentence);
    length += sentence.length;
  }

  const remainder = sentences.slice(taken.length).join(' ').trim();
  const rest = [remainder, ...others].filter(Boolean);

  // If the split left nothing meaningful behind, don't render a disclosure.
  if (rest.join(' ').length < 60) return { preview: paragraphs.join(' '), rest: [] };

  return { preview: taken.join(' '), rest };
}

/** Only quotes with explicit written permission are ever returned. A quote
 *  sitting in the JSON without `permission: true` simply doesn't render. */
export async function getRecommendations() {
  const recs = await getCollection('recommendations', ({ data }) => data.permission === true);
  return recs.sort((a, b) => a.data.order - b.data.order);
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
  return `${formatYearMonth(start)} to ${end ? formatYearMonth(end) : 'Present'}`;
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
