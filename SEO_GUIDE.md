# 🔍 Guide SEO - Marah.Pokes

## Éléments SEO déjà implémentés ✅

### 1. Meta Tags de base

Tous les meta tags essentiels sont configurés dans `src/pages/index.astro` :

- **Title** : Optimisé avec mots-clés ("Tatouage Handpoke à Rennes")
- **Description** : 155 caractères, incluant les termes clés
- **Keywords** : tattoo, tatouage, rennes, handpoke, organique, ornemental
- **Author** : Marah.Pokes

### 2. Open Graph (Partages sociaux)

Configuration pour Facebook, LinkedIn, etc. :
- `og:type`, `og:title`, `og:description`, `og:image`, `og:url`
- Image OG : 1200x630px (à créer)

### 3. Twitter Cards

Meta tags pour les partages sur Twitter/X.

### 4. Géolocalisation

**Crucial pour le SEO local** :
- `geo.region` : Bretagne (35)
- `geo.placename` : Rennes
- `geo.position` : Coordonnées GPS (48.1173, -1.6778)
- `ICBM` : Format alternatif des coordonnées

### 5. Schema.org (JSON-LD)

Données structurées pour Google :

**Type** : `TattooShop` (catégorie spécifique pour les salons de tatouage)

**Inclus** :
- Nom, description, image
- Adresse postale complète
- Coordonnées GPS
- Horaires d'ouverture
- Fourchette de prix
- Services proposés (catalogue)
- Liens vers réseaux sociaux

**Localisation** : `src/config/seo.ts` (lignes 71-111)

### 6. Robots.txt

Fichier configuré pour autoriser l'indexation complète du site.
Inclut la référence au sitemap.

### 7. Sitemap (à installer)

Plugin à installer : `@astrojs/sitemap`

```bash
npm install @astrojs/sitemap
```

Puis décommenter dans `astro.config.mjs`.

### 8. Performance & SEO technique

- **HTML sémantique** : Utilisation correcte des balises `<main>`, `<section>`, `<h1>`-`<h3>`
- **Images optimisées** : `loading="lazy"` sur la galerie
- **Responsive design** : Mobile-first
- **Accessibility** : Attributs `alt` sur toutes les images

## 🎯 Mots-clés ciblés

### Principaux (déjà intégrés)

- tatouage handpoke rennes
- tatouage à la main rennes
- handpoke bretagne
- tatoueur handpoke
- tatouage ornemental rennes
- tatouage floral rennes

### Secondaires (à intégrer dans le contenu)

- stick and poke rennes
- tatouage délicat
- tatouage artisanal
- tatouage sans machine
- dotwork rennes
- linework rennes

## 📍 SEO Local - Actions critiques

### 1. Google My Business (PRIORITÉ #1)

**Impact** : 70% de la visibilité locale

