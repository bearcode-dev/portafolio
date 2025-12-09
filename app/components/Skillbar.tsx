"use client"

import React from 'react'
import { motion } from 'framer-motion';
import { useLanguage } from '../providers/LanguageProvider';
import { SkillCategoryType } from './types/types';

type SkillBarsProps = {
    skillCategories: SkillCategoryType[]
}

const SkillBars: React.FC<SkillBarsProps> = ({ skillCategories }) => {
    const { t } = useLanguage();

    // Flatten all skills from all categories and sort by proficiency
    const allSkills = skillCategories
        .flatMap(category =>
            (category.skills || []).map(skill => ({
                name: skill.name,
                level: skill.proficiency,
                color: category.color || 'from-gray-400 to-gray-600'
            }))
        )
        .sort((a, b) => b.level - a.level); // Sort by proficiency descending

    return (
        <div className='w-full space-y-6'>
            <h2 className='text-xl font-bold text-foreground mb-6 uppercase tracking-wider border-b border-gray-300 dark:border-white/20 pb-2'>
                {t.about.skills}
            </h2>
            
            {allSkills.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                    No skills added yet. Add skills from the admin panel.
                </p>
            ) : (
                <div className="space-y-4">
                    {allSkills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">
                                {skill.name}
                            </span>
                            <span className="text-xs font-semibold text-muted-foreground">
                                {skill.level}%
                            </span>
                        </div>
                        
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ 
                                    duration: 1, 
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                        </div>
                    </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SkillBars;


