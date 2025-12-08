import React from 'react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background Overlay */}
            <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-lg mt-[-10%]">
                <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h2>
                <div className="flex justify-end">
                    <button
                        className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
