"use client";
import React from 'react';
import { AboutType } from './types/types';
import Skillbar from './Skillbar';
import { Mail, MapPin, Briefcase, Calendar, Code2 } from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';
import { motion } from 'framer-motion';

interface ContentType {
    paragraphs: AboutType[]
}

const AboutBody = ({ paragraphs }: ContentType) => {
    const { t } = useLanguage();

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const quickFacts = [
        { icon: MapPin, label: 'Location', value: 'Remote / Colombia' },
        { icon: Briefcase, label: 'Experience', value: '5+ Years' },
        { icon: Code2, label: 'Projects', value: '50+ Completed' },
        { icon: Calendar, label: 'Availability', value: 'Open to work' }
    ];

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-16"
        >
            {/* Hero Section */}
            <motion.div variants={fadeInUp} className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-poiret font-bold text-gray-900 dark:text-white">
                    About Me
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Full-stack developer passionate about creating elegant solutions to complex problems
                </p>
            </motion.div>

            {/* Quick Facts */}
            <motion.div variants={fadeInUp}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickFacts.map((fact, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 text-center hover:border-brand-green/50 dark:hover:border-brand-green/30 transition-all shadow-lg"
                        >
                            <fact.icon className="w-6 h-6 mx-auto mb-3 text-brand-green" />
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                                {fact.label}
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {fact.value}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Story */}
                <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
                    {paragraphs.map((item, index) => (
                        <motion.div 
                            key={index}
                            variants={fadeInUp}
                            className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-white/10 hover:border-brand-green/50 dark:hover:border-brand-green/30 transition-all shadow-lg hover:shadow-xl"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-green to-brand-medium rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {item.paragraph}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Right Column: Skills Card */}
                <motion.div 
                    variants={fadeInUp}
                    className="lg:col-span-1"
                >
                    <div className="sticky top-24 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-white/10 shadow-lg">
                        <Skillbar />
                    </div>
                </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div variants={fadeInUp} className="text-center">
                <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-brand-green/10 to-brand-medium/10 dark:from-brand-green/5 dark:to-brand-medium/5 p-8 rounded-3xl border border-brand-green/20">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-poiret">
                        Let&apos;s Work Together
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                        Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
                    </p>
                    <a 
                        href="mailto:cardenascode7@outlook.com"
                        className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-green to-brand-medium text-white font-semibold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <Mail className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300'/>
                        <span>{t.about.sendEmail}</span>
                    </a>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default AboutBody;
