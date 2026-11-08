import { createContext } from 'react';
import type { Messages } from './en';

export const languages = ['sq', 'en'] as const;
export type Language = (typeof languages)[number];

export interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Messages;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
