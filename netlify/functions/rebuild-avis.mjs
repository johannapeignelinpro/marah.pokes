// Reconstruction programmée du site (fonction planifiée Netlify)
// Les avis Google ne sont lus qu'au build : relancer un build régulièrement
// suffit à faire apparaître les nouveaux avis, sans intervention manuelle.
// BUILD_HOOK_URL : variable Netlify (Site configuration > Build & deploy > Build hooks).

export default async () => {
  const hookUrl = process.env.BUILD_HOOK_URL;
  if (!hookUrl) {
    console.warn('[rebuild-avis] BUILD_HOOK_URL absent : aucun build déclenché.');
    return new Response('BUILD_HOOK_URL manquant', { status: 500 });
  }

  const response = await fetch(`${hookUrl}?trigger_title=${encodeURIComponent('Mise à jour des avis Google')}`, {
    method: 'POST',
  });
  console.log(`[rebuild-avis] Build hook appelé : HTTP ${response.status}`);
  return new Response(null, { status: response.ok ? 200 : 502 });
};

// Chaque lundi à 6 h UTC (8 h à Paris en été, 7 h en hiver)
export const config = {
  schedule: '0 6 * * 1',
};
