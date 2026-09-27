import type { APIRoute } from 'astro';
import { SITE_NOINDEX } from 'astro:env/server';

// robots.txt généré au build à partir de `site` (astro.config.mjs),
// pour que l'URL du sitemap suive toujours le domaine de production.
// Avec SITE_NOINDEX, l'exploration reste autorisée (sinon Google ne verrait pas
// la balise noindex des pages) mais le sitemap n'est plus annoncé.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);
  const lines = ['User-agent: *', 'Allow: /'];

  if (!SITE_NOINDEX) {
    lines.push('', `Sitemap: ${sitemapUrl.href}`);
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
