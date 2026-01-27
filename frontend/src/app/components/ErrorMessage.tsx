import React from "react";

interface ErrorMessageProps {
  message: string | null;
  onClose: () => void;
}

export default function ErrorMessage({
  message,
  onClose,
}: ErrorMessageProps): React.ReactElement | null {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 dark:bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg dark:shadow-red-900/50 flex items-center justify-between border border-red-600 dark:border-red-700 transition-colors">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 font-bold text-lg hover:opacity-80 transition-opacity"
        aria-label="Close error message"
      >
        &times;
      </button>
    </div>
  );
}
