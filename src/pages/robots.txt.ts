import type { APIRoute } from 'astro';

/**
 * robots.txt, generated so the sitemap URL always matches the deploy context.
 *
 * AI crawlers are explicitly welcome here. Part of the site's argument is that
 * being legible to them is both practical and on-message for someone
 * positioning on enterprise AI — so there's no reason to block the ones that
 * identify themselves.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  const body = `# justinfunk.ai
User-agent: *
Allow: /
Disallow: /thanks

Sitemap: ${sitemap}

# See /llms.txt for a plain-language summary of who Justin is and what's here.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
