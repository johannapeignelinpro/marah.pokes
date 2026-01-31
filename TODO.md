# TODO - Marah.Pokes

Liste complète des tâches à effectuer pour finaliser le site.

## 🔴 Priorité HAUTE - À faire immédiatement

### 1. Assets & Média

- [ ] **Image de fond** : Copier `Template_Fond__1_.jpg` dans `/public/assets/`
- [ ] **Photos galerie** : Ajouter au moins 6-12 photos de tatouages dans `/public/assets/gallery/`
  - Nommer les fichiers : `tattoo-1.jpg`, `tattoo-2.jpg`, etc.
  - Optimiser les images (compression, résolution adaptée)
  - Mettre à jour `src/components/Gallery.astro` avec les vraies images et leurs descriptions ALT
- [ ] **Photo de l'artiste** : Ajouter une photo dans `/public/assets/artiste.jpg`
  - Décommenter la balise `<img>` dans `src/components/About.astro` ligne 37
- [ ] **Logo** (si disponible) : Ajouter dans `/public/assets/logo.png`
- [ ] **Image OG** : Créer une image 1200x630px pour les partages sociaux → `/public/assets/og-image.jpg`
- [ ] **Favicon** : Remplacer les favicons par défaut dans `/public/`

### 2. Contenu

- [ ] **Bio de l'artiste** : Compléter la section "L'Artiste" dans `src/components/About.astro` (lignes 42-53)
  - Parcours professionnel
  - Vision artistique
  - Ce qui rend son travail unique
- [ ] **Vérifier tous les textes** : Relire et optimiser le contenu pour le SEO
  - Inclure naturellement les mots-clés : "tatouage handpoke Rennes", "handpoke bretagne", etc.

### 3. Informations de contact

- [ ] **Handle Instagram** : Remplacer `@marah.pokes` par le vrai dans :
  - `src/config/seo.ts` (ligne 14)
  - `src/config/seo.ts` (ligne 60 - URL complète)
- [ ] **Autres réseaux sociaux** (si applicable) :
  - Facebook : Ajouter dans `src/config/seo.ts` ligne 63
  - TikTok : Ajouter dans `src/config/seo.ts` ligne 64

### 4. Localisation & Coordonnées

- [ ] **Adresse du studio** : Mettre à jour dans `src/config/seo.ts` ligne 24
  - Si pas de local fixe, indiquer "Zone de service : Rennes et environs"
- [ ] **Coordonnées GPS précises** : Ajuster si nécessaire dans `src/config/seo.ts` lignes 27-28
- [ ] **Horaires** : Préciser les disponibilités dans `src/config/seo.ts` ligne 52
- [ ] **Tarifs** : Ajuster `priceRange` dans `src/config/seo.ts` ligne 51

## 🟡 Priorité MOYENNE - À faire avant le déploiement

### 5. Formulaire de contact

- [ ] **Configurer le service d'envoi d'email** :
  - Option A : Formspree (gratuit, simple)
  - Option B : Netlify Forms (si hébergé sur Netlify)
  - Option C : Resend (plus avancé)
- [ ] **Tester le formulaire** après configuration
- [ ] **Supprimer le message d'avertissement** dans `ContactForm.astro` ligne 118-120

### 6. SEO - Optimisations avancées

- [ ] **Installer le plugin sitemap** :
  ```bash
  npm install @astrojs/sitemap
  ```
  Puis décommenter les lignes dans `astro.config.mjs`
- [ ] **Google My Business** (CRUCIAL) :
  - Créer un profil sur https://business.google.com
  - Ajouter toutes les infos : adresse, horaires, photos
  - Vérifier le profil (par carte postale)
  - Demander des avis aux premiers clients
- [ ] **Google Search Console** :
  - Créer un compte
  - Ajouter le site
  - Soumettre le sitemap
- [ ] **Google Analytics** (optionnel mais recommandé) :
  - Créer un compte GA4
  - Ajouter le script de tracking dans `src/pages/index.astro`

### 7. Nom de domaine & Déploiement

- [ ] **Acheter un nom de domaine** (ex: marah-pokes.fr, marahpokes.com, etc.)
- [ ] **Mettre à jour l'URL** dans :
  - `src/config/seo.ts` ligne 67
  - `astro.config.mjs` ligne 7
  - `public/robots.txt` ligne 6
- [ ] **Déployer sur Vercel ou Netlify**
- [ ] **Configurer le domaine personnalisé**
- [ ] **Activer HTTPS** (automatique sur Vercel/Netlify)
- [ ] **Tester le site en production**

## 🟢 Priorité BASSE - Améliorations futures

### 8. Améliorations UX/UI

- [ ] **Navigation fixe** : Ajouter un menu de navigation sticky (optionnel)
- [ ] **Lightbox pour la galerie** : Permettre d'agrandir les images au clic
- [ ] **Animations** : Ajouter des animations au scroll (AOS, Framer Motion, etc.)
- [ ] **Mode sombre** : Implémenter un toggle dark mode (optionnel)

### 9. Fonctionnalités avancées

- [ ] **Blog** : Ajouter une section blog pour le SEO (articles sur le handpoke, soins, etc.)
- [ ] **Système de prise de RDV** : Intégrer Calendly ou similaire
- [ ] **Témoignages clients** : Ajouter une section avec avis
- [ ] **FAQ** : Créer une page FAQ sur le handpoke, tarifs, déroulement, etc.

### 10. Performance

- [ ] **Optimiser les images** : Convertir en WebP/AVIF
- [ ] **Lazy loading** : Déjà implémenté pour la galerie, vérifier les autres images
- [ ] **Test Lighthouse** : Viser 90+ sur tous les scores
- [ ] **Test sur mobile** : Vérifier la responsive design

### 11. Accessibilité

- [ ] **Test de contraste** : Vérifier que tous les textes sont lisibles
- [ ] **Navigation au clavier** : Tester la navigation complète au clavier
- [ ] **Screen reader** : Tester avec un lecteur d'écran
- [ ] **ARIA labels** : Ajouter si nécessaire

### 12. Légal

- [ ] **Mentions légales** : Créer une page `/mentions-legales`
- [ ] **Politique de confidentialité** : Si formulaire de contact ou analytics
- [ ] **RGPD** : Bannière cookies si Google Analytics
- [ ] **CGV** : Si système de paiement en ligne

## 📋 Checklist de lancement

Avant de partager le site :

- [ ] Toutes les images sont chargées et optimisées
- [ ] Tous les textes sont relus et corrigés
- [ ] Le formulaire de contact fonctionne
- [ ] Les liens vers les réseaux sociaux sont corrects
- [ ] Le site est responsive sur mobile, tablette, desktop
- [ ] Google My Business est créé et vérifié
- [ ] Le site est déployé et accessible
- [ ] Le domaine personnalisé est configuré
- [ ] Le sitemap est généré et soumis à Google
- [ ] Les performances sont bonnes (Lighthouse > 90)

## 🎯 Ordre recommandé d'exécution

1. Ajouter l'image de fond et les photos de galerie
2. Compléter la bio et les textes
3. Mettre à jour les infos de contact (Instagram, etc.)
4. Configurer le formulaire de contact
5. Créer le compte Google My Business
6. Acheter le nom de domaine
7. Déployer le site
8. Installer le sitemap et soumettre à Google
9. Améliorer progressivement (blog, animations, etc.)

---

**Note** : Les éléments marqués TODO: dans le code source correspondent aux tâches de cette liste.
