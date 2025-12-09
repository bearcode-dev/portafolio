"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJSON } from '../../../lib/request-util';
import CRUDTable from '@/app/components/dashboard/CRUDTable';
import { ExperienceType } from '../../components/types/types';
import ExperienceForm from '../components/ExperienceForm';

const fetchExperiences = async (): Promise<ExperienceType[]> => {
  const data = await fetchJSON<ExperienceType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/experiences`);
  return data ?? [];
};

const ExperiencesAdmin = () => {
  const { isPending, isError, data: experiences, error, refetch } = useQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiences,
  });

  if (isPending) return <div>Loading experiences...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h2 className="pt-2 text-center">Experiences</h2>
      <div className="p-8 my-4">
        {experiences && (
          <CRUDTable
            entityName="Experience"
            rowData={experiences}
            columnDefs={[
              { headerName: 'Title', field: 'title' },
              { headerName: 'Company', field: 'company' },
              { headerName: 'Start Date', field: 'startDate', cellRenderer: ({ value }: { value: string }) => new Date(value).toLocaleDateString() },
              { headerName: 'End Date', field: 'endDate', cellRenderer: ({ value }: { value: string | null }) => value ? new Date(value).toLocaleDateString() : 'Present' },
              { headerName: 'Slug', field: 'slug', hide: true }, // Ocultar pero disponible para CRUDTable
            ]}
            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/experiences`}
            FormComponent={ExperienceForm}
            onDataUpdate={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default ExperiencesAdmin;
