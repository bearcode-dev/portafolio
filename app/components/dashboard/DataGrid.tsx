"use client"
import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Delete, Edit } from 'lucide-react';
import DeleteModal from '../modal/DeleteModal';
import AddExperience, { ExperienceFormData } from './AddExperience';
import Modal from '../modal/Modal';


type DataGridProps = {
    rowData: any[],
    columnDefs: any[],
    apiEndpoint: string,
    onDataUpdate: (updatedData: any) => void,
};

const DataGrid: React.FC<DataGridProps> = ({ rowData, columnDefs, apiEndpoint ,onDataUpdate}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<ExperienceFormData | undefined>(undefined);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

    const gridApiRef = useRef<any>(null);

    const onGridReady = (params: any) => {
        gridApiRef.current = params.api;
    };

    const toggleModal = (modalType: 'edit' | 'delete', isOpen: boolean, data?: ExperienceFormData | string | null) => {
        
        console.log('toggle modal data:', data);
        if (modalType === 'edit') {
            if (isOpen && data) {
                setEditData(data as ExperienceFormData);
            } else {
                setEditData(undefined);
            }
            setIsModalOpen(isOpen);
        } else {
            setItemIdToDelete(isOpen ? (data as string) : null);
            setDeleteModalOpen(isOpen);
        }
    };

    const handleDelete = async () => {
        if (!itemIdToDelete) return;

        try {
            const response = await fetch(`${apiEndpoint}/${itemIdToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the item');
            }

            // Update the grid data after successful deletion
            console.log('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            toggleModal('delete', false);
        }
    };

    const onExportClick = () => {
        if (gridApiRef.current) {
            gridApiRef.current.exportDataAsCsv();
        } else {
            console.error('Grid API not ready');
        }
    };

    const handleFormSubmit = (updatedData: ExperienceFormData) => {
        console.log('Form submitted with:', updatedData);
        setIsModalOpen(false);
        // Optionally, refresh or update the grid data
    };

    const renderActionsCell = (params: any) => (
        <div className='py-1 items-center'>
            <button
                onClick={() => toggleModal('edit', true, params.data)}
                className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
                <Edit />
            </button>
            <button
                onClick={() => toggleModal('delete', true, params.data.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
            >
                <Delete />
            </button>
        </div>
    );

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => toggleModal('edit', false)}
                title='Create New Experience'
                footer={
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => toggleModal('edit', false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button form="newRecordForm" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                }
            >
                <AddExperience initialData={editData} onSubmit={handleFormSubmit} />
            </Modal>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => toggleModal('delete', false)}
                onConfirm={handleDelete}
            />

            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <button onClick={onExportClick} className='bg-blue-500 text-white px-3 py-1 rounded mb-4'>
                    Export
                </button>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={rowData}
                    columnDefs={[
                        ...columnDefs,
                        {
                            headerName: 'Actions',
                            field: 'actions',
                            cellRenderer: renderActionsCell,
                        },
                    ]}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        editable: true,
                        sortable: true,
                        filter: true,
                    }}
                    tooltipShowDelay={0} // Optional: Show tooltips without delay
                    rowSelection="single"
                />
            </div>
        </>
    );
};

export default DataGrid;