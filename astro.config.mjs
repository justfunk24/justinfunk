// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Astro's HTML minifier strips the newline between a text node and an
  // adjacent tag, which the browser would have rendered as a space — turning
  // "the <a>work page</a>" into "thework page". It shipped four of those to
  // production before anyone caught it. The few bytes it saves are not worth
  // silently corrupting copy, and Netlify compresses the response anyway.
  compressHTML: false,

  // `site` is required for sitemap.xml, canonical URLs, and absolute OG image
  // URLs to generate correctly. Netlify deploy previews override it via env.
  site: process.env.SITE_URL ?? 'https://justinfunk.ai',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // Keep utility routes out of search results. They're linked from the
      // site itself, so crawlers still reach them if they matter.
      filter: (page) => !page.includes('/thanks'),
    }),
  ],
});
