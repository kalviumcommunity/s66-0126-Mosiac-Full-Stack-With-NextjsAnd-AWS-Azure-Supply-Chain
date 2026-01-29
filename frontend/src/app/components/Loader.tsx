import React from "react";

export default function Loader(): React.ReactElement {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
      <div className="rounded-full h-16 w-16 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-blue-400"></div>
    </div>
  );
}
