'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/dashboard?city=${encodeURIComponent(city.trim())}`);
      setCity('');
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 flex items-center gap-2 mb-8 max-w-2xl mx-auto hover:shadow-2xl transition-shadow"
    >
      <div className="flex-1 flex items-center gap-3 px-4">
        <svg
          className="w-5 h-5 text-slate-400 dark:text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for your city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 dark:from-blue-500 dark:to-emerald-500 dark:hover:from-blue-600 dark:hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
      >
        Search
      </button>
    </form>
  );
};
