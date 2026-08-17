import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { site } from '../../lib/site';
import { getOgPages } from '../../lib/og';

/**
 * Per-page Open Graph cards, rendered at build time.
 *
 * satori turns an element tree into SVG, resvg rasterizes it to PNG. Both run
 * only during the build — nothing here ships to the browser.
 *
 * satori can't read woff2 (the format the site itself serves), so this loads
 * the .woff cut of the same Archivo family from @fontsource. Same typeface,
 * different container.
 */

const WIDTH = 1200;
const HEIGHT = 630;

// Matching the site's dark theme tokens from global.css.
const GROUND = '#0B1017';
const INK = '#E8EDF2';
const INK_MUTED = '#93A1B2';
const LINE = '#263140';
const COPPER = '#F0A94C';

/** Resolved relative to this file so it works regardless of cwd. */
const fontPath = (file: string) =>
  fileURLToPath(
    new URL(`../../../node_modules/@fontsource/archivo/files/${file}`, import.meta.url),
  );

const [regular, semibold] = await Promise.all([
  readFile(fontPath('archivo-latin-400-normal.woff')),
  readFile(fontPath('archivo-latin-600-normal.woff')),
]);

export const getStaticPaths = (async () => {
  const pages = await getOgPages();
  return pages.map((page) => ({
    params: { route: page.route },
    props: { page },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { page } = props as { page: { eyebrow: string; title: string } };

  // satori accepts a React-like element tree. Plain objects avoid needing JSX
  // in a .ts file, and keep the layout readable as a nested structure.
  const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
    type,
    props: { style, children },
  });

  const svg = await satori(
    el(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: GROUND,
        padding: '64px 72px',
        fontFamily: 'Archivo',
        // The site's signature line, echoed on the card so a shared link looks
        // like it came from the same place.
        borderTop: `6px solid ${COPPER}`,
      },
      [
        el('div', { display: 'flex', flexDirection: 'column' }, [
          el(
            'div',
            {
              display: 'flex',
              fontSize: 22,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: INK_MUTED,
              fontWeight: 400,
            },
            page.eyebrow,
          ),
          el(
            'div',
            {
              display: 'flex',
              marginTop: 28,
              fontSize: page.title.length > 60 ? 58 : 70,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: INK,
              fontWeight: 600,
            },
            page.title,
          ),
        ]),

        el(
          'div',
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
          },
          [
            el('div', { display: 'flex', fontSize: 28, color: INK, fontWeight: 600 }, site.name),
            el(
              'div',
              { display: 'flex', fontSize: 24, color: INK_MUTED, fontWeight: 400 },
              site.domain,
            ),
          ],
        ),
      ],
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Archivo', data: regular, weight: 400, style: 'normal' },
        { name: 'Archivo', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
