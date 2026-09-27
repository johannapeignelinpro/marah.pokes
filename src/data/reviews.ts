// Avis Google de Marah.Pokes
// Copier ici les avis depuis la fiche Google Business (texte tel quel, sans le modifier).
// Un saut de ligne (\n) dans le texte crée un nouveau paragraphe.

export interface Review {
  author: string;
  rating: number; // 1 à 5
  date: string; // ex. 'mars 2026'
  text: string;
}

export const googleReviews = {
  rating: 5.0,
  count: 4,
  url: 'https://share.google/asrFyJwTa8N6Zlx9P',
};

export const reviews: Review[] = [
  {
    author: 'Johanna P.',
    rating: 5,
    date: 'septembre 2026',
    text: "Marah est une jeune artiste tattoueuse avec beaucoup de talent ! Elle est ultra rigoureuse, professionnelle et perfectionniste. Elle ne lésine pas sur l'hygiène et vous apporter une presta de qualité\nC'est aussi quelqu'un de très humain et absolument charmant avec qui on passe toujours un très bon moment.\nLe tattoo handpoke est beaucoup moins douloureux que le tatouage traditionnel et cicatrise également très très bien. J'en suis à mon 8 ème tattoo avec Marah, c'est toujours un grand plaisir\nLe local ou elle travaille, l'atelier noir, est un lieu très beau et très agréable. On s'y sent tout de suite très bien\nN'hésitez pas une seconde, Marah est une perle !",
  },
  {
    author: 'Suliane R.',
    rating: 5,
    date: 'septembre 2026',
    text: "J'ai passé un moment hors du temps avec Marah.\nDe la conception du tatouage jusqu'au point final elle a été attentive à mes demandes et besoins.\nElle a su comprendre l'idee que j'avais en tête en la sublimant avec son art.\nJ'ai pu avoir un magnifique bracelet de bras personnalisé que je ne me lasse pas de regarder.\nMarah est une tatoueuse très talentueuse et je referai un autre projet avec elle les yeux fermés !",
  },
  {
    author: 'Daryajumel',
    rating: 5,
    date: 'septembre 2026',
    text: "Je me suis faite tatouée par Marah au niveau du poignet, et l'expérience s'est très bien déroulée. Elle est professionnelle et sécurisante d'une part, et à l'écoute d'autre part. C'était ma première fois au Handpoke et par conséquent la cicatrisation a été beaucoup plus douce et rapide étonnamment. Je recommande Marah qui sait être à l'écoute et toujours très agréable.",
  },
  {
    author: 'Rich M.',
    rating: 5,
    date: 'septembre 2026',
    text: "Marah est très professionnel et talentueuse! Une hygiène irréprochable sur toute la session de tatouage! Elle a su me proposer un dessin qui correspondait parfaitement à ce que je recherchais, et m'a tout de suite mis à l'aise et rassuré et ce tout le long du tatouage. Je recommande fortement!",
  },
];
