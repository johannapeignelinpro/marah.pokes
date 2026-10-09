// Configuration SEO pour Marah Chenaïna
// Tatouage Handpoke à Rennes

import { existsSync } from 'node:fs';
import { join } from 'node:path';

// URL de production, définie une seule fois dans astro.config.mjs (`site`)
const siteUrl = import.meta.env.SITE;

// Image de partage (Open Graph / Twitter), 1200 × 600 px.
// Tant que public/assets/og-image.jpg n'existe pas, la photo du hero sert de repli :
// les partages affichent une vraie image au lieu de pointer vers un fichier absent.
const OG_IMAGE = { path: '/assets/og-image.jpg', width: 1200, height: 600 };
const OG_IMAGE_FALLBACK = { path: '/assets/gallery/photosmarah/photo-marah-dessin.jpg', width: 1920, height: 1265 };
const ogImage = existsSync(join(process.cwd(), 'public', OG_IMAGE.path)) ? OG_IMAGE : OG_IMAGE_FALLBACK;

const HERO_LEAD = 'Tatouages ornementaux déposés à la main dans un geste traditionnel, mêlant symboles intuitifs, formes organiques, lignes fines et ombrages.';

export const siteConfig = {
  name: 'Marah Chenaïna',
  // Ancien nom de marque, conservé comme alias (Instagram @marah.pokes, fiche Google)
  alternateName: 'Marah.Pokes',
  title: 'Marah Chenaïna — Tatouage Handpoke à Rennes',
  description: 'Tatouages handpoke réalisés à la main à Rennes par Marah Chenaïna. Pièces fines, organiques et ornementales, uniquement sur rendez-vous.',
  // Phrase d'accroche du hero (le nom, la technique et la ville sont déjà dans le titre)
  heroLead: HERO_LEAD,
  // Footer : présentation courte, sans reprendre l'accroche du hero
  role: 'Artiste tatoueuse et illustratrice à Rennes',
  slogan: 'Tatouages handpoke réalisés entièrement à la main, sans machine, point par point. Flashs, projets personnalisés et dessins originaux à l\'encre, sur rendez-vous à l\'Atelier Noir, en Bretagne (Ille-et-Vilaine).',

  // Contact
  instagram: '@marah.pokes',

  // Localisation
  location: {
    city: 'Rennes',
    region: 'Bretagne',
    postalCode: '35000',
    country: 'France',
    streetAddress: '43 rue de Paris',
    address: '43 rue de Paris, 35000 Rennes',
    // Coordonnées GPS précises du studio (43 rue de Paris, Rennes)
    latitude: 48.1125336,
    longitude: -1.6665207
  },

  // SEO
  keywords: [
    'tattoo',
    'tatouage',
    'rennes',
    'handpoke',
    'organique',
    'ornemental',
    'tatouage handpoke rennes',
    'handpoke bretagne',
    'tatouage ornemental',
    'tatouage floral rennes',
    'stick and poke rennes',
    'tatoueur handpoke',
    'tatouage à la main',
    'tatouage délicat'
  ],

  // Business
  priceRange: 'À partir de 100 €', // sortie d'aiguille
  openingHours: 'Sur rendez-vous uniquement',
  languages: ['Français'],

  // Spécialités
  specialties: [
    'Tatouages ornementaux',
    'Motifs floraux et organiques',
    'Handpoke (tatouage à la main)',
    'Lignes délicates',
    'Compositions symboliques'
  ],

  // Atelier Noir : salon du tatoueur du même nom, où Marah est artiste résidente.
  // Les liens renvoient vers son travail à lui (recommandation d'un collègue).
  // Tant qu'un lien est vide, le bouton correspondant n'est pas affiché.
  atelierNoir: {
    name: 'Atelier Noir',
    styles: ['Fineline', 'Lettering', 'Dotwork'],
    googleUrl: 'https://share.google/6pvlD4pl9a6fd8qmG',
    instagramUrl: 'https://www.instagram.com/ateliernoir_tatouage/',
  },

  // Social Media (à compléter)
  social: {
    instagram: 'https://instagram.com/marah.pokes',
    // facebook: '', // TODO: Ajouter si existe
    // tiktok: '', // TODO: Ajouter si existe
  },

  // URL canonique de la page d'accueil (avec slash final, comme dans le sitemap)
  url: new URL('/', siteUrl).href,

  // Image pour les partages sociaux (URL absolue, exigée par Open Graph)
  ogImage: {
    url: new URL(ogImage.path, siteUrl).href,
    width: ogImage.width,
    height: ogImage.height,
    alt: 'Marah Chenaïna, tatoueuse handpoke à Rennes',
  },
};

// Schema.org structuré pour le SEO local
export const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  image: siteConfig.ogImage.url,
  description: siteConfig.description,

  // Adresse
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.location.streetAddress,
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.region,
    postalCode: siteConfig.location.postalCode,
    addressCountry: siteConfig.location.country
  },

  // Coordonnées GPS
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.location.latitude,
    longitude: siteConfig.location.longitude
  },

  // Contact
  url: siteConfig.url,
  // telephone: '', // TODO: Ajouter si numéro public

  // Tarifs. Pas d'horaires structurés : Marah travaille uniquement sur rendez-vous.
  priceRange: siteConfig.priceRange,

  // Services proposés
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de tatouage',
    itemListElement: siteConfig.specialties.map((specialty, index) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: specialty
      },
      position: index + 1
    }))
  },

  // Réseaux sociaux
  sameAs: Object.values(siteConfig.social).filter(Boolean)
};
