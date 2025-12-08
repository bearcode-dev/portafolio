"use client";
import React, { useState, useMemo } from 'react';
import { ResourceCard } from '../components/ResourceCard';
import { ResourceType, ResourceCategoryType } from '../components/types/types';
import { useLanguage } from '../providers/LanguageProvider';
import { motion } from 'framer-motion';
import { Filter, BookOpen, Sparkles } from 'lucide-react';

interface ResourcesContentProps {
    initialResources: ResourceType[];
    categories: ResourceCategoryType[];
}

const ResourcesContent: React.FC<ResourcesContentProps> = ({ initialResources, categories }) => {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');

    const resourceTypes = ['Article', 'Video', 'Ebook', 'Tutorial', 'Tool', 'Case Study'];

    const filteredResources = useMemo(() => {
        return initialResources.filter(resource => {
            const matchesCategory = selectedCategory === 'all' || resource.category.id === selectedCategory;
            const matchesType = selectedType === 'all' || resource.type === selectedType;
            return matchesCategory && matchesType;
        });
    }, [initialResources, selectedCategory, selectedType]);

    return (
        <div className="flex flex-col items-center w-full px-4 py-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 w-full max-w-4xl"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 rounded-full mb-4">
                    <Sparkles className="w-4 h-4 text-brand-green" />
                    <span className="text-sm font-medium text-brand-green">Learning Hub</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poiret bg-gradient-to-r from-brand-green to-brand-medium bg-clip-text text-transparent">
                    {t.resources.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                    {t.resources.description}
                </p>
            </motion.div>

            {/* Filters Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 w-full max-w-5xl border border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-brand-green" />
                    <h3 className="text-lg font-semibold">Filter Resources</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            {t.resources.filterByCategory}
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
                        >
                            <option value="all">{t.resources.allCategories}</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            {t.resources.filterByType}
                        </label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
                        >
                            <option value="all">{t.resources.allTypes}</option>
                            {resourceTypes.map((type) => (
                                <option key={type} value={type}>
                                    {t.resources.types[type.toLowerCase().replace(' ', '') as keyof typeof t.resources.types] || type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-medium">
                            {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Resources Grid */}
            {filteredResources.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredResources.map((resource, i) => (
                        <motion.div
                            key={resource.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <ResourceCard resource={resource} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center max-w-md border border-gray-200 dark:border-gray-700"
                >
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your filters to find more resources
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ResourcesContent;
