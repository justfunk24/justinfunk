---
title: justinfunk.ai
summary: This site. Built with Astro so that every job, platform, and case study is a content file rather than something buried in code.
problem: >-
  I wanted a site I could actually maintain — where updating a job title or
  adding a case study is a one-file edit, and where the resume and the timeline
  can't drift apart because they read from the same data.
stack:
  - Astro
  - TypeScript
  - Tailwind CSS
  - Netlify
status: in-progress
repo: https://github.com/PLACEHOLDER/justinfunk.ai
date: 2026-08-16
draft: false
---

## How it's built

Everything the site says lives in `src/content/` — JSON for career and platform data, Markdown for case studies. The page templates read from those files, so changing what the site says never means editing a component. If a required field is missing, the build fails and names the file, which makes editing content directly a safe thing to do rather than a nervous one.

The career data does double duty: the `/work` timeline and the `/resume` page both read the same JSON, so they can't disagree with each other.

## The platform matrix

The piece I'd point at is the fluency matrix on the work page. Platforms I've built on show as ports with a cable plugged in; platforms I know well enough to evaluate but haven't delivered on show as empty sockets.

That distinction usually gets blurred into one long list. Drawing it costs a few impressive-looking logos and makes the rest of the list worth more.

## Status

Marked in progress because it is. The case studies still need my numbers in them, and the career dates need a pass.

<!-- PLACEHOLDER — Justin: replace the repo URL above with your real GitHub
     username. Add a screenshot when you want one: drop the image in
     src/assets/ and add `cover:` and `coverAlt:` to the frontmatter. -->
