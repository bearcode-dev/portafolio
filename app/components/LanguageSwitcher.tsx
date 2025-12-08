"use client";
import { useLanguage } from '../providers/LanguageProvider';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { lang, changeLanguage } = useLanguage();

  return (
    <button
      onClick={() => changeLanguage(lang === 'en' ? 'es' : 'en')}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full 
        transition-all duration-300 backdrop-blur-sm border 
        border-transparent hover:border-brand-green/30
        bg-brand-green/5 hover:bg-brand-green/10 text-brand-green
        dark:bg-white/10 dark:hover:bg-white/20 dark:text-white
      `}
      title={lang === 'en' ? "Cambiar a Español" : "Switch to English"}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium tracking-wide">{lang === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
};
