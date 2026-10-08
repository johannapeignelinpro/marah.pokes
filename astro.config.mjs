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
// new URL() convertit le domaine accentué en punycode (https://xn--marah-chenana-zjb.fr),
// la forme attendue par les robots dans le sitemap, le canonical et les balises OG.
const SITE_URL = new URL('https://marah-chenaïna.fr').origin;

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
