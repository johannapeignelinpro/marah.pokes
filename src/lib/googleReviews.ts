// Récupération des avis Google au build (API Places New, Place Details)
// Google renvoie au plus 5 avis (les « plus pertinents »), la note moyenne et le nombre total d'avis.
// En cas d'erreur, de clé absente ou de réponse vide, on renvoie les avis de secours
// de src/data/reviews.ts : la section s'affiche toujours, sans faire planter le build.
import { GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID } from 'astro:env/server';
import { googleReviews as fallbackSummary, reviews as fallbackReviews } from '../data/reviews';
import type { Review, ReviewsSummary } from '../data/reviews';

interface PlaceReview {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  publishTime?: string;
}

interface PlaceDetails {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  googleMapsLinks?: { reviewsUri?: string };
  reviews?: PlaceReview[];
}

export interface ReviewsData {
  summary: ReviewsSummary;
  reviews: Review[];
}

const FIELDS = 'rating,userRatingCount,googleMapsUri,googleMapsLinks.reviewsUri,reviews';
const monthYear = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

const fallback: ReviewsData = { summary: fallbackSummary, reviews: fallbackReviews };

function toReview(review: PlaceReview): Review | null {
  // Texte original (sans traduction automatique de Google), paragraphes vides retirés
  const text = (review.originalText?.text ?? review.text?.text ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
  const author = review.authorAttribution?.displayName?.trim();
  if (!text || !author) return null;

  return {
    author,
    authorUrl: review.authorAttribution?.uri,
    rating: review.rating ?? 5,
    date: review.publishTime ? monthYear.format(new Date(review.publishTime)) : '',
    text,
  };
}

export async function getGoogleReviews(): Promise<ReviewsData> {
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    console.warn('[avis] GOOGLE_PLACES_API_KEY ou GOOGLE_PLACE_ID absent : avis de secours affichés.');
    return fallback;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(GOOGLE_PLACE_ID)}?languageCode=fr`,
      {
        headers: { 'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY, 'X-Goog-FieldMask': FIELDS },
        signal: AbortSignal.timeout(10_000),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} — ${(await response.text()).slice(0, 200)}`);
    }

    const place = (await response.json()) as PlaceDetails;
    const reviews = (place.reviews ?? []).map(toReview).filter((review): review is Review => review !== null);
    if (reviews.length === 0 || !place.rating) {
      console.warn('[avis] Aucun avis renvoyé par Google : avis de secours affichés.');
      return fallback;
    }

    return {
      summary: {
        rating: place.rating,
        count: place.userRatingCount ?? reviews.length,
        url: place.googleMapsLinks?.reviewsUri ?? place.googleMapsUri ?? fallbackSummary.url,
      },
      reviews,
    };
  } catch (error) {
    console.warn('[avis] Impossible de récupérer les avis Google : avis de secours affichés.', error);
    return fallback;
  }
}
