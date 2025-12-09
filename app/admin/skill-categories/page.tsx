"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FolderTree } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { SkillCategoryType } from '../../components/types/types';
import SkillCategoryForm from '../components/SkillCategoryForm';
import CRUDTable from '@/app/components/dashboard/CRUDTable';
import PageHeader from '../components/PageHeader';

const fetchSkillCategories = async (): Promise<SkillCategoryType[]> => {
  const data = await fetchJSON<SkillCategoryType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/skill-categories`);
  return data ?? [];
};

const SkillCategoriesAdmin = () => {
  const { isPending, isError, data: categories, error, refetch } = useQuery({
    queryKey: ['skill-categories'],
    queryFn: fetchSkillCategories,
  });

  if (isPending) return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div></div>;
  if (isError) return <div className="text-center py-12 text-red-600 dark:text-red-400">Error: {error?.message}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FolderTree}
        title="Skill Categories"
        description="Organize your skills into categories"
      />
      {categories && (
        <CRUDTable
          entityName="Skill Category"
          rowData={categories}
          columnDefs={[
            { headerName: 'Name', field: 'name' },
            {
              headerName: 'Icon',
              field: 'icon',
              cellRenderer: ({ value }: { value?: string }) => value || '-'
            },
            {
              headerName: 'Skills Count',
              field: 'skills',
              cellRenderer: ({ value }: { value: any[] }) => value?.length || 0
            },
          ]}
          apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/skill-categories`}
          FormComponent={SkillCategoryForm}
          onDataUpdate={refetch}
        />
      )}
    </div>
  );
};

export default SkillCategoriesAdmin;
