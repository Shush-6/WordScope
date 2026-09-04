import React, { useState, useEffect } from 'react';

export interface CustomToastOptions {
  message: string;
  status?: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastItem extends CustomToastOptions {
  id: number;
}

type ToastListener = (toast: ToastItem) => void;
const listeners: ToastListener[] = [];

/**
 * Trigger function supporting object parameters.
 * Usage: CustomToast({ message: "Error...", status: "error" })
 */
export function CustomToast({ message, status = 'info', duration = 3000 }: CustomToastOptions) {
  const newToast: ToastItem = {
    id: Date.now(),
    message,
    status,
    duration,
  };
  
  listeners.forEach((listener) => listener(newToast));
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleNewToast = (toast: ToastItem) => {
      setToasts((prev) => [...prev, toast]);

      // Auto dismiss
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration);
    };

    listeners.push(handleNewToast);

    return () => {
      const index = listeners.indexOf(handleNewToast);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getBackgroundColor = (status?: string) => {
    switch (status) {
      case 'success': return 'bg-green-600';
      case 'error':   return 'bg-red-600';
      case 'info':    
      default:        return 'bg-blue-600';
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getBackgroundColor(
            toast.status
          )} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[280px] max-w-md transition-all duration-300`}
        >
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 font-bold text-lg hover:opacity-75 focus:outline-none"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};