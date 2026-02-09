"use client";

import React, { useState, useEffect } from "react";
import { weatherService } from "@/services/weatherService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  timezone: number;
}

interface WeatherDisplayProps {
  city?: string;
  onWeatherUpdate?: (data: WeatherData) => void;
}

export default function WeatherDisplay({
  city,
  onWeatherUpdate,
}: WeatherDisplayProps): React.ReactElement {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(city ? true : false);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState(city || "");
  const [inputValue, setInputValue] = useState("");

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getWeatherByCity(cityName);
      setWeather(data);
      onWeatherUpdate?.(data);
    } catch (err) {
      setError(`Failed to fetch weather for ${cityName}`);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchCity(inputValue.trim());
      fetchWeather(inputValue.trim());
      setInputValue("");
    }
  };

  if (loading && !weather) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search city..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {error && <ErrorMessage message={error} />}

      {weather && (
        <div className="space-y-6">
          {/* Main Weather Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold">{weather.name}</h1>
                <p className="text-blue-100">{weather.sys.country}</p>
              </div>
              <div className="text-right">
                <p className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</p>
                <p className="text-blue-100">Feels like {Math.round(weather.main.feels_like)}°C</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">
                {getWeatherIcon(weather.weather[0].main)}
              </div>
              <div>
                <p className="text-2xl font-semibold capitalize">
                  {weather.weather[0].main}
                </p>
                <p className="text-blue-100 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-blue-100">Humidity</p>
                <p className="text-2xl font-semibold">{weather.main.humidity}%</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-blue-100">Wind Speed</p>
                <p className="text-2xl font-semibold">{weather.wind.speed.toFixed(1)} m/s</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-blue-100">Pressure</p>
                <p className="text-2xl font-semibold">{weather.main.pressure} hPa</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-blue-100">Visibility</p>
                <p className="text-2xl font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temperature Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Temperature</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Current</span>
                  <span className="font-semibold dark:text-white">
                    {Math.round(weather.main.temp)}°C
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Feels Like</span>
                  <span className="font-semibold dark:text-white">
                    {Math.round(weather.main.feels_like)}°C
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Min</span>
                  <span className="font-semibold dark:text-white">
                    {Math.round(weather.main.temp_min)}°C
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Max</span>
                  <span className="font-semibold dark:text-white">
                    {Math.round(weather.main.temp_max)}°C
                  </span>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Weather Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Condition</span>
                  <span className="font-semibold capitalize dark:text-white">
                    {weather.weather[0].main}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Cloud Coverage</span>
                  <span className="font-semibold dark:text-white">
                    {weather.clouds.all}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Wind Direction</span>
                  <span className="font-semibold dark:text-white">
                    {weather.wind.deg}°
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Coordinates</span>
                  <span className="font-semibold dark:text-white text-sm">
                    {weather.coord.lat.toFixed(2)}°, {weather.coord.lon.toFixed(2)}°
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get weather emoji icon
function getWeatherIcon(condition: string): string {
  const icons: Record<string, string> = {
    Clouds: "☁️",
    Clear: "☀️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "💨",
    Haze: "🌫️",
    Dust: "🌪️",
    Fog: "🌫️",
    Sand: "🌪️",
    Ash: "💨",
    Squall: "💨",
    Tornado: "🌪️",
  };
  return icons[condition] || "🌤️";
}
