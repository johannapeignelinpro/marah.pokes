// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: Remplacer par l'URL réelle lors du déploiement
  site: 'https://marah-pokes.fr',

  // Configuration pour la génération de sitemap
  // Pour installer le plugin sitemap : npm install @astrojs/sitemap
  // Puis décommentez les lignes ci-dessous :
  /*
  integrations: [
    sitemap()
  ]
  */

  // Configuration pour l'optimisation des images
  image: {
    domains: ['instagram.com'],
  },
});
