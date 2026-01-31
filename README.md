# Marah.Pokes - Site Vitrine Handpoke

Site vitrine one-page pour Marah.Pokes, tatoueuse handpoke à Rennes.

## 🚀 Démarrage rapide

### 1. Installation des dépendances

```bash
cd Marah.Pokes
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:4321`

### 3. Ajouter l'image de fond

Copiez le fichier `Template_Fond__1_.jpg` dans le dossier :
```
public/assets/Template_Fond__1_.jpg
```

## 📁 Structure du projet

```
Marah.Pokes/
├── public/              # Fichiers statiques (images, fonts, etc.)
│   ├── assets/          # Images et ressources
│   │   └── Template_Fond__1_.jpg  # ⚠️ À ajouter manuellement
│   └── robots.txt       # Configuration pour les moteurs de recherche
├── src/
│   ├── components/      # Composants Astro réutilisables
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Gallery.astro
│   │   ├── ContactForm.astro
│   │   └── Footer.astro
│   ├── config/          # Configuration du site
│   │   └── seo.ts       # Configuration SEO et Schema.org
│   ├── pages/           # Pages du site
│   │   └── index.astro  # Page d'accueil
│   └── styles/          # Styles CSS
│       └── global.css   # Styles globaux avec design system
└── astro.config.mjs     # Configuration Astro
```

## ✅ Checklist de configuration (TODO)

Consultez le fichier [TODO.md](./TODO.md) pour la liste complète des éléments à configurer.

### Configuration prioritaire :

1. **Image de fond** : Ajouter `Template_Fond__1_.jpg` dans `/public/assets/`
2. **Instagram** : Remplacer `@marah.pokes` par le vrai handle dans `/src/config/seo.ts`
3. **Photos galerie** : Ajouter les photos de tatouages dans `/public/assets/gallery/`
4. **Formulaire de contact** : Configurer un service d'envoi d'emails (voir section ci-dessous)
5. **Bio artiste** : Compléter la section "L'Artiste" dans `/src/components/About.astro`

## 📧 Configuration du formulaire de contact

Le formulaire n'est pas encore connecté. Plusieurs options :

### Option 1 : Formspree (Recommandé - Gratuit)

1. Créer un compte sur [Formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Copier l'URL du formulaire
4. Modifier `/src/components/ContactForm.astro` ligne 162 :
   ```javascript
   const response = await fetch('https://formspree.io/f/VOTRE_ID', {
   ```

### Option 2 : Netlify Forms (si hébergé sur Netlify)

1. Ajouter `netlify` à la balise `<form>` :
   ```html
   <form class="contact-form" id="contact-form" name="contact" netlify>
   ```
2. Les emails seront envoyés automatiquement

### Option 3 : Resend

1. Créer un compte sur [Resend.com](https://resend.com)
2. Créer une API route Astro pour gérer l'envoi
3. Configuration plus technique mais plus flexible

## 🎨 Personnalisation du design

### Couleurs

Les couleurs sont définies dans `/src/styles/global.css` :
```css
--color-sable: #ba9a76;
--color-beige: #fff8f0;
```

### Polices

- **H1** : Rozha One (alternative à Rosella Deco)
- **Reste** : Amiri

Si vous avez la police Rosella Deco, ajoutez-la avec `@font-face` dans `global.css`.

## 📸 Ajouter des photos à la galerie

1. Placez vos photos dans `/public/assets/gallery/`
2. Nommez-les de manière cohérente : `tattoo-1.jpg`, `tattoo-2.jpg`, etc.
3. Modifiez `/src/components/Gallery.astro` ligne 4 :

```javascript
const galleryImages = [
  { src: '/assets/gallery/tattoo-1.jpg', alt: 'Tatouage floral handpoke sur avant-bras' },
  { src: '/assets/gallery/tattoo-2.jpg', alt: 'Tatouage ornemental handpoke côtes' },
  // etc.
];
```

**Important pour le SEO** : Utilisez des descriptions détaillées dans les attributs `alt`.

## 🔍 SEO - Optimisation pour les moteurs de recherche

### Configuration de base (déjà faite)

✅ Meta tags optimisés
✅ Schema.org (LocalBusiness + TattooShop)
✅ Géolocalisation meta tags
✅ Open Graph pour les réseaux sociaux
✅ Robots.txt

### À faire pour maximiser le SEO :

1. **Google My Business** (CRUCIAL)
   - Créer un profil sur [business.google.com](https://business.google.com)
   - Ajouter photos, horaires, adresse
   - Demander des avis clients

2. **Sitemap**
   ```bash
   npm install @astrojs/sitemap
   ```
   Puis décommentez les lignes dans `astro.config.mjs`

3. **Image OG**
   - Créer une image 1200x630px pour les partages sociaux
   - La placer dans `/public/assets/og-image.jpg`

4. **Contenu riche**
   - Ajouter du contenu textuel dans chaque section
   - Utiliser naturellement les mots-clés : "tatouage handpoke Rennes", "tatoueur Rennes", etc.
   - Compléter la bio de l'artiste

## 🚀 Déploiement

### Sur Vercel (Recommandé)

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Connecter votre dépôt Git
3. Vercel détectera automatiquement Astro
4. Déploiement automatique à chaque push

### Sur Netlify

1. Créer un compte sur [netlify.com](https://netlify.com)
2. Connecter votre dépôt Git
3. Build command : `npm run build`
4. Publish directory : `dist`

### Build en local

```bash
npm run build
```

Le site sera généré dans le dossier `dist/`.

## 📝 Commandes disponibles

| Commande                   | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `npm install`              | Installer les dépendances                        |
| `npm run dev`              | Lancer le serveur de dev sur `localhost:4321`    |
| `npm run build`            | Build du site de production dans `./dist/`       |
| `npm run preview`          | Prévisualiser le build avant déploiement         |
| `npm run astro ...`        | Commandes CLI Astro (`astro add`, `astro check`) |

## 🎯 Prochaines étapes

1. ✅ Configurer le formulaire de contact
2. ✅ Ajouter les photos de la galerie
3. ✅ Compléter la bio de l'artiste
4. ✅ Créer un compte Google My Business
5. ✅ Acheter un nom de domaine
6. ✅ Déployer le site
7. ✅ Installer Google Analytics (optionnel)

## 🆘 Besoin d'aide ?

- Documentation Astro : [docs.astro.build](https://docs.astro.build)
- Pour le SEO local : [Guide Google My Business](https://support.google.com/business)
- Pour les questions : contactez le développeur

## 📜 Licence

© 2026 Marah.Pokes - Tous droits réservés
