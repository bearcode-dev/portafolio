"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJSON } from '../../../lib/request-util';
import { ResourceCategoryType } from '../../components/types/types';
import CategoryForm from '../components/CategoryForm';
import CRUDTable from '@/app/components/dashboard/CRUDTable';

const fetchCategories = async (): Promise<ResourceCategoryType[]> => {
  const data = await fetchJSON<ResourceCategoryType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
  return data ?? [];
};

const CategoriesAdmin = () => {
  const { isPending, isError, data: categories, error, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isPending) return <div>Loading categories...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h2 className="pt-2 text-center">Categories</h2>
      <div className="p-8 my-4">
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
    </div>
  );
};

export default CategoriesAdmin;
