import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { setLanguage, readStoredLanguage, type Language } from '@/i18n';

/**
 * Thin wrapper over react-i18next: `{ t, language, setLanguage }`.
 * Mirrors the legacy TranslationEngine / react-app LanguageContext API.
 */
export function useLanguage() {
  const { t, i18n } = useTranslation();
  return {
    t,
    language: i18n.language as Language,
    setLanguage,
  };
}

/**
 * Client-only: apply the persisted language after mount. Kept out of initial render
 * so SSR/hydration stays on 'en' (matching the prerendered HTML), then switches.
 */
export function useSyncStoredLanguage() {
  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored && stored !== 'en') void setLanguage(stored);
  }, []);
}
