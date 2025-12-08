"use client";

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale, dictionary } from '../lib/dictionary';

type LanguageContextType = {
  lang: Locale;
  t: typeof dictionary['en'];
  changeLanguage: (lang: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Locale;
}) {
  const [lang, setLang] = useState<Locale>(initialLang);
  const router = useRouter();

  const changeLanguage = (newLang: Locale) => {
    // Set cookie
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    setLang(newLang);
    router.refresh(); 
  };

  const t = dictionary[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
