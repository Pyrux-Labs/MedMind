"use client";

import { useEffect } from "react";

interface ToastProps {
    message: string;
    visible: boolean;
    onHide: () => void;
}

const Toast = ({ message, visible, onHide }: ToastProps) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onHide, 3200);
            return () => clearTimeout(timer);
        }
    }, [visible, onHide]);

    if (!visible) return null;

    return (
        <div className="subtitle text-center justify-center w-1/3 bg-main-bg fixed bottom-8 inset-x-0 mx-auto z-50 px-6 py-3 rounded-xl animate-toast-slide border border-secondary-color shadow-custom">
            {message}
        </div>
    );
};

export default Toast;