**À faire** :
1. Créer un profil sur [business.google.com](https://business.google.com)
2. Remplir TOUTES les informations :
   - Nom exact : "Marah.Pokes"
   - Catégorie : "Salon de tatouage" ou "Tatoueur"
   - Adresse exacte (ou zone de service si mobile)
   - Téléphone
   - Site web
   - Horaires
3. Ajouter **au minimum 10 photos** (studio, tatouages, processus)
4. Vérifier le profil (Google envoie une carte postale)
5. Demander des avis aux premiers clients (5 avis minimum)

### 2. Annuaires locaux

Inscrivez le site sur :
- **Pages Jaunes** (pagesjaunes.fr)
- **Yelp** (yelp.fr)
- **Tripadvisor** (si applicable)
- **Facebook Business**
- **Bing Places**
- **Annuaires locaux Rennes** (ville-rennes.fr, rennes-metropole.fr)

### 3. Backlinks locaux

Obtenir des liens depuis :
- **Blogs culture/lifestyle Rennes**
- **Médias locaux** (7jours.fr, ouest-france.fr)
- **Associations artistiques**
- **Partenaires** (autres tatoueurs, artistes)

## 📝 Optimisation du contenu

### Règles d'or pour le SEO

1. **Densité des mots-clés** : 1-2% (naturel !)
   - Intégrer "tatouage handpoke Rennes" 3-5 fois sur la page
   - Utiliser les variantes : "handpoke à Rennes", "tatoueur handpoke Rennes", etc.

2. **Titres H1, H2, H3**
   - 1 seul H1 par page (déjà fait : "Marah.Pokes")
   - H2 avec mots-clés : "Le Handpoke, c'est quoi ?"
   - Structure hiérarchique respectée

3. **Longueur du contenu**
   - Minimum 500 mots pour le SEO
   - Actuellement : ~300 mots → **À compléter**
   - Ajouter :
     - Histoire de l'artiste
     - Déroulement d'une séance
     - Conseils de soin
     - FAQ

4. **Images Alt Text**
   - Décrire chaque tatouage avec mots-clés
   - Exemple : "Tatouage floral handpoke sur avant-bras, réalisé à Rennes par Marah"
   - Éviter : "IMG_1234.jpg"

5. **Liens internes**
   - Créer des liens entre sections
   - Ajouter un blog pour maillage interne

## 🚀 Optimisations avancées

### Schema.org supplémentaire

**À ajouter si vous créez un blog** :

```json
{
  "@type": "Article",
  "headline": "Titre de l'article",
  "author": {
    "@type": "Person",
    "name": "Marah"
  },
  "datePublished": "2026-02-01"
}
```

### Rich Snippets potentiels

- **FAQ Schema** : Si vous ajoutez une FAQ
- **Review Schema** : Pour les avis clients
- **BreadcrumbList** : Si navigation multi-pages

### Performance SEO

**Core Web Vitals** (Google ranking factor) :

1. **LCP** (Largest Contentful Paint) : < 2.5s
   - Optimiser l'image de fond
   - Utiliser WebP/AVIF

2. **FID** (First Input Delay) : < 100ms
   - Déjà bon (Astro = peu de JS)

3. **CLS** (Cumulative Layout Shift) : < 0.1
   - Définir width/height sur images

**Outils de test** :
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 📊 Suivi & Analytics

### Google Search Console

**À configurer après le déploiement** :

1. Ajouter le site sur [search.google.com/search-console](https://search.google.com/search-console)
2. Vérifier la propriété (balise HTML ou DNS)
3. Soumettre le sitemap
4. Surveiller les performances de recherche

**Métriques à suivre** :
- Impressions
- Clics
- Position moyenne
- CTR (taux de clic)

### Google Analytics 4

**Optionnel mais recommandé** :

```javascript
// À ajouter dans src/pages/index.astro
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## ✅ Checklist SEO complète

### Technique
- [x] Meta tags optimisés
- [x] Schema.org implémenté
- [x] Robots.txt configuré
- [ ] Sitemap installé et soumis
- [ ] HTTPS activé (après déploiement)
- [ ] Temps de chargement < 3s
- [x] Mobile-friendly
- [x] Structure HTML sémantique

### Contenu
- [x] H1 unique et optimisé
- [x] H2/H3 avec mots-clés
- [ ] +500 mots de contenu
- [ ] Images avec alt descriptifs
- [ ] Mots-clés locaux intégrés
- [ ] Contenu unique (pas de duplicate)

### Local
- [ ] Google My Business créé et vérifié
- [ ] Adresse cohérente partout (NAP)
- [ ] Photos du studio/tatouages
- [ ] 5+ avis Google
- [ ] Inscription annuaires locaux
- [ ] Backlinks locaux

### Off-page
- [ ] Profil Instagram actif et lié
- [ ] Présence réseaux sociaux
- [ ] Backlinks de qualité
- [ ] Partages sociaux

## 🎓 Ressources utiles

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Local SEO Guide](https://moz.com/learn/seo/local)
- [Google My Business Help](https://support.google.com/business)

---

**Note** : Le SEO est un travail de longue haleine. Les premiers résultats apparaissent généralement après 3-6 mois. Patience et régularité !
