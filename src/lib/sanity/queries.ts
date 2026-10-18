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

// L'ordre d'affichage de chaque liste est choisi par glisser-déposer dans le
// Studio (plugin @sanity/orderable-document-list), stocké dans `orderRank`.

// Plaquettes de flashs visibles, dans l'ordre choisi dans le Studio.
// internalNote n'est volontairement pas récupérée (usage interne uniquement).
export const flashBoardsQuery = /* groq */ `
  *[_type == "flashBoard" && visible == true && !(_id in path("drafts.**"))]
  | order(orderRank asc, _createdAt asc) {
    _id,
    title,
    "image": image${imageProjection},
    alt
  }
`;

// Réalisations tattoo, dans l'ordre choisi dans le Studio.
// Dans le schéma, chaque élément de `images` est une image portant son propre
// champ `alt` : on le remappe en { image, alt }.
export const tattoosQuery = /* groq */ `
  *[_type == "tattoo" && !(_id in path("drafts.**"))]
  | order(orderRank asc, _createdAt desc) {
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

// Dessins visibles, dans l'ordre choisi dans le Studio.
// Les dimensions de l'asset (incluses dans imageProjection) servent à déduire
// l'orientation et à réserver la place de chaque dessin sans recadrage.
export const illustrationsQuery = /* groq */ `
  *[_type == "illustration" && visible == true && !(_id in path("drafts.**"))]
  | order(orderRank asc, _createdAt asc) {
    _id,
    title,
    "image": image${imageProjection},
    alt,
    description,
    technique,
    format,
    year,
    orientation
  }
`;
