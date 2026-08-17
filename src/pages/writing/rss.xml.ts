import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '../../lib/site';
import { getPosts } from '../../lib/content';

/**
 * RSS feed for Injection of Funk.
 *
 * The whole publishing model here is owned-first — this site is canonical and
 * LinkedIn is distribution. A feed is what makes that claim real: it gives
 * someone a way to follow the writing that doesn't route through a platform
 * that can change its algorithm, gate the reach, or disappear.
 *
 * Drafts are excluded automatically, because getPosts() already strips them
 * from production builds.
 */
export const GET: APIRoute = async (context) => {
  const posts = await getPosts();

  return rss({
    title: 'Injection of Funk',
    description:
      'Writing on customer experience, contact center platforms, and putting AI to work in enterprise engagement.',
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      // The hook is the opening line, which is exactly what a feed reader
      // should show as the summary.
      description: post.data.hook,
      pubDate: post.data.date,
      link: `/writing/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
};
