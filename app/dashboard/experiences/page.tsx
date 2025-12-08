"use client"

import React, { useRef, useState } from 'react'
import DataGrid from '../../components/dashboard/DataGrid';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ExperienceType } from '../../components/types/types';
import { fetchJSON } from '../../../lib/request-util';
import Modal from '../../components/modal/Modal';
import AddExperience from '../../components/dashboard/AddExperience';
import DeleteModal from '../../components/modal/DeleteModal';
import CRUDTable from '../../components/dashboard/CRUDTable';
import { useForm } from 'react-hook-form';

const fetchExperiences = async (): Promise<ExperienceType[] | []> => {

    const data = await fetchJSON<ExperienceType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/experiences`) as any;

    return data ?? [];
}


const Experiences = () => {
    const { isPending, isError, data: experiences, error, refetch } = useQuery({
        queryKey: ['experiences'],
        queryFn: fetchExperiences,
    });

    return (
        <div>
            <h2 className="pt-2 text-center">Experiences</h2>
            <div className="p-8 my-4">
                {isPending && <div>Loading...</div>}
                {isError && <div>Error: {error?.message}</div>}
                {!isPending && !isError && experiences && (
                    <CRUDTable
                        entityName="Experience"
                        rowData={experiences}
                        columnDefs={[
                            { headerName: 'Name', field: 'name' },
                            { headerName: 'Title', field: 'title' },
                            {
                                headerName: 'Start Date',
                                field: 'start',
                                cellRenderer: (params: any) => {
                                    if (!params.value) return ''; // Manejar casos donde no hay valor
                                    const date = new Date(params.value); // Convertir la cadena a Date
                                    return isNaN(date.getTime()) ? '' : date.toLocaleDateString(); 
                                },
                            },
                            {
                                headerName: 'End Date',
                                field: 'end',
                                cellRenderer: (params: any) => {
                                    if (!params.value) return ''; // Manejar casos donde no hay valor
                                    const date = new Date(params.value);
                                    return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
                                },
                            },
                            {
                                headerName: 'Image',
                                field: 'image',
                                cellRenderer: (params: any) => (
                                    <Image
                                        src={params.value as string}
                                        width={200}
                                        height={200}
                                        alt="Experience"
                                        className="object-cover w-10 h-10 rounded-full"
                                    />
                                ),
                            },
                        ]}
                        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/experiences`}
                        FormComponent={AddExperience}
                        onDataUpdate={refetch} // Pasa la función para actualizar los datos
                    />
                )}
            </div>
        </div>
    );
};

export default Experiences;

// const Experiences = () => {
//     const { isPending, isError, data: experiences, error, refetch } = useQuery({
//         queryKey: ['experiences'],
//         queryFn: fetchExperiences,
//     });

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editData, setEditData] = useState<any | null>(null);
//     const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//     const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

//     const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/experiences`;

//     const handleCreateOrEditRecord = async (data: any) => {
//         try {
//             const response = await fetch(apiEndpoint, {
//                 method: editData ? 'PUT' : 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to save the item');
//             }

//             console.log('Record Created/Edited:', data);
//             setIsModalOpen(false);
//             refetch(); // Actualizar los datos de la grilla
//         } catch (error) {
//             console.error('Error saving item:', error);
//         }
//     };

//     const handleOpenEditModal = (data: any | null = null) => {
//         setEditData(data);
//         setIsModalOpen(true);
//     };

//     async function handleDeleteRecord(): Promise<void> {
//         if (itemIdToDelete) {
//             try {
//                 const response = await fetch(`${apiEndpoint}/${itemIdToDelete}`, {
//                     method: 'DELETE',
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to delete the item');
//                 }

//                 console.log('Item deleted successfully');
//                 refetch(); // Refetch data to update the grid
//             } catch (error) {
//                 console.error('Error deleting item:', error);
//             } finally {
//                 setDeleteModalOpen(false);
//                 setItemIdToDelete(null);
//             }
//         }

//     }

//     const columnDefs = [
//         { headerName: 'Name', field: 'name' },
//         { headerName: 'Title', field: 'title' },
//         {
//             headerName: 'Start Date', field: 'start', cellRenderer: (params: any) => {
//                 if (!params.value) return '';
//                 const date = new Date(params.value);
//                 return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
//             },
//         },
//         {
//             headerName: 'End Date', field: 'end', cellRenderer: (params: any) => {
//                 if (!params.value) return '';
//                 const date = new Date(params.value);
//                 return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
//             },
//         },
//         {
//             headerName: 'Image',
//             field: 'image',
//             cellRenderer: (params: any) => {
//                 return (
//                     <Image
//                         src={params.value as string}
//                         alt="Experience Image"
//                         width={40}
//                         height={40}
//                         className="object-cover w-10 h-10 rounded-full"
//                     />
//                 );
//             },
//         },
//     ];


//     return (
//         <div>
//             <h2 className="pt-2 text-center">Experiences</h2>

//             <div className="p-8 my-4">
//                 <button
//                     onClick={() => handleOpenEditModal(null)} // Para agregar un nuevo registro
//                     className="px-3 py-1 mb-4 text-white bg-blue-500 rounded"
//                 >
//                     Add Experience
//                 </button>

//                 {isPending && <div>Loading...</div>}
//                 {isError && <div>Error: {error?.message}</div>}
//                 {!isPending && !isError && (
//                     <DataGrid
//                         rowData={experiences}
//                         columnDefs={columnDefs}
//                         apiEndpoint={apiEndpoint}
//                         onEdit={handleOpenEditModal}
//                         onDelete={(id: string) => {
//                             setItemIdToDelete(id);
//                             setDeleteModalOpen(true);
//                         }}
//                     />
//                 )}

//                 {/* Modal para agregar o editar una experiencia */}
//                 {isModalOpen && (
//                     <Modal
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                         title={editData ? 'Edit Experience' : 'Create New Experience'}
//                         footer={
//                             <div className="flex justify-end space-x-2">
//                                 <button
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="px-4 py-2 text-white bg-gray-500 rounded"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     form="newRecordForm"
//                                     className="px-4 py-2 text-white bg-blue-500 rounded"
//                                     onClick={() => document.getElementById('newRecordForm')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         }
//                     >
//                         <AddExperience initialData={editData} onSubmit={handleCreateOrEditRecord} />
//                     </Modal>
//                 )}

//                 {/* Modal para confirmar eliminación */}
//                 <DeleteModal
//                     isOpen={isDeleteModalOpen}
//                     onClose={() => setDeleteModalOpen(false)}
//                     onConfirm={handleDeleteRecord}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Experiences;