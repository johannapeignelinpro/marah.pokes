// Configuration SEO pour Marah.Pokes
// Tatouage Handpoke à Rennes

export const siteConfig = {
  name: 'Marah.Pokes',
  title: 'Marah.Pokes - Tatouage Handpoke à Rennes | Tatouages fines lignes et ombrages en Bretagne',
  description: 'Marah.pokes, tatoueuse handpoke basée à Rennes en Bretagne. Tatouages ornementaux déposés à la main dans un geste traditionnel, mêlant symboles intuitifs, formes organiques, lignes fines et délicats ombrés.',
  slogan: 'Marah.pokes, tatoueuse handpoke basée à Rennes en Bretagne. Tatouages ornementaux déposés à la main dans un geste traditionnel, mêlant symboles intuitifs, formes organiques, lignes fines et délicats ombrés.',

  // Contact
  instagram: '@marah.pokes',
  email: 'contact@marah-pokes.fr', // Email fictif pour le formulaire

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
  priceRange: '€€', // TODO: Ajuster selon les tarifs
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

  // Social Media (à compléter)
  social: {
    instagram: 'https://instagram.com/marah.pokes',
    // facebook: '', // TODO: Ajouter si existe
    // tiktok: '', // TODO: Ajouter si existe
  },

  // URL du site (à définir lors du déploiement)
  url: 'https://marah-pokes.fr', // TODO: Remplacer par l'URL réelle lors du déploiement

  // Image par défaut pour les partages sociaux
  ogImage: '/assets/og-image.jpg', // TODO: Créer une image OG (1200x630px)
};

// Schema.org structuré pour le SEO local
export const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'TattooShop',
  name: siteConfig.name,
  image: siteConfig.ogImage,
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

  // Horaires et tarifs
  priceRange: siteConfig.priceRange,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '00:00',
    closes: '23:59',
    description: 'Sur rendez-vous uniquement'
  },

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
