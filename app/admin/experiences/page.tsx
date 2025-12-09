"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Briefcase } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { formatTableDate } from '../../../lib/date-utils';
import CRUDTable from '@/app/components/dashboard/CRUDTable';
import { ExperienceType } from '../../components/types/types';
import ExperienceForm from '../components/ExperienceForm';
import PageHeader from '../components/PageHeader';

const fetchExperiences = async (): Promise<ExperienceType[]> => {
  const data = await fetchJSON<ExperienceType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/experiences`);
  return data ?? [];
};

const ExperiencesAdmin = () => {
  const { isPending, isError, data: experiences, error, refetch } = useQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiences,
  });

  if (isPending) return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div></div>;
  if (isError) return <div className="text-center py-12 text-red-600 dark:text-red-400">Error: {error?.message}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Briefcase}
        title="Experiences"
        description="Manage your work history and professional experience"
      />
      {experiences && (
        <CRUDTable
          entityName="Experience"
          rowData={experiences}
          columnDefs={[
            { headerName: 'Title', field: 'title' },
            { headerName: 'Company', field: 'company' },
            { headerName: 'Start Date', field: 'startDate', cellRenderer: ({ value }: { value: string }) => formatTableDate(value) },
            { headerName: 'End Date', field: 'endDate', cellRenderer: ({ value }: { value: string | null }) => value ? formatTableDate(value) : 'Present' },
            { headerName: 'Slug', field: 'slug', hide: true },
          ]}
          apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/experiences`}
          FormComponent={ExperienceForm}
          onDataUpdate={refetch}
        />
      )}
    </div>
  );
};

export default ExperiencesAdmin;
