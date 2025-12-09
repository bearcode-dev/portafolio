'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CRUDTable from '../../components/dashboard/CRUDTable';
import { ProjectType } from '../../../app/components/types/types';
import { fetchJSON } from '../../../lib/request-util';
import ProjectForm from '../../admin/components/ProjectForm'; // Este componente lo crearemos después

const fetchProjects = async (): Promise<ProjectType[] | []> => {
  const data = await fetchJSON<ProjectType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
  return data ?? [];
};

const ProjectsAdmin = () => {
  const { isPending, isError, data: projects, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  if (isPending) return <div>Loading projects...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h2 className="pt-2 text-center">Projects</h2>
      <div className="p-8 my-4">
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
    </div>
  );
};

export default ProjectsAdmin;
