"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJSON } from '../../../lib/request-util';
import { SkillType } from '../../components/types/types';
import SkillForm from '../components/SkillForm';
import CRUDTable from '@/app/components/dashboard/CRUDTable';

const fetchSkills = async (): Promise<SkillType[]> => {
  const data = await fetchJSON<SkillType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);
  return data ?? [];
};

const SkillsAdmin = () => {
  const { isPending, isError, data: skills, error, refetch } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });

  if (isPending) return <div>Loading skills...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h2 className="pt-2 text-center">Skills</h2>
      <div className="p-8 my-4">
        {skills && (
          <CRUDTable
            entityName="Skill"
            rowData={skills}
            columnDefs={[
              { headerName: 'Name', field: 'name' },
              { headerName: 'Category', field: 'category' },
              { headerName: 'Proficiency', field: 'proficiency' },
            ]}
            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/skills`}
            FormComponent={SkillForm}
            onDataUpdate={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default SkillsAdmin;
