/**
 * Utilitaires de sécurité pour le formulaire de contact
 * Protection contre XSS, injections, spam, et autres attaques
 */

// =======================
// 1. SANITISATION DES INPUTS
// =======================

/**
 * Échappe les caractères HTML dangereux
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Nettoie et sanitise un texte simple
 */
export function sanitizeText(text: string, maxLength: number = 500): string {
  if (typeof text !== 'string') return '';

  // Trim et limite la longueur
  let cleaned = text.trim().slice(0, maxLength);

  // Échappe les caractères HTML
  cleaned = escapeHtml(cleaned);

  return cleaned;
}

// =======================
// 2. VALIDATION DES CHAMPS
// =======================

/**
 * Valide un email et bloque les injections d'headers
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email requis' };
  }

  // Bloquer les nouvelles lignes (injection d'headers SMTP)
  if (email.includes('\n') || email.includes('\r')) {
    return { valid: false, error: 'Format email invalide' };
  }

  // Validation stricte du format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Format email invalide' };
  }

  // Limite de longueur
  if (email.length > 255) {
    return { valid: false, error: 'Email trop long' };
  }

  return { valid: true };
}

/**
 * Valide un numéro de téléphone français
 */
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone) return { valid: true }; // Champ optionnel

  // Nettoie les espaces et caractères spéciaux
  const cleaned = phone.replace(/[\s.-]/g, '');

  // Validation format français (10 chiffres commençant par 0)
  const phoneRegex = /^0[1-9]\d{8}$/;
  if (!phoneRegex.test(cleaned)) {
    return { valid: false, error: 'Format téléphone invalide (ex: 06 12 34 56 78)' };
  }

  return { valid: true };
}

/**
 * Valide un pseudo Instagram
 */
export function validateInstagram(username: string): { valid: boolean; error?: string } {
  if (!username) return { valid: true }; // Champ optionnel

  // Nettoie le @
  const cleaned = username.replace('@', '');

  // Instagram username: 1-30 caractères, alphanumériques + . et _
  const instaRegex = /^[a-zA-Z0-9._]{1,30}$/;
  if (!instaRegex.test(cleaned)) {
    return { valid: false, error: 'Format Instagram invalide' };
  }

  return { valid: true };
}

/**
 * Valide la longueur d'un champ texte
 */
export function validateTextLength(
  text: string,
  fieldName: string,
  minLength: number = 1,
  maxLength: number = 2000
): { valid: boolean; error?: string } {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: `${fieldName} requis` };
  }

  const length = text.trim().length;

  if (length < minLength) {
    return { valid: false, error: `${fieldName} trop court (min ${minLength} caractères)` };
  }

  if (length > maxLength) {
    return { valid: false, error: `${fieldName} trop long (max ${maxLength} caractères)` };
  }

  return { valid: true };
}

// =======================
// 3. DÉTECTION DES URLs
// =======================

/**
 * Détecte les URLs dans un texte
 */
export function containsURL(text: string): boolean {
  const urlPattern = /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|fr|net|org|io|co|uk|de|es|it))/gi;
  return urlPattern.test(text);
}

/**
 * Neutralise les URLs dans un texte
 */
