"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FolderTree } from 'lucide-react';
import { fetchJSON } from '../../../lib/request-util';
import { ResourceCategoryType } from '../../components/types/types';
import CategoryForm from '../components/CategoryForm';
import CRUDTable from '@/app/components/dashboard/CRUDTable';
import PageHeader from '../components/PageHeader';

const fetchCategories = async (): Promise<ResourceCategoryType[]> => {
  const data = await fetchJSON<ResourceCategoryType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
  return data ?? [];
};

const CategoriesAdmin = () => {
  const { isPending, isError, data: categories, error, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isPending) return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div></div>;
  if (isError) return <div className="text-center py-12 text-red-600 dark:text-red-400">Error: {error?.message}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FolderTree}
        title="Categories"
        description="Organize your learning resources into categories"
      />
      {categories && (
        <CRUDTable
          entityName="Category"
          rowData={categories}
          columnDefs={[
            { headerName: 'Name', field: 'name' },
            { headerName: 'Slug', field: 'slug' },
          ]}
          apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/categories`}
          FormComponent={CategoryForm}
          onDataUpdate={refetch}
        />
      )}
    </div>
  );
};

export default CategoriesAdmin;
