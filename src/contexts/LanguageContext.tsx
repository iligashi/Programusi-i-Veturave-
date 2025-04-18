import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sq';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
}

const translations = {
  'nav.home': {
    en: 'Home',
    sq: 'Ballina'
  },
  'nav.services': {
    en: 'Services',
    sq: 'Shërbimet'
  },
  'nav.about': {
    en: 'About',
    sq: 'Rreth Nesh'
  },
  'nav.contact': {
    en: 'Contact',
    sq: 'Kontakti'
  },
  'hero.title': {
    en: 'Professional Car Programming Services',
    sq: 'Shërbime Profesionale të Programimit të Veturave'
  },
  'hero.subtitle': {
    en: 'Unlock your vehicle\'s full potential with our expert programming services',
    sq: 'Zhbllokoni potencialin e plotë të automjetit tuaj me shërbimet tona eksperte të programimit'
  },
  'hero.cta': {
    en: 'Explore Services',
    sq: 'Shiko Shërbimet'
  },
  'features.title': {
    en: 'Why Choose Our Services?',
    sq: 'Pse të Zgjidhni Shërbimet Tona?'
  },
  'showcase.title': {
    en: 'Supported Brands & Features',
    sq: 'Brendet dhe Veçoritë e Mbështetura'
  },
  'cta.title': {
    en: 'Ready to Upgrade Your Vehicle?',
    sq: 'Gati për të Përmirësuar Automjetin Tuaj?'
  },
  'cta.subtitle': {
    en: 'Contact us today for professional car programming services',
    sq: 'Na kontaktoni sot për shërbime profesionale të programimit të veturave'
  },
  'cta.button': {
    en: 'Contact Us',
    sq: 'Na Kontaktoni'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 