export function neutralizeURLs(text: string): string {
  return text
    .replace(/https?:\/\//gi, '[URL-REMOVED] ')
    .replace(/www\./gi, '[WWW-REMOVED] ');
}

/**
 * Compte le nombre d'URLs dans un texte
 */
export function countURLs(text: string): number {
  const urlPattern = /(https?:\/\/|www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/gi;
  const matches = text.match(urlPattern);
  return matches ? matches.length : 0;
}

// =======================
// 4. VALIDATION DE FICHIERS
// =======================

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Valide un fichier image
 */
export function validateImageFile(file: File): FileValidationResult {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 10 * 1024 * 1024; // 10 MB

  // Vérification du type MIME
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Type de fichier non autorisé: ${file.name}. Formats acceptés: JPG, PNG, WEBP, GIF`,
    };
  }

  // Vérification de la taille
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Fichier trop volumineux: ${file.name} (max 10MB)`,
    };
  }

  // Vérification du nom de fichier (pas de caractères dangereux)
  const dangerousChars = /[<>:"|?*\x00-\x1f]/;
  if (dangerousChars.test(file.name)) {
    return {
      valid: false,
      error: `Nom de fichier invalide: ${file.name}`,
    };
  }

  return { valid: true };
}

/**
 * Valide un ensemble de fichiers
 */
export function validateFiles(files: File[]): FileValidationResult {
  const maxFiles = 5;

  if (files.length > maxFiles) {
    return {
      valid: false,
      error: `Trop de fichiers (max ${maxFiles})`,
    };
  }

  for (const file of files) {
    const result = validateImageFile(file);
    if (!result.valid) {
      return result;
    }
  }

  return { valid: true };
}

// =======================
// 5. VALIDATION COMPLÈTE DU FORMULAIRE
// =======================

export interface FormData {
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  projectType: 'flash' | 'freehand';
  flashNumber?: string;
  project: string;
  budget?: string;
  availability?: string;
  honeypot?: string; // Champ anti-bot
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  warnings: string[];
}

/**
 * Valide toutes les données du formulaire
 */
export function validateFormData(data: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: string[] = [];

  // 1. Honeypot - Si rempli, c'est un bot
  if (data.honeypot && data.honeypot.trim() !== '') {
    return {
      valid: false,
      errors: { form: 'Spam détecté' },
      warnings: [],
    };
  }

  // 2. Nom
  const nameValidation = validateTextLength(data.name, 'Nom', 2, 100);
  if (!nameValidation.valid) {
    errors.name = nameValidation.error!;
  }

  // 3. Email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.error!;
  }

  // 4. Téléphone (optionnel)
  if (data.phone) {
    const phoneValidation = validatePhone(data.phone);
    if (!phoneValidation.valid) {
      errors.phone = phoneValidation.error!;
    }
  }

  // 5. Instagram (optionnel)
  if (data.instagram) {
    const instaValidation = validateInstagram(data.instagram);
    if (!instaValidation.valid) {
      errors.instagram = instaValidation.error!;
    }
  }

  // 6. Type de projet
  if (!['flash', 'freehand'].includes(data.projectType)) {
    errors.projectType = 'Type de projet invalide';
  }

  // 7. Numéro de flash (si type flash)
  if (data.projectType === 'flash') {
    if (!data.flashNumber || data.flashNumber.trim().length === 0) {
      errors.flashNumber = 'Numéro de flash requis';
    } else if (data.flashNumber.length > 50) {
      errors.flashNumber = 'Numéro de flash trop long';
    }
  }

  // 8. Description du projet
  const projectValidation = validateTextLength(data.project, 'Description du projet', 10, 2000);
  if (!projectValidation.valid) {
    errors.project = projectValidation.error!;
  }

  // 9. Détection d'URLs dans les champs texte
  const urlCount = countURLs(data.project);
  if (urlCount > 0) {
    warnings.push(
      `⚠️ Des liens ont été détectés dans votre description (${urlCount}). Ils seront neutralisés pour votre sécurité.`
    );
  }

  // 10. Budget (optionnel, mais doit être dans la liste si fourni)
  if (data.budget) {
    const validBudgets = ['50-100', '100-200', '200-300', '300+'];
    if (!validBudgets.includes(data.budget)) {
      errors.budget = 'Budget invalide';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    warnings,
  };
}

// =======================
// 6. SANITISATION POUR EMAIL
// =======================

/**
 * Prépare les données pour l'envoi par email (sanitisées)
 */
export function sanitizeForEmail(data: FormData) {
  return {
    name: sanitizeText(data.name, 100),
    email: sanitizeText(data.email, 255),
    phone: data.phone ? sanitizeText(data.phone, 20) : '',
    instagram: data.instagram ? sanitizeText(data.instagram.replace('@', ''), 50) : '',
    projectType: data.projectType === 'flash' ? 'Flash' : 'Free hand',
    flashNumber: data.flashNumber ? sanitizeText(data.flashNumber, 50) : '',
    project: neutralizeURLs(sanitizeText(data.project, 2000)),
    budget: data.budget || 'Non spécifié',
    availability: data.availability ? neutralizeURLs(sanitizeText(data.availability, 1000)) : 'Non spécifié',
  };
}
