"use client"

import React from 'react'
import CRUDTable from '../../../app/components/dashboard/CRUDTable';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ResourceType } from '../../../app/components/types/types';
import { fetchJSON } from '../../../lib/request-util';
import ResourceForm from '../../admin/components/ResourceForm';

const fetchResources = async (): Promise<ResourceType[] | []> => {

    const data = await fetchJSON<ResourceType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/resources`) as any;

    return data ?? [];
}


const ResourcesAdmin = () => {
    const { isPending, isError, data: resources, error, refetch } = useQuery({
        queryKey: ['resources'],
        queryFn: fetchResources,
    });

    return (
        <div>
            <h2 className="pt-2 text-center">Resources</h2>
            <div className="p-8 my-4">
                {isPending && <div>Loading...</div>}
                {isError && <div>Error: {error?.message}</div>}
                {!isPending && !isError && resources && (
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
                                cellRenderer: (params: any) => {
                                    if (!params.value) return '';
                                    const date = new Date(params.value);
                                    return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
                                },
                            },
                            {
                                headerName: 'Cover Image',
                                field: 'coverImage',
                                cellRenderer: (params: any) => (
                                    <Image
                                        src={params.value as string}
                                        width={200}
                                        height={200}
                                        alt="Resource Cover"
                                        className="object-cover w-10 h-10 rounded-full"
                                    />
                                ),
                            },
                            {
                                headerName: 'Category',
                                field: 'category.name',
                            },
                        ]}
                        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/resources`}
                        FormComponent={ResourceForm} // Este componente lo crearemos después
                        onDataUpdate={refetch}
                    />
                )}
            </div>
        </div>
    );
};

export default ResourcesAdmin;
