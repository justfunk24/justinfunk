/**
 * Generates public/justin-funk-resume.pdf by printing the built /resume page.
 *
 * The PDF is a render of the site, not a separate document — both come from
 * career.json, so the download cannot fall out of sync with the web version.
 * That is the whole reason this exists rather than a hand-maintained file.
 *
 * The page is served over HTTP rather than opened as a file:// URL. Astro
 * emits absolute asset paths (/_astro/…), which a file:// origin resolves
 * against the filesystem root — the stylesheet silently fails to load and the
 * PDF comes out as unstyled HTML.
 *
 * Usage: npm run resume:pdf
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DIST = resolve('dist');
const OUT = resolve('public/justin-funk-resume.pdf');

const TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
};

if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}\nSet CHROME_PATH to override.`);
  process.exit(1);
}
if (!existsSync(join(DIST, 'resume', 'index.html'))) {
  console.error('dist/resume/index.html missing — run `npm run build` first.');
  process.exit(1);
}

mkdirSync(resolve('public'), { recursive: true });

const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join(DIST, path);
  // Guard against a crafted path escaping dist/.
  if (!file.startsWith(DIST)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

server.listen(0, '127.0.0.1', () => {
  const { port } = server.address();
  const args = [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    // Give webfonts and layout time to settle; without it Chrome can print
    // before the self-hosted fonts have applied.
    '--virtual-time-budget=8000',
    `--print-to-pdf=${OUT}`,
    `http://127.0.0.1:${port}/resume/`,
  ];

  const chrome = spawn(CHROME, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  let stderr = '';
  chrome.stderr.on('data', (d) => (stderr += d));
  chrome.on('close', (code) => {
    server.close();
    if (code !== 0 || !existsSync(OUT)) {
      console.error(`Chrome exited ${code}\n${stderr}`);
      process.exit(1);
    }
    console.log(`Wrote ${OUT} (${(statSync(OUT).size / 1024).toFixed(1)} KB)`);
  });
});
