import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18nContext, languages, type I18nContextValue, type Language } from './context';
import { en, type Messages } from './en';
import { sq } from './sq';

const dictionaries: Record<Language, Messages> = { sq, en };
const STORAGE_KEY = 'pv.language';

function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (languages as readonly string[]).includes(value);
}

/** Saved choice first, then the browser language, then Albanian (the main audience). */
function detectInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — fall through.
  }
  const browser = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : '';
  return browser === 'en' ? 'en' : 'sq';
}

export function I18nProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(
    () => initialLanguage ?? detectInitialLanguage(),
  );

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore — the choice still applies for this visit.
    }
  }, []);

  const toggleLanguage = useCallback(
    () => setLanguage(language === 'sq' ? 'en' : 'sq'),
    [language, setLanguage],
  );

  useEffect(() => {
    document.documentElement.lang = dictionaries[language].meta.htmlLang;
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({ language, setLanguage, toggleLanguage, t: dictionaries[language] }),
    [language, setLanguage, toggleLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
