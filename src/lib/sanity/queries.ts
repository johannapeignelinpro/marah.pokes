// Requêtes GROQ du site
// Toutes les requêtes Sanity sont centralisées ici.

// Projection commune des images : référence d'asset + crop/hotspot pour
// @sanity/image-url, et dimensions d'origine pour d'éventuels ratios.
const imageProjection = /* groq */ `{
  asset,
  crop,
  hotspot,
  "dimensions": asset->metadata.dimensions
}`;

// Plaquettes de flashs visibles, triées par ordre croissant.
// internalNote n'est volontairement pas récupérée (usage interne uniquement).
export const flashBoardsQuery = /* groq */ `
  *[_type == "flashBoard" && visible == true && !(_id in path("drafts.**"))]
  | order(order asc) {
    _id,
    title,
    "image": image${imageProjection},
    alt,
    order
  }
`;

// Réalisations tattoo, de la plus récente à la plus ancienne.
// Les documents sans date passent en fin de liste (puis par date de création).
// Dans le schéma, chaque élément de `images` est une image portant son propre
// champ `alt` : on le remappe en { image, alt }.
export const tattoosQuery = /* groq */ `
  *[_type == "tattoo" && !(_id in path("drafts.**"))]
  | order(coalesce(date, "0000-01-01") desc, _createdAt desc) {
    _id,
    title,
    description,
    date,
    featured,
    style,
    technique,
    "images": images[]{
      "image": ${imageProjection},
      alt
    }
  }
`;
