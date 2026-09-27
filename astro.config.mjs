// @ts-check
import { defineConfig } from 'astro/config';
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

// https://astro.build/config
export default defineConfig({
  site: 'https://marah-pokes.fr',

  integrations: [
    sitemap(),
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
