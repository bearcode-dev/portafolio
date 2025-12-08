"use client";
import { BlogType } from "./types/types";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";

export const BlogCard = ({ blog }: { blog: BlogType }) => {
    const { t } = useLanguage();
    
    return (
        <motion.a 
            href={blog.link} 
            target="_blank" 
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="group relative block h-[420px] w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image 
                    src={blog.cover || '/placeholder-blog.jpg'}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"/>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top Badge */}
                <div className="flex justify-end">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                        <span className="text-white text-xs font-medium">Article</span>
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-poiret leading-tight line-clamp-2">
                        {blog.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-brand-light text-sm font-medium">
                            {t.common.readMore}
                        </span>
                        <div className="bg-white/10 group-hover:bg-brand-green backdrop-blur-md p-3 rounded-full transition-all duration-300">
                            <ExternalLink className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};
