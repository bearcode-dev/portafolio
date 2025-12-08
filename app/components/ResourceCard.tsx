"use client";
import { ResourceType } from "./types/types";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";

export const ResourceCard = ({ resource }: { resource: ResourceType }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative h-full w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={resource.coverImage || "/placeholder-resource.jpg"}
          alt={resource.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-brand-green shadow-lg">
            <span className="text-white text-xs font-bold uppercase tracking-wide">
              {resource.type}
            </span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/20 border border-white/30">
            <span className="text-white text-xs font-medium">
              {resource.category.name}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-brand-green transition-colors">
          {resource.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {resource.description}
        </p>

        <div className="space-y-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(resource.publishedAt).toLocaleDateString()}</span>
            {resource.readTimeMinutes && (
              <>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{resource.readTimeMinutes} {t.resources?.minRead || "min read"}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">By {resource.author}</span>
          </div>
        </div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {resource.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <a
          href={resource.link || "#"}
          target="_blank"
          rel="noreferrer"
          className="w-full px-4 py-3 bg-gradient-to-r from-brand-green to-brand-medium text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium group/btn"
        >
          <span>{t.resources?.viewResource || "View Resource"}</span>
          <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
};
