'use client';

import { useRouter } from 'next/navigation';

export const CityCard = ({ city }: { city: string }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to dashboard with city parameter
    router.push(`/dashboard?city=${encodeURIComponent(city)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-md dark:hover:shadow-emerald-900/50 transition-all transform hover:scale-105"
    >
      {city}
    </button>
  );
};
