import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  className = "",
}: CardProps): React.ReactElement {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-slate-900/50 p-6 border border-slate-200 dark:border-slate-700 transition-colors ${className}`}>
      {title && <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>}
      {children}
    </div>
  );
}
