// Email validation and smart domain suggestions with full Cyrillic (IDN) support
// Supports valid Russian/international domains (.рф, .москва, .рус, etc.) while blocking keyboard mash typos like .выв

export const VALID_CYRILLIC_TLDS = new Set([
  'рф',
  'москва',
  'рус',
  'онлайн',
  'сайт',
  'дети',
  'бел',
  'укр',
  'қаз',
  'мон',
  'срб',
  'ком',
  'орг',
  'нет',
  'ею',
  'мск',
  'спб',
]);

export const COMMON_PROVIDERS = [
  'gmail.com',
  'icloud.com',
  'outlook.com',
  'yandex.ru',
  'mail.ru',
  'yahoo.com',
  'proton.me',
];

const DOMAIN_TYPO_MAP: Record<string, string> = {
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmeil.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'icoud.com': 'icloud.com',
  'iclod.com': 'icloud.com',
  'icloud.con': 'icloud.com',
  'yandx.ru': 'yandex.ru',
  'yandexx.ru': 'yandex.ru',
  'yadnex.ru': 'yandex.ru',
  'mil.ru': 'mail.ru',
  'maill.ru': 'mail.ru',
  'inboxx.ru': 'inbox.ru',
};

const CYRILLIC_TLD_TYPOS: Record<string, string> = {
  'ру': 'ru',
  'сом': 'com',
  'орг': 'org',
  'нет': 'net',
  'ио': 'io',
};

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}

export function validateEmail(rawEmail: string): EmailValidationResult {
  const email = rawEmail.trim();

  if (!email) {
    return { isValid: false };
  }

  // Check for spaces
  if (/\s/.test(email)) {
    return { isValid: false, error: 'Email cannot contain spaces' };
  }

  const atCount = (email.match(/@/g) || []).length;
  if (atCount === 0) {
    return { isValid: false, error: 'Missing @ symbol' };
  }
  if (atCount > 1) {
    return { isValid: false, error: 'Email can only contain one @ symbol' };
  }

  const [localPart, domainPart] = email.split('@');

  if (!localPart) {
    return { isValid: false, error: 'Missing username before @' };
  }
  if (!domainPart) {
    return { isValid: false, error: 'Missing domain after @' };
  }

  // Local part checks
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return { isValid: false, error: 'Username cannot start or end with a period' };
  }
  if (localPart.includes('..')) {
    return { isValid: false, error: 'Username cannot contain consecutive dots' };
  }

  // Allow Latin and Cyrillic letters, digits, and common email punctuation in local part
  const localPartRegex = /^[a-zA-Z0-9а-яА-ЯёЁ._%+-]+$/;
  if (!localPartRegex.test(localPart)) {
    return { isValid: false, error: 'Username contains invalid characters' };
  }

  // Domain checks
  if (!domainPart.includes('.')) {
    return { isValid: false, error: 'Domain must include an extension (e.g. .com or .рф)' };
  }
  if (domainPart.startsWith('.') || domainPart.endsWith('.') || domainPart.startsWith('-') || domainPart.endsWith('-')) {
    return { isValid: false, error: 'Domain cannot start or end with a dot or hyphen' };
  }
  if (domainPart.includes('..')) {
    return { isValid: false, error: 'Domain cannot contain consecutive dots' };
  }

  const domainLabels = domainPart.split('.');
  const tld = domainLabels[domainLabels.length - 1].toLowerCase();

  // Check for common typo suggestions in the whole domain
  const lowerDomain = domainPart.toLowerCase();
  if (DOMAIN_TYPO_MAP[lowerDomain]) {
    return {
      isValid: false,
      error: `Did you mean ${localPart}@${DOMAIN_TYPO_MAP[lowerDomain]}?`,
      suggestion: `${localPart}@${DOMAIN_TYPO_MAP[lowerDomain]}`,
    };
  }

  // Check for accidental Cyrillic typos in standard TLDs (e.g. .ру instead of .ru)
  if (CYRILLIC_TLD_TYPOS[tld]) {
    const suggestedDomain = domainLabels.slice(0, -1).join('.') + '.' + CYRILLIC_TLD_TYPOS[tld];
    return {
      isValid: false,
      error: `Did you mean ${localPart}@${suggestedDomain}?`,
      suggestion: `${localPart}@${suggestedDomain}`,
    };
  }

  // Validate TLD
  const isLatinTld = /^[a-zA-Z]{2,24}$/.test(tld);
  const isCyrillicTld = /^[а-яА-ЯёЁ]{2,24}$/.test(tld);

  if (isCyrillicTld) {
    if (!VALID_CYRILLIC_TLDS.has(tld)) {
      return {
        isValid: false,
        error: `Unrecognized domain extension .${tld} (please check your keyboard layout or domain)`,
      };
    }
  } else if (!isLatinTld) {
    return {
      isValid: false,
      error: 'Invalid domain extension',
    };
  }

  // Validate each domain label
  for (const label of domainLabels) {
    if (!label) {
      return { isValid: false, error: 'Invalid domain format' };
    }
    const labelRegex = /^[a-zA-Z0-9а-яА-ЯёЁ-]+$/;
    if (!labelRegex.test(label)) {
      return { isValid: false, error: 'Domain contains invalid characters' };
    }
    if (label.startsWith('-') || label.endsWith('-')) {
      return { isValid: false, error: 'Domain label cannot start or end with a hyphen' };
    }
  }

  return { isValid: true };
}

/**
 * Returns matching domain suggestions based on user input after '@'
 */
export function getDomainSuggestions(input: string): string[] {
  const atIndex = input.indexOf('@');
  if (atIndex === -1) return [];

  const query = input.slice(atIndex + 1).toLowerCase();

  // If user already typed a full domain with a dot and 2+ chars, don't show generic autocomplete
  if (query.includes('.') && query.split('.')[1].length >= 2) {
    return [];
  }

  if (!query) {
    return COMMON_PROVIDERS;
  }

  return COMMON_PROVIDERS.filter((provider) => provider.startsWith(query));
}
