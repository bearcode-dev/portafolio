import React from 'react';
import { AlertTriangle } from 'lucide-react';

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
            <div className="bg-black/50 dark:bg-black/70 absolute inset-0" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl z-10 w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            Confirm Deletion
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Are you sure you want to delete this item? This action cannot be undone.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-medium"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
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
