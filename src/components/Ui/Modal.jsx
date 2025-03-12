import React, { useEffect } from 'react';

function Modal ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    closeOnEsc = true,
    closeOnOutsideClick = true,
    maxWidth = "md"
}) {
    useEffect(() => {
        const handleEscKey = (event) => {
            if (closeOnEsc && event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose, closeOnEsc]);

    // Handle clicks outside the modal
    const handleOutsideClick = (e) => {
        if (closeOnOutsideClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    // Size classes mapping
    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        full: "max-w-full"
    };

    const modalSizeClass = sizeClasses[maxWidth] || sizeClasses.md;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleOutsideClick}
        >
            <div className={`bg-white rounded-lg shadow-xl w-full ${modalSizeClass} overflow-hidden`}>
                {/* Modal header */}
                <div className="flex items-center justify-between p-4">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal body */}
                <div className="p-4 max-h-96 overflow-y-auto">
                    {children}
                </div>

                {/* Modal footer */}
                {footer && (
                    <div className="p-4 border-t flex justify-end space-x-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;