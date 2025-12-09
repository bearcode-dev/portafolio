"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Lightbulb } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { SkillType } from '../../components/types/types';
import SkillForm from '../components/SkillForm';
import CRUDTable from '@/app/components/dashboard/CRUDTable';
import PageHeader from '../components/PageHeader';

const fetchSkills = async (): Promise<SkillType[]> => {
  const data = await fetchJSON<SkillType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);
  return data ?? [];
};

const SkillsAdmin = () => {
  const { isPending, isError, data: skills, error, refetch } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });

  if (isPending) return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div></div>;
  if (isError) return <div className="text-center py-12 text-red-600 dark:text-red-400">Error: {error?.message}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Lightbulb}
        title="Skills"
        description="Manage your technical skills and expertise"
      />
      {skills && (
        <CRUDTable
          entityName="Skill"
          rowData={skills}
          columnDefs={[
            { headerName: 'Name', field: 'name' },
            {
              headerName: 'Category',
              field: 'category.name',
              cellRenderer: ({ data }: { data: SkillType }) => data.category?.name || 'N/A'
            },
            { headerName: 'Proficiency', field: 'proficiency', cellRenderer: ({ value }: { value: number }) => `${value}%` },
          ]}
          apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/skills`}
          FormComponent={SkillForm}
          onDataUpdate={refetch}
        />
      )}
    </div>
  );
};

export default SkillsAdmin;
