"use client";
import { useLanguage } from '../providers/LanguageProvider';

export const ExperienceTitle = () => {
    const { t } = useLanguage();
    
    return (
        <h1 className="text-3xl md:text-5xl font-poiret font-bold text-gray-800 dark:text-gray-100 tracking-wider mb-16 border-b-4 border-brand-green pb-4">
            {t.experience.title}
        </h1>
    );
};
