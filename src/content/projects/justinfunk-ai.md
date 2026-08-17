---
title: justinfunk.ai
summary: This site. An Astro build where every claim is a content file, and the platform matrix draws an honest line between what I've built on and what I've only evaluated.
problem: >-
  Most portfolio sites in enterprise CX make claims that can't be checked, and
  most of them conflate "I've seen this platform" with "I've built on it." I
  wanted a site where the second click always lands on evidence, and where the
  distinction between hands-on and familiar is a visible design element rather
  than a footnote nobody reads.
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

## Why build it this way

The constraint I set was that I should never have to open a component file to change what the site says. Every job, platform, case study, and post is a typed content file — JSON for career and platform data, Markdown for anything with prose. If I misspell a field or forget a required one, the build fails and tells me which file and which field. That's what makes editing content directly safe rather than nerve-racking.

The career data has a second job. The `/work` timeline and the `/resume` page both read the same JSON, so the two can't drift apart. Updating a role in one place updates it everywhere it appears.

## The platform matrix

The piece I care most about is the fluency matrix, built as a patch panel. Platforms I've actually built on show as ports with a cable seated. Platforms I know well enough to evaluate but haven't delivered show as empty ports. It's the literal hardware of the industry doing the work of an honest disclaimer.

Almost everyone in this space blurs that line. Drawing it myself costs me a few impressive-looking logos and buys back something worth more.

## What's still open

The build log is honest about its own status, which is why this entry is marked in progress rather than shipped. Still to come: the remaining case studies, a longer run of writing, and a small retrieval-grounded assistant over my own career data — a working version of the thing everyone in this market claims on a resume.

<!-- PLACEHOLDER — Justin: replace the repo URL above with your real GitHub
     username, and add a screenshot once the design is settled. Drop the image
     in src/assets/ and add `cover:` and `coverAlt:` to the frontmatter. -->
