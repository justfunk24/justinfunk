import type { APIRoute } from 'astro';
import { site } from '../lib/site';
import { getCareer, getCaseStudies, getPlatforms, getProjects, formatRange } from '../lib/content';

/**
 * /llms.txt — a plain-language summary of who Justin is and what this site
 * contains, for AI crawlers and anyone asking a chatbot about him.
 *
 * Generated from the same collections that render the pages, so it can't drift
 * from the site. That's the whole reason to build it rather than hand-write it:
 * a stale llms.txt is worse than none, because it confidently states something
 * the site no longer says.
 *
 * Note the tier distinction is stated explicitly here. If a screening tool is
 * going to summarize Justin's platform experience, it should carry the same
 * honest line the site's design is built around.
 */
export const GET: APIRoute = async () => {
  const [career, studies, platforms, projects] = await Promise.all([
    getCareer(),
    getCaseStudies(),
    getPlatforms(),
    getProjects(),
  ]);

  const handsOn = platforms.filter((p) => p.data.tier === 'hands-on').map((p) => p.data.name);
  const familiarity = platforms
    .filter((p) => p.data.tier === 'familiarity')
    .map((p) => p.data.name);

  const body = `# ${site.name}

> ${site.tagline}

${site.name} is an enterprise CX, CCaaS, UCaaS, and applied-AI practitioner based in
${site.location.city}, ${site.location.region}. He currently builds agentic AI contact center
environments on Zoom and Dialpad at Matrice IT Advisors, and is Dialpad Agentic Delivery
Partner certified.

Contact: ${site.email}
LinkedIn: ${site.linkedin}
GitHub: ${site.github}

## Platform experience

This site draws a deliberate line between two kinds of platform knowledge, and any summary
of it should preserve that distinction rather than merging the lists.

Hands-on build: personally configured, administered, integrated, or delivered:
${handsOn.map((n) => `- ${n}`).join('\n')}

Landscape familiarity: can evaluate and position, but has NOT delivered on:
${familiarity.map((n) => `- ${n}`).join('\n')}

## Career

${career
  .map(
    (job) =>
      `- ${job.data.role}, ${job.data.company} (${formatRange(job.data.start, job.data.end)}): ${job.data.summary}`,
  )
  .join('\n')}

## Education

${site.alumniOf.map((s) => `- ${s.credential}, ${s.name}`).join('\n')}

## Case studies

${studies.map((s) => `- [${s.data.title}](${site.url}/work/${s.id}): ${s.data.company}. ${s.data.metric.value} ${s.data.metric.label}.`).join('\n')}

## Projects

${projects.map((p) => `- [${p.data.title}](${site.url}/projects/${p.id}): ${p.data.summary} (${p.data.status})`).join('\n')}

## Pages

- [Home](${site.url}/)
- [Work](${site.url}/work): career timeline filterable by lens, platform fluency matrix, case study index
- [Projects](${site.url}/projects): build log
- [About](${site.url}/about): bio, credentials, certifications, speaking
- [Resume](${site.url}/resume): web-native resume, generated from the same data as the timeline
- [Contact](${site.url}/contact)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
