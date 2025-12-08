"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectType } from "./types/types";

interface FeaturedProjectsProps {
    projects: ProjectType[];
}

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
    const featuredProjects = projects.slice(0, 2);

    return (
        <section className="py-16 md:py-20 pb-20">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-poiret font-bold text-gray-900 dark:text-white mb-2">
                        Featured Work
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Recent projects
                    </p>
                </div>
                <Link 
                    href="/projects"
                    className="group flex items-center gap-2 text-brand-green hover:text-brand-medium transition-colors text-sm font-medium"
                >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={project.link} target="_blank">
                            <div className="group relative h-72 rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <div className="absolute inset-0">
                                    <Image
                                        src={project.cover}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 font-poiret">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-200 text-sm line-clamp-2 opacity-90">
                                        {project.about}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
