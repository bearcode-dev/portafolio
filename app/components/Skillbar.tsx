"use client"

import React from 'react'
import { motion } from 'framer-motion';
import { useLanguage } from '../providers/LanguageProvider';

type SkillBarsProps = {}

const SkillBars: React.FC<SkillBarsProps> = () => {
    const { t } = useLanguage();
    
    const skills = [
        { name: 'Spring Boot', level: 90, color: 'from-green-400 to-green-600' },
        { name: 'NestJs', level: 75, color: 'from-pink-400 to-pink-600' },
        { name: 'Django', level: 70, color: 'from-emerald-400 to-emerald-600' },
        { name: '.NET', level: 65, color: 'from-purple-400 to-purple-600' },
        { name: 'ExpressJS', level: 65, color: 'from-lime-400 to-lime-600' },
        { name: 'Docker', level: 60, color: 'from-blue-400 to-blue-600' },
        { name: 'Kubernetes', level: 65, color: 'from-indigo-400 to-indigo-600' },
        { name: 'Next.js', level: 70, color: 'from-gray-600 to-gray-800' },
        { name: 'Angular', level: 60, color: 'from-red-400 to-red-600' },
        { name: 'React', level: 70, color: 'from-cyan-400 to-cyan-600' }
    ];

    return (
        <div className='w-full space-y-6'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider border-b border-gray-300 dark:border-white/20 pb-2'>
                {t.about.skills}
            </h2>
            
            <div className="space-y-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {skill.name}
                            </span>
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
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
        </div>
    )
}

export default SkillBars;


