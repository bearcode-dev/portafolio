"use client";
import { useLanguage } from '../providers/LanguageProvider';

export const ProjectsHeader = () => {
    const { t } = useLanguage();
    
    return (
        <div className="flex flex-col items-center mb-16">
            <h1 className="text-4xl md:text-5xl font-poiret font-bold text-gray-900 dark:text-white tracking-wider mb-4">
                {t.projects.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg text-center">
                {t.projects.description}
            </p>
        </div>
    );
};
