import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

export type Language = 'en' | 'fil' | 'ceb';
export const LANGUAGES: Language[] = ['en', 'fil', 'ceb'];
export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  fil: 'Filipino',
  ceb: 'Cebuano',
};

// Matches the legacy site's localStorage key so a language choice persists across
// the legacy <-> React boundary during incremental migration.
export const STORAGE_KEY = 'selectedLang';

// en is bundled (needed synchronously for SSG prerender + hydration). fil/ceb are
// code-split and fetched on first switch.
const loaders: Record<Exclude<Language, 'en'>, () => Promise<Record<string, string>>> = {
  fil: () => import('./locales/fil.json').then((m) => m.default),
  ceb: () => import('./locales/ceb.json').then((m) => m.default),
};

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: LANGUAGES,
  // Flat kebab-case keys — do not treat '.' / ':' as separators.
  keySeparator: false,
  nsSeparator: false,
  interpolation: { escapeValue: false }, // React already escapes
  react: { useSuspense: false },
});

const loaded = new Set<Language>(['en']);

export async function loadLanguage(lang: Language): Promise<void> {
  if (loaded.has(lang)) return;
  const dict = await loaders[lang as Exclude<Language, 'en'>]();
  i18n.addResourceBundle(lang, 'translation', dict, true, true);
  loaded.add(lang);
}

export async function setLanguage(lang: Language): Promise<void> {
  await loadLanguage(lang);
  await i18n.changeLanguage(lang);
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* Safari private mode */
  }
}

// Read the persisted choice and apply it (client-only; call from a useEffect so the
// initial render stays 'en' and matches the prerendered HTML).
export function readStoredLanguage(): Language | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v && (LANGUAGES as string[]).includes(v) ? (v as Language) : null;
  } catch {
    return null;
  }
}

export default i18n;
