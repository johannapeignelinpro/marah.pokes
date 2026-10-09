// Récupération des contenus Sanity au build
// En cas d'erreur réseau ou de réponse vide, on renvoie une liste vide :
// les sections concernées s'affichent alors sans grille, sans faire planter le build.
import { sanityClient } from 'sanity:client';
import { displayRatio, hasAsset } from './image';
import { flashBoardsQuery, illustrationsQuery, tattoosQuery } from './queries';
import type { FlashBoard, Illustration, IllustrationOrientation, SanityImageWithAsset, Tattoo } from './types';

// Le dataset étant privé, la lecture nécessite un token (rôle Viewer).
// Variable sans préfixe PUBLIC_ : utilisée uniquement au build, jamais envoyée au navigateur.
const token = import.meta.env.SANITY_API_READ_TOKEN;
const client = token ? sanityClient.withConfig({ token }) : sanityClient;

if (!token) {
  console.warn('[sanity] SANITY_API_READ_TOKEN absent : le dataset privé renverra des résultats vides.');
}

async function safeFetch<T>(label: string, query: string): Promise<T[]> {
  try {
    const result = await client.fetch<T[] | null>(query);
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.warn(`[sanity] Impossible de récupérer « ${label} » :`, error);
    return [];
  }
}

export interface DisplayImage {
  image: SanityImageWithAsset;
  alt: string;
}

export interface DisplayFlashBoard extends DisplayImage {
  _id: string;
  title: string | null;
}

export interface DisplayTattoo extends Omit<Tattoo, 'images'> {
  images: DisplayImage[];
}

const FLASH_ALT_FALLBACK = 'Plaquette de flashs de tatouage handpoke par Marah';
const TATTOO_ALT_FALLBACK = 'Tatouage handpoke par Marah';
const ILLUSTRATION_ALT_FALLBACK = 'Dessin de Marah Chenaïna';

/** Plaquettes de flashs visibles et affichables (image présente). */
export async function getFlashBoards(): Promise<DisplayFlashBoard[]> {
  const boards = await safeFetch<FlashBoard>('flashBoard', flashBoardsQuery);

  return boards.flatMap((board) => {
    if (!hasAsset(board.image)) return [];
    return [{
      _id: board._id,
      title: board.title,
      image: board.image,
      alt: board.alt?.trim() || board.title?.trim() || FLASH_ALT_FALLBACK,
    }];
  });
}

/** Tattoos avec uniquement leurs images valides ; ceux sans image sont écartés. */
export async function getTattoos(): Promise<DisplayTattoo[]> {
  const tattoos = await safeFetch<Tattoo>('tattoo', tattoosQuery);

  return tattoos.flatMap((tattoo) => {
    const images = (tattoo.images ?? []).flatMap((item) => {
      if (!hasAsset(item?.image)) return [];
      return [{
        image: item.image,
        alt: item.alt?.trim() || tattoo.title?.trim() || TATTOO_ALT_FALLBACK,
      }];
    });

    return images.length > 0 ? [{ ...tattoo, images }] : [];
  });
}

export interface DisplayIllustration extends DisplayImage {
  _id: string;
  title: string;
  /** Ratio largeur / hauteur affiché (crop Studio compris) : pilote la mise en page. */
  ratio: number;
  orientation: IllustrationOrientation;
}

// Écart toléré autour de 1 pour considérer un dessin comme carré (scan légèrement de travers…)
const SQUARE_TOLERANCE = 0.05;

function orientationFromRatio(ratio: number): IllustrationOrientation {
  if (Math.abs(ratio - 1) <= SQUARE_TOLERANCE) return 'carre';
  return ratio < 1 ? 'portrait' : 'paysage';
}

/**
 * Dessins visibles et affichables. L'orientation est déduite des dimensions de
 * l'image ; celle saisie dans le Studio, facultative, ne sert qu'à la forcer.
 */
export async function getIllustrations(): Promise<DisplayIllustration[]> {
  const illustrations = await safeFetch<Illustration>('illustration', illustrationsQuery);

  return illustrations.flatMap((illustration) => {
    if (!hasAsset(illustration.image)) return [];
    const ratio = displayRatio(illustration.image);
    return [{
      _id: illustration._id,
      title: illustration.title?.trim() || '',
      image: illustration.image,
      alt: illustration.alt?.trim() || illustration.title?.trim() || ILLUSTRATION_ALT_FALLBACK,
      ratio,
      orientation: illustration.orientation ?? orientationFromRatio(ratio),
    }];
  });
}
