
"use client"
import { useState } from "react";
import { ExternalLink, Code2, X } from "lucide-react";
import { ProjectType } from "./types/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "../providers/LanguageProvider";

const ProjectCard = ({ project }: { project: ProjectType }) => {
    const [showTool, setShowTool] = useState(false)
    const { t } = useLanguage();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image 
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"/>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-between p-6 z-10">
                
                {/* Top Badge */}
                <div className="flex justify-end">
                    <button 
                        onClick={() => setShowTool(!showTool)}
                        className="group/btn bg-white/10 hover:bg-brand-green backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                    >
                        <Code2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Bottom Content */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white font-poiret">
                            {project.title}
                        </h3>
                        <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">
                            {project.about}
                        </p>
                    </div>
                    
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-brand-green px-6 py-3 rounded-full transition-all duration-300 group/link"
                    >
                        <span className="text-sm font-medium">View Project</span>
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Tools Reveal Overlay */}
            <AnimatePresence>
                {showTool && (
                    <motion.div 
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute inset-0 bg-gradient-to-br from-brand-green to-brand-medium backdrop-blur-xl flex flex-col items-center justify-center p-8 z-20"
                    >
                        <button 
                            onClick={() => setShowTool(false)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <h4 className="text-2xl font-poiret font-bold text-white mb-6">
                            {t.projects.technologies}
                        </h4>
                        
                        <div className="flex flex-wrap justify-center gap-3 max-w-md">
                            {project.tools.map((item, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
                                >
                                    {item.name}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default ProjectCard;
