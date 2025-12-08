"use client"
import { motion } from "framer-motion";
import { Code2, Briefcase, Coffee, Award } from "lucide-react";

const stats = [
    { icon: Briefcase, value: "5+", label: "Years Experience" },
    { icon: Code2, value: "50+", label: "Projects Completed" },
    { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
    { icon: Award, value: "10+", label: "Technologies" }
];

export const StatsSection = () => {
    return (
        <section className="py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                    >
                        <div className="p-6 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-green to-brand-medium text-white">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-4xl font-bold font-poiret text-gray-900 dark:text-white">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
