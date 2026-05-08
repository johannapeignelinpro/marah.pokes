// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marah-pokes.fr',

  integrations: [
    sitemap()
  ],

  // Configuration pour l'optimisation des images
  image: {
    domains: ['instagram.com'],
  },
});
