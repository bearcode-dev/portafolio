import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { getProjectsV2 } from '../requests/requests'
import { ProjectsHeader } from '../components/ProjectsHeader'

const Projects = async () => {

    const projects = await getProjectsV2()

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <ProjectsHeader />

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 text-center shadow-lg">
                    <p className="text-3xl font-bold text-brand-green font-poiret">{projects?.length || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Projects</p>
                </div>
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 text-center shadow-lg">
                    <p className="text-3xl font-bold text-brand-green font-poiret">15+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Technologies</p>
                </div>
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 text-center shadow-lg">
                    <p className="text-3xl font-bold text-brand-green font-poiret">100%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Success Rate</p>
                </div>
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 text-center shadow-lg">
                    <p className="text-3xl font-bold text-brand-green font-poiret">5+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Years Exp</p>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poiret">
                        All Projects
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {projects?.length || 0} projects
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects?.map((item, i) => (
                        <ProjectCard key={i} project={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Projects