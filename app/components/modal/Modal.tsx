// components/Modal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, footer, size = 'xl' }) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
    };

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={handleBackgroundClick}
        >
            <div className={`relative w-full ${sizeClasses[size]} mx-4 max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    {title && (
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                    )}
                    <button
                        onClick={onClose}
                        className="ml-auto p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 px-6 py-4">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
