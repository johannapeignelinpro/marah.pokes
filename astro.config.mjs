// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

// Variables d'environnement (.env en local, variables Netlify en production)
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'production',
  process.cwd(),
  ''
);

if (!PUBLIC_SANITY_PROJECT_ID) {
  throw new Error(
    'PUBLIC_SANITY_PROJECT_ID manquant : renseignez-le dans .env (local) ou dans les variables Netlify.'
  );
}

// URL de production : source unique, relue ailleurs via Astro.site / import.meta.env.SITE.
// Domaine sans tréma : le même partout (sitemap, canonical, balises OG, JSON-LD).
const SITE_URL = new URL('https://marahchenaina.fr').origin;

// Outils internes (prévisualisation de l'email du formulaire) : routes servies
// uniquement par `astro dev`, jamais générées au build ni présentes dans le sitemap.
function devOnlyPages() {
  return {
    name: 'dev-only-pages',
    hooks: {
      /** @param {{ command: string, injectRoute: (route: { pattern: string, entrypoint: string }) => void }} options */
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') return;
        injectRoute({ pattern: '/email-preview', entrypoint: './src/dev/email-preview.astro' });
      },
    },
  };
}

// Sitemap d'images (Google Images) : après la génération du sitemap, chaque page y
// reçoit ses images de contenu, relues dans le HTML construit. Ce sont donc
// exactement les URLs affichées sur le site, sans nouvelle requête à Sanity.
// Image de contenu = <img> avec un texte alternatif (les images décoratives,
// comme celle encore vide de la lightbox, ont alt="").
function imageSitemap() {
  /** @param {string} value */
  const xmlEscape = (value) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  /** @param {string} value */
  const htmlUnescape = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

  return {
    name: 'image-sitemap',
    hooks: {
      /** @param {{ dir: URL, logger: { info: (message: string) => void, warn: (message: string) => void } }} options */
      'astro:build:done': async ({ dir, logger }) => {
        const { readFile, writeFile } = await import('node:fs/promises');
        const sitemapFile = new URL('sitemap-0.xml', dir);
        let xml;
        try {
          xml = await readFile(sitemapFile, 'utf8');
        } catch {
          logger.warn('sitemap-0.xml introuvable : pas de sitemap d\'images.');
          return;
        }

        let total = 0;
        const urls = [...xml.matchAll(/<url><loc>([^<]+)<\/loc>/g)];
        for (const [entry, loc] of urls) {
          const { pathname } = new URL(loc);
          const htmlFile = new URL(`.${pathname}${pathname.endsWith('/') ? 'index.html' : '.html'}`, dir);
          const html = await readFile(htmlFile, 'utf8').catch(() => '');

          const images = new Set();
          for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
            const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
            const alt = tag.match(/\salt="([^"]*)"/)?.[1]?.trim();
            if (!src || !alt || src.startsWith('data:')) continue;
            images.add(new URL(htmlUnescape(src), SITE_URL).href);
          }
          if (images.size === 0) continue;

          total += images.size;
          const imageTags = [...images]
            .map((url) => `<image:image><image:loc>${xmlEscape(url)}</image:loc></image:image>`)
            .join('');
          xml = xml.replace(entry, `${entry}${imageTags}`);
        }

        await writeFile(sitemapFile, xml);
        logger.info(`${total} images ajoutées au sitemap (${urls.length} pages).`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  // SITE_NOINDEX=true (variable Netlify) : le site demande à Google et aux autres
  // moteurs de ne pas l'indexer. À retirer (ou passer à false) le jour de la mise en ligne,
  // puis redéployer : la valeur est lue au build.
  env: {
    schema: {
      SITE_NOINDEX: envField.boolean({ context: 'server', access: 'public', default: false }),
      // Avis Google (API Places, lue au build). Sans ces variables, le site affiche
      // les avis de secours de src/data/reviews.ts.
      GOOGLE_PLACES_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_PLACE_ID: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },

  integrations: [
    devOnlyPages(),
    // La page de confirmation du formulaire n'a rien à faire dans le sitemap
    sitemap({ filter: (page) => !page.includes('/merci') }),
    // Après sitemap() : complète le sitemap qu'il vient d'écrire
    imageSitemap(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2026-09-01',
      // Site statique : données fraîches à chaque build, sans passer par le cache CDN de l'API
      useCdn: false,
    }),
  ],

  // Configuration pour l'optimisation des images
  image: {
    domains: ['instagram.com'],
  },
});
