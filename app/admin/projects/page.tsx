'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FolderKanban, Code2, TrendingUp, Tag } from 'lucide-react';
import CRUDTable from '../../components/dashboard/CRUDTable';
import { ProjectType } from '../../../app/components/types/types';
import { fetchJSON } from '../../../lib/request-util';
import ProjectForm from '../../admin/components/ProjectForm';
import PageHeader from '../components/PageHeader';
import StatsCard from '../../components/ui/stats-card';

const fetchProjects = async (): Promise<ProjectType[] | []> => {
  const data = await fetchJSON<ProjectType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
  return data ?? [];
};

const ProjectsAdmin = () => {
  const { isPending, isError, data: projects, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const stats = useMemo(() => {
    if (!projects) return { total: 0, categories: 0, technologies: 0 };

    const categories = new Set(projects.map(p => p.category)).size;
    const technologies = new Set(
      projects.flatMap(p => Array.isArray(p.technologies) ? p.technologies : [])
    ).size;

    return {
      total: projects.length,
      categories,
      technologies,
    };
  }, [projects]);

  if (isPending) return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div></div>;
  if (isError) return <div className="text-center py-12 text-red-600 dark:text-red-400">Error: {error?.message}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FolderKanban}
        title="Projects"
        description="Manage your portfolio projects and showcase your work"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Projects"
          value={stats.total}
          icon={FolderKanban}
          description="All portfolio projects"
          color="blue"
        />
        <StatsCard
          title="Categories"
          value={stats.categories}
          icon={Tag}
          description="Project categories"
          color="purple"
        />
        <StatsCard
          title="Technologies"
          value={stats.technologies}
          icon={Code2}
          description="Unique technologies used"
          color="green"
        />
      </div>

      {projects && (
        <CRUDTable
          entityName="Project"
          rowData={projects}
          columnDefs={[
            { headerName: 'Title', field: 'title' },
            { headerName: 'Category', field: 'category' },
            { headerName: 'Technologies', field: 'technologies', cellRenderer: ({ value }: { value: string[] }) => (value && Array.isArray(value) ? value.join(', ') : '') },
          ]}
          apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/projects`}
          FormComponent={ProjectForm}
          onDataUpdate={refetch}
        />
      )}
    </div>
  );
};

export default ProjectsAdmin;
