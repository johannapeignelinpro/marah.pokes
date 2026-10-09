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

/** Ratio largeur / hauteur affiché : ratio d'origine corrigé du crop éventuel défini dans le Studio. */
export function displayRatio(image: SanityImage): number {
  const { width = 1, height = 1 } = image.dimensions ?? {};
  const { left = 0, right = 0, top = 0, bottom = 0 } = image.crop ?? {};
  return (width * (1 - left - right)) / (height * (1 - top - bottom)) || 1;
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

/**
 * URLs d'une image à ses proportions d'origine (crop Sanity respecté, aucun
 * recadrage forcé), avec un srcset. Utile quand rien ne doit être coupé,
 * comme les prix sur les plaquettes de flashs.
 */
export function naturalImage(image: SanityImageWithAsset, { widths, quality = 80 }: SquareImageOptions) {
  const sorted = [...widths].sort((a, b) => a - b);
  const url = (width: number) => urlFor(image).width(width).fit('max').quality(quality).url();

  const defaultWidth = sorted[Math.floor(sorted.length / 2)];
  const ratio = displayRatio(image);

  return {
    src: url(defaultWidth),
    srcset: sorted.map((w) => `${url(w)} ${w}w`).join(', '),
    width: defaultWidth,
    height: Math.round(defaultWidth / ratio),
  };
}
