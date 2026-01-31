/**
 * Template d'email pour les demandes de tatouage
 * Format texte brut sécurisé et élégant
 */

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  projectType: string;
  flashNumber: string;
  project: string;
  budget: string;
  availability: string;
  hasFiles?: boolean;
  fileCount?: number;
  warnings?: string[];
}

/**
 * Génère un email en texte brut formaté de manière élégante
 */
export function generateEmailTemplate(data: EmailData): string {
  const separator = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  const smallSeparator = '─────────────────────────────────────────────────────';

  return `
${separator}
✨  NOUVELLE DEMANDE DE TATOUAGE - MARAH.POKES  ✨
${separator}

📅  Date de la demande : ${new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}


${smallSeparator}
👤  INFORMATIONS DU CLIENT
${smallSeparator}

Nom et Prénom       : ${data.name}
Email               : ${data.email}
Téléphone           : ${data.phone || 'Non renseigné'}
Instagram           : ${data.instagram ? '@' + data.instagram : 'Non renseigné'}


${smallSeparator}
🎨  DÉTAILS DU PROJET
${smallSeparator}

Type de projet      : ${data.projectType}
${data.flashNumber ? `Numéro du flash     : ${data.flashNumber}\n` : ''}
Description du projet :
${data.project}


${smallSeparator}
💰  INFORMATIONS PRATIQUES
${smallSeparator}

Budget envisagé     : ${data.budget}

Disponibilités :
${data.availability}


${data.hasFiles && data.fileCount && data.fileCount > 0 ? `${smallSeparator}
📎  FICHIERS JOINTS
${smallSeparator}

Nombre de photos    : ${data.fileCount}
Photos d'inspiration envoyées par le client


` : ''}${
    data.warnings && data.warnings.length > 0
      ? `${smallSeparator}
⚠️  AVERTISSEMENTS DE SÉCURITÉ
${smallSeparator}

${data.warnings.join('\n')}

Les liens détectés ont été automatiquement neutralisés pour votre protection.


`
      : ''
  }${separator}

💌  Répondre au client : ${data.email}
${data.instagram ? `📱  Instagram : @${data.instagram}` : ''}

${separator}

Ce message a été généré automatiquement par le formulaire de contact de marah.pokes
Système de sécurité actif : sanitisation, détection de spam, validation des fichiers
`.trim();
}

/**
 * Génère un email de confirmation pour le client (optionnel)
 */
export function generateConfirmationEmail(clientName: string): string {
  const separator = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

  return `
${separator}
✨  DEMANDE BIEN REÇUE - MARAH.POKES  ✨
${separator}

Bonjour ${clientName},

Merci pour votre demande de tatouage !

J'ai bien reçu votre message et je vais l'étudier avec attention.
Je vous répondrai dès que possible, généralement sous 48-72h.

En attendant, n'hésitez pas à consulter mes dernières créations sur Instagram : @marah.pokes


${separator}

À très bientôt,
Marah

${separator}

Ce message a été généré automatiquement.
Merci de ne pas répondre directement à cet email.
`.trim();
}

/**
 * Génère le sujet de l'email
 */
export function generateEmailSubject(data: EmailData): string {
  const projectType = data.projectType === 'Flash' ? '⚡ Flash' : '✋ Free hand';
  return `${projectType} - Nouvelle demande de ${data.name}`;
}
