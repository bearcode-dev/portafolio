import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Modal from '../modal/Modal';
import DeleteModal from '../modal/DeleteModal';


type CRUDTableProps = {
    entityName: string;
    rowData: any[];
    columnDefs: any[];
    apiEndpoint: string;
    FormComponent: React.FC<any>; // Componente de formulario para crear/editar
    onDataUpdate: () => void;
};

const CRUDTable: React.FC<CRUDTableProps> = ({ entityName, rowData, columnDefs, apiEndpoint, FormComponent, onDataUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemSlugToDelete, setItemSlugToDelete] = useState<string | null>(null);

    const gridApiRef = useRef<any>(null);

    const onGridReady = (params: any) => {
        gridApiRef.current = params.api;
    };

    const toggleModal = (modalType: 'edit' | 'delete', isOpen: boolean, data?: any | string | null) => {
        if (modalType === 'edit') {
            setEditData(isOpen ? data : null);
            setIsModalOpen(isOpen);
        } else {
            setItemSlugToDelete(isOpen ? (data as string) : null);
            setDeleteModalOpen(isOpen);
        }
    };

    const handleDelete = async () => {
        if (!itemSlugToDelete) return;

        try {
            const response = await fetch(`${apiEndpoint}/${itemSlugToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete the ${entityName}`);
            }

            onDataUpdate();
        } catch (error) {
            console.error(`Error deleting ${entityName}:`, error);
        } finally {
            toggleModal('delete', false);
        }
    };

    const handleFormSubmit = async (formData: any) => {
        try {
            const method = editData ? 'PUT' : 'POST';
            const response = await fetch(apiEndpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to save the ${entityName}`);
            }

            setIsModalOpen(false);
            onDataUpdate();
        } catch (error) {
            console.error(`Error saving ${entityName}:`, error);
        }
    };

    const renderActionsCell = (params: any) => (
        <div className='py-1 items-center'>
            <button
                onClick={() => toggleModal('edit', true, params.data)}
                className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
                Edit
            </button>
            <button
                onClick={() => toggleModal('delete', true, params.data.slug)}
                className="bg-red-500 text-white px-2 py-1 rounded"
            >
                Delete
            </button>
        </div>
    );

    return (
        <>
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <button
                    onClick={() => toggleModal('edit', true)}
                    className='bg-blue-500 text-white px-3 py-1 rounded mb-4'
                >
                    Add {entityName}
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

            <Modal
                isOpen={isModalOpen}
                onClose={() => toggleModal('edit', false)}
                title={editData ? `Edit ${entityName}` : `Create New ${entityName}`}
                footer={
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => toggleModal('edit', false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button form="formComponent" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                }
            >
                <FormComponent initialData={editData} onSubmit={handleFormSubmit} />
            </Modal>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => toggleModal('delete', false)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default CRUDTable;
