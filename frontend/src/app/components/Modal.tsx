"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/50 p-8 max-w-md w-full border border-slate-200 dark:border-slate-700 transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 text-2xl transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}
