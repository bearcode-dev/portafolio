"use client";
import { useLanguage } from '../providers/LanguageProvider';

export const BlogsTitle = () => {
    const { t } = useLanguage();
    
    return (
        <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poiret font-bold text-gray-900 dark:text-white tracking-wider mb-4">
                {t.blogs.title}
            </h1>
        </div>
    );
};
