import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Inbox, Plus, Search } from 'lucide-react';
import Modal from '../modal/Modal';
import DeleteModal from '../modal/DeleteModal';
import EmptyState from '../ui/empty-state';
import { toast } from 'sonner';


type CRUDTableProps = {
    entityName: string;
    rowData: any[];
    columnDefs: any[];
    apiEndpoint: string;
    FormComponent: React.FC<any>; // Componente de formulario para crear/editar
    onDataUpdate: () => void;
};

const CRUDTable: React.FC<CRUDTableProps> = ({ entityName, rowData, columnDefs, apiEndpoint, FormComponent, onDataUpdate }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<any | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemSlugToDelete, setItemSlugToDelete] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const gridApiRef = useRef<any>(null);

    useEffect(() => {
        // Read theme from DOM
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'light');
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (gridApiRef.current) {
            gridApiRef.current.setGridOption('quickFilterText', searchTerm);
        }
    }, [searchTerm]);

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

            toast.success(`${entityName} deleted successfully`, {
                description: 'The item has been removed.',
            });
            onDataUpdate();
        } catch (error) {
            toast.error(`Failed to delete ${entityName}`, {
                description: error instanceof Error ? error.message : 'An error occurred',
            });
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

            toast.success(`${entityName} ${editData ? 'updated' : 'created'} successfully`, {
                description: 'Your changes have been saved.',
            });
            setIsModalOpen(false);
            onDataUpdate();
        } catch (error) {
            toast.error(`Failed to save ${entityName}`, {
                description: error instanceof Error ? error.message : 'An error occurred',
            });
        }
    };

    const renderActionsCell = (params: any) => {
        const itemName = params.data.title || params.data.name || `${entityName} ${params.data.id}`;
        return (
            <div className='py-1 flex items-center gap-2'>
                <button
                    onClick={() => toggleModal('edit', true, params.data)}
                    className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors font-medium text-sm"
                    aria-label={`Edit ${itemName}`}
                >
                    Edit
                </button>
                <button
                    onClick={() => toggleModal('delete', true, params.data.slug)}
                    className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-colors font-medium text-sm"
                    aria-label={`Delete ${itemName}`}
                >
                    Delete
                </button>
            </div>
        );
    };

    // Show empty state if no data
    if (!rowData || rowData.length === 0) {
        return (
            <>
                <EmptyState
                    icon={Inbox}
                    title={`No ${entityName}s yet`}
                    description={`Get started by creating your first ${entityName.toLowerCase()}`}
                    action={{
                        label: `Create ${entityName}`,
                        onClick: () => toggleModal('edit', true),
                    }}
                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => toggleModal('edit', false)}
                    title={editData ? `Edit ${entityName}` : `Create New ${entityName}`}
                    footer={
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => toggleModal('edit', false)}
                                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button form="formComponent" className="bg-gradient-to-r from-brand-green to-brand-medium text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
                                Save
                            </button>
                        </div>
                    }
                >
                    <FormComponent initialData={editData} onSubmit={handleFormSubmit} />
                </Modal>
            </>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {/* Toolbar with search and add button */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={`Search ${entityName.toLowerCase()}s...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    </div>
                    <button
                        onClick={() => toggleModal('edit', true)}
                        className='bg-gradient-to-r from-brand-green to-brand-medium text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap'
                    >
                        <Plus className="w-4 h-4" />
                        Add {entityName}
                    </button>
                </div>

                {/* AG Grid Table */}
                <div className={theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'} style={{ height: 400, width: '100%' }}>
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
