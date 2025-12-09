"use client"

import React from 'react'
import { BookOpen } from 'lucide-react';
import CRUDTable from '../../../app/components/dashboard/CRUDTable';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ResourceType } from '../../../app/components/types/types';
import { fetchJSON } from '../../../lib/request-util';
import { formatTableDate } from '../../../lib/date-utils';
import ResourceForm from '../../admin/components/ResourceForm';
import PageHeader from '../components/PageHeader';

const fetchResources = async (): Promise<ResourceType[] | []> => {
    const data = await fetchJSON<ResourceType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/resources`) as any;
    return data ?? [];
}

const ResourcesAdmin = () => {
    const { isPending, isError, data: resources, error, refetch } = useQuery({
        queryKey: ['resources'],
        queryFn: fetchResources,
    });

    if (isPending) return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div></div>;
    if (isError) return <div className="text-center py-12 text-red-600 dark:text-red-400">Error: {error?.message}</div>;

    return (
        <div className="space-y-6">
            <PageHeader
                icon={BookOpen}
                title="Resources"
                description="Curate learning resources for your portfolio visitors"
            />
            {resources && (
                <CRUDTable
                    entityName="Resource"
                    rowData={resources}
                    columnDefs={[
                        { headerName: 'Title', field: 'title' },
                        { headerName: 'Type', field: 'type' },
                        { headerName: 'Author', field: 'author' },
                        {
                            headerName: 'Published At',
                            field: 'publishedAt',
                            cellRenderer: (params: any) => formatTableDate(params.value),
                        },
                        {
                            headerName: 'Cover Image',
                            field: 'coverImage',
                            cellRenderer: (params: any) => (
                                <Image
                                    src={params.value as string}
                                    width={40}
                                    height={40}
                                    alt="Resource Cover"
                                    className="object-cover w-10 h-10 rounded"
                                />
                            ),
                        },
                        {
                            headerName: 'Category',
                            field: 'category.name',
                        },
                    ]}
                    apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/resources`}
                    FormComponent={ResourceForm}
                    onDataUpdate={refetch}
                />
            )}
        </div>
    );
};

export default ResourcesAdmin;
