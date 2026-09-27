// Génération des URLs d'images via le CDN Sanity
import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from 'sanity:client';
import type { SanityImage, SanityImageWithAsset } from './types';

const builder = createImageUrlBuilder(sanityClient);

/** Vrai si l'image possède un asset exploitable. */
export function hasAsset(image: SanityImage | null | undefined): image is SanityImageWithAsset {
  return Boolean(image?.asset?._ref);
}

/** Point d'entrée générique : format automatique (WebP/AVIF selon le navigateur). */
export function urlFor(image: SanityImageWithAsset) {
  return builder.image(image).auto('format');
}

interface SquareImageOptions {
  widths: number[];
  quality?: number;
}

/**
 * URLs d'une image recadrée en carré (hotspot/crop Sanity respectés),
 * avec un srcset pour servir la bonne taille selon l'écran.
 */
export function squareImage(image: SanityImageWithAsset, { widths, quality = 80 }: SquareImageOptions) {
  const sorted = [...widths].sort((a, b) => a - b);
  const url = (size: number) =>
    urlFor(image).width(size).height(size).fit('crop').quality(quality).url();

  const defaultSize = sorted[Math.floor(sorted.length / 2)];

  return {
    src: url(defaultSize),
    srcset: sorted.map((size) => `${url(size)} ${size}w`).join(', '),
    size: defaultSize,
  };
}
