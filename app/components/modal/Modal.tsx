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
                <div className="flex fixed inset-0 justify-center items-center bg-black bg-opacity-50"
                    onClick={handleBackgroundClick} // Close modal when clicking outside
                >
                    <div className="overflow-auto relative p-6 w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-lg">
                        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
                            <X />
                        </button>
                        {title && <h2 className="mb-4 text-xl">{title}</h2>}
                        <div className="mb-4">
                            {children}
                        </div>
                        {footer && (
                            <div className="pt-4 mt-4 border-t">
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
