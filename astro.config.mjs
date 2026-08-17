// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
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
