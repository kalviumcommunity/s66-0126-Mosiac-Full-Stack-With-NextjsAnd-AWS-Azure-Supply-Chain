"use client";

import React, { useState } from "react";
import axios from "axios";
import { Cloud, AlertCircle, Loader } from "lucide-react";

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

export default function WeatherSearch(): React.ReactElement {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call the backend API running on port 5000
      const response = await axios.get(`http://localhost:5000/api/weather`, {
        params: { city: city.trim() },
      });

      setWeather(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError(`City "${city}" not found. Please try another city.`);
        } else if (err.response?.status === 500) {
          setError("Backend API error. Is the backend running on port 5000?");
        } else {
          setError(err.response?.data?.error || "Failed to fetch weather data");
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 mb-6 shadow-lg">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter city name (e.g., London, Paris, Tokyo)..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Cloud className="w-4 h-4" />
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Weather Data Display */}
      {weather && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* City */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Location</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{weather.city}</p>
          </div>

          {/* Temperature */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Temperature</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{weather.temperature}°C</p>
          </div>

          {/* Humidity */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Humidity</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{weather.humidity}%</p>
          </div>

          {/* Wind Speed */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Wind Speed</p>
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{weather.windSpeed} m/s</p>
          </div>

          {/* Condition */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Condition</p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{weather.condition}</p>
          </div>
        </div>
      )}

      {/* Instructional Text */}
      {!weather && !error && (
        <p className="text-slate-600 dark:text-slate-400 text-sm text-center py-8">
          🌍 Search for any city to see real-time weather data
        </p>
      )}
    </div>
  );
}
