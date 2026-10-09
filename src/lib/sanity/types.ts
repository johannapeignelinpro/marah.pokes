// Types des contenus Sanity utilisés par le site
// Schémas définis dans le projet Studio séparé (marah-studio).

import type { SanityImageCrop, SanityImageHotspot } from '@sanity/image-url';

export interface SanityImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

/** Image Sanity telle que retournée par nos requêtes GROQ (asset non déréférencé). */
export interface SanityImage {
  asset?: { _ref: string; _type?: 'reference' } | null;
  crop?: SanityImageCrop | null;
  hotspot?: SanityImageHotspot | null;
  dimensions?: SanityImageDimensions | null;
}

/** Image dont l'asset est garanti présent (après filtrage). */
export type SanityImageWithAsset = SanityImage & {
  asset: { _ref: string; _type?: 'reference' };
};

export interface FlashBoard {
  _id: string;
  title: string | null;
  image: SanityImage | null;
  alt: string | null;
  order: number | null;
}

export interface TattooImage {
  image: SanityImage | null;
  alt: string | null;
}

export interface Tattoo {
  _id: string;
  title: string | null;
  description: string | null;
  date: string | null;
  featured: boolean | null;
  style: string | null;
  technique: string | null;
  images: TattooImage[] | null;
}

/** Orientation saisie dans le Studio (facultative : déduite des dimensions sinon). */
export type IllustrationOrientation = 'portrait' | 'paysage' | 'carre';

export interface Illustration {
  _id: string;
  title: string | null;
  image: SanityImage | null;
  alt: string | null;
  orientation: IllustrationOrientation | null;
}
