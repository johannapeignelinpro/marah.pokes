import type { APIRoute } from 'astro';

// robots.txt généré au build à partir de `site` (astro.config.mjs),
// pour que l'URL du sitemap suive toujours le domaine de production.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);

  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
};
