// components/Modal.tsx
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../../../@/components/ui/dialog';
import { X } from 'lucide-react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, footer }) => {
    if (!isOpen) return null;
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={handleBackgroundClick} // Close modal when clicking outside
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md max-h-screen overflow-auto">
                        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
                            <X />
                        </button>
                        {title && <h2 className="text-xl mb-4">{title}</h2>}
                        <div className="mb-4">
                            {children}
                        </div>
                        {footer && (
                            <div className="border-t mt-4 pt-4">
                                {footer}
                            </div>
                        )}

                    </div>

                </div>
            </DialogContent>

        </Dialog>
    );
};

export default Modal;
