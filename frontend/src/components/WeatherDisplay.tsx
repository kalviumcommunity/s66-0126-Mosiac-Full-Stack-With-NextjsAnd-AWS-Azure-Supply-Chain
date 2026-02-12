'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export const WeatherDisplay = ({ city }: { city: string }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/weather/city?city=${encodeURIComponent(city)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch weather for ${city}`);
        }

        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (!city) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
        <p className="text-slate-600 dark:text-slate-400">Select a city to view weather data</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="text-slate-600 dark:text-slate-400 mt-4">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
        <p className="text-red-600 dark:text-red-400">❌ {error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
        <p className="text-slate-600 dark:text-slate-400">No weather data available</p>
      </div>
    );
  }

  const getWeatherIcon = (icon: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '⛅',
      '02n': '🌤️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌧️',
      '09n': '🌧️',
      '10d': '🌦️',
      '10n': '🌧️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '❄️',
      '13n': '❄️',
      '50d': '🌫️',
      '50n': '🌫️',
    };
    return iconMap[icon] || '🌤️';
  };

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <div className="bg-gradient-to-br from-blue-400 to-emerald-400 dark:from-blue-600 dark:to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg opacity-90">{weather.weather[0].description}</p>
          </div>
          <div className="text-9xl">{getWeatherIcon(weather.weather[0].icon)}</div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <p className="text-sm opacity-75 mb-1">Temperature</p>
            <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="text-sm opacity-75">Feels like {Math.round(weather.main.feels_like)}°C</p>
          </div>
          <div>
            <p className="text-sm opacity-75 mb-1">Conditions</p>
            <p className="text-xl font-semibold capitalize">{weather.weather[0].main}</p>
            <p className="text-sm opacity-75 capitalize">{weather.weather[0].description}</p>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">💧 Humidity</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {weather.main.humidity}%
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">💨 Wind Speed</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {Math.round(weather.wind.speed)} m/s
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">🌥️ Cloudiness</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {weather.clouds.all}%
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">🔽 Pressure</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {weather.main.pressure} hPa
          </p>
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <p className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">🌅 Sunrise</p>
          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
          <p className="text-indigo-900 dark:text-indigo-100 font-semibold mb-2">🌇 Sunset</p>
          <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
