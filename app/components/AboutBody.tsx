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
        { icon: MapPin, label: 'Location', value: 'Remote / Peru' },
        { icon: Briefcase, label: 'Experience', value: '4+ Years' },
        { icon: Code2, label: 'Projects', value: '20+ Completed' },
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
            <motion.div variants={fadeInUp} className="space-y-4 text-center">
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl font-poiret dark:text-white">
                    About Me
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                    Full-stack developer passionate about creating elegant solutions to complex problems
                </p>
            </motion.div>

            {/* Quick Facts */}
            <motion.div variants={fadeInUp}>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {quickFacts.map((fact, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="p-6 text-center rounded-2xl border shadow-lg backdrop-blur-xl transition-all bg-white/70 dark:bg-white/5 border-gray-200/50 dark:border-white/10 hover:border-brand-green/50 dark:hover:border-brand-green/30"
                        >
                            <fact.icon className="mx-auto mb-3 w-6 h-6 text-brand-green" />
                            <p className="mb-1 text-xs tracking-wider text-gray-500 uppercase dark:text-gray-400">
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                
                {/* Left Column: Story */}
                <motion.div variants={fadeInUp} className="space-y-6 lg:col-span-2">
                    {paragraphs.map((item, index) => (
                        <motion.div 
                            key={index}
                            variants={fadeInUp}
                            className="relative p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all group bg-white/70 dark:bg-white/5 border-gray-200/50 dark:border-white/10 hover:border-brand-green/50 dark:hover:border-brand-green/30 hover:shadow-xl"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b rounded-l-3xl opacity-0 transition-opacity from-brand-green to-brand-medium group-hover:opacity-100" />
                            <p className="text-white text-[17px] leading-relaxed pb-2.5">
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
                    <div className="sticky top-24 p-8 rounded-3xl border shadow-lg backdrop-blur-xl bg-white/70 dark:bg-white/5 border-gray-200/50 dark:border-white/10">
                        <Skillbar />
                    </div>
                </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div variants={fadeInUp} className="text-center">
                <div className="inline-flex flex-col gap-4 items-center p-8 bg-gradient-to-br rounded-3xl border from-brand-green/10 to-brand-medium/10 dark:from-brand-green/5 dark:to-brand-medium/5 border-brand-green/20">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-poiret">
                        Let&apos;s Work Together
                    </h3>
                    <p className="max-w-md text-gray-600 dark:text-gray-400">
                        Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
                    </p>
                    <a 
                        href="mailto:cardenascode7@outlook.com"
                        className="inline-flex gap-3 justify-center items-center px-10 py-4 font-semibold text-white bg-gradient-to-r rounded-2xl shadow-lg transition-all duration-300 group from-brand-green to-brand-medium hover:shadow-xl hover:scale-105"
                    >
                        <Mail className='w-5 h-5 transition-transform duration-300 group-hover:rotate-12'/>
                        <span>{t.about.sendEmail}</span>
                    </a>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default AboutBody;
