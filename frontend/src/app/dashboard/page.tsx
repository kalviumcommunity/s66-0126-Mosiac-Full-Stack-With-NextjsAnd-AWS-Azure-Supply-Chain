"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import TemperatureTrendChart from "./TemperatureTrendChart";

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

export default function Dashboard(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city') || '';
  
  const [city, setCity] = useState(cityParam);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);


  // Fetch weather data when city changes
  useEffect(() => {
    if (!city) return;
    
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather/city?city=${encodeURIComponent(city)}`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeatherData();
  }, [city]);

  // Get default city if no city is provided
  useEffect(() => {
    if (!city && typeof window !== 'undefined') {
      setCity('Mumbai'); // Default city
    }
  }, [city]);

  // Generate dynamic metrics based on weather data
  const metrics = weatherData ? [
    {
      title: "Temperature",
      value: `${Math.round(weatherData.main.temp)}°C`,
      trend: `Feels like ${Math.round(weatherData.main.feels_like)}°C`,
      status: weatherData.main.temp > 35 ? "High" : weatherData.main.temp < 10 ? "Low" : "Normal",
      color: "text-brand-blue",
      bg: "bg-blue-50",
    },
    {
      title: "Air Quality",
      value: weatherData.clouds.all <= 33 ? "Good" : weatherData.clouds.all <= 66 ? "Moderate" : "Poor",
      trend: `${weatherData.clouds.all}% Cloud Cover`,
      status: "Monitoring",
      color: "text-brand-green",
      bg: "bg-emerald-50",
    },
    {
      title: "Humidity",
      value: `${weatherData.main.humidity}%`,
      trend: weatherData.main.humidity > 70 ? "High" : weatherData.main.humidity < 30 ? "Low" : "Moderate",
      status: "Normal",
      color: "text-brand-orange",
      bg: "bg-amber-50",
    },
    {
      title: "Wind Speed",
      value: `${Math.round(weatherData.wind.speed)} m/s`,
      trend: weatherData.wind.speed > 10 ? "Windy" : "Calm",
      status: "Normal",
      color: "text-brand-red",
      bg: "bg-red-50",
    },
  ] : [
    {
      title: "Temperature",
      value: "Loading...",
      trend: "",
      status: "Normal",
      color: "text-brand-blue",
      bg: "bg-blue-50",
    },
    {
      title: "Air Quality",
      value: "Loading...",
      trend: "",
      status: "Healthy",
      color: "text-brand-green",
      bg: "bg-emerald-50",
    },
    {
      title: "Humidity",
      value: "Loading...",
      trend: "",
      status: "Normal",
      color: "text-brand-orange",
      bg: "bg-amber-50",
    },
    {
      title: "Wind Speed",
      value: "Loading...",
      trend: "",
      status: "Normal",
      color: "text-brand-red",
      bg: "bg-red-50",
    },
  ];

  // Generate alert based on temperature and weather conditions
  const getAlert = () => {
    if (!weatherData) return null;
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const cloudiness = weatherData.clouds.all;

    // High priority alerts
    if (temp > 40) {
      return {
        title: "🔥 Extreme Heat Alert",
        message: `Temperature is ${Math.round(temp)}°C. Avoid outdoor activities and stay hydrated.`,
        severity: "high",
      };
    } else if (temp > 35) {
      return {
        title: "⚠️ Heatwave Alert",
        message: `High temperature of ${Math.round(temp)}°C expected. Limit outdoor activities.`,
        severity: "high",
      };
    } else if (temp < 0) {
      return {
        title: "❄️ Freezing Alert",
        message: `Temperature at ${Math.round(temp)}°C. Risk of frost and ice. Bundle up!`,
        severity: "high",
      };
    } else if (humidity > 85) {
      return {
        title: "💧 High Humidity Alert",
        message: `Humidity at ${humidity}%. Expect muggy conditions and possible discomfort.`,
        severity: "high",
      };
    } else if (windSpeed > 15) {
      return {
        title: "💨 Strong Wind Alert",
        message: `Wind speed at ${Math.round(windSpeed)} m/s. Secure loose objects outdoors.`,
        severity: "high",
      };
    }
    
    // Medium priority alerts
    else if (temp > 30) {
      return {
        title: "☀️ Hot Weather Notice",
        message: `Temperature at ${Math.round(temp)}°C. Stay hydrated and use sun protection.`,
        severity: "medium",
      };
    } else if (temp < 5) {
      return {
        title: "🌡️ Cold Weather Notice",
        message: `Temperature at ${Math.round(temp)}°C. Dress warmly and protect exposed skin.`,
        severity: "medium",
      };
    } else if (humidity > 75) {
      return {
        title: "💧 Humid Conditions",
        message: `Humidity at ${humidity}%. Feels warmer than actual temperature.`,
        severity: "medium",
      };
    } else if (humidity < 30) {
      return {
        title: "🏜️ Low Humidity",
        message: `Humidity at ${humidity}%. Dry air may cause discomfort. Stay hydrated.`,
        severity: "medium",
      };
    } else if (windSpeed > 10) {
      return {
        title: "💨 Windy Conditions",
        message: `Wind speed at ${Math.round(windSpeed)} m/s. Breezy weather expected.`,
        severity: "medium",
      };
    } else if (cloudiness > 80) {
      return {
        title: "☁️ Overcast Sky",
        message: `Cloud cover at ${cloudiness}%. Cloudy conditions throughout the day.`,
        severity: "medium",
      };
    }
    
    // Default comfortable conditions notice
    else if (temp >= 18 && temp <= 25 && humidity >= 40 && humidity <= 65) {
      return {
        title: "✨ Ideal Climate Conditions",
        message: `Perfect weather! Temperature at ${Math.round(temp)}°C with ${humidity}% humidity. Great day for outdoor activities.`,
        severity: "medium",
      };
    } else if (temp >= 15 && temp <= 28) {
      return {
        title: "🌤️ Pleasant Weather",
        message: `Comfortable temperature at ${Math.round(temp)}°C. Enjoy the moderate climate conditions.`,
        severity: "medium",
      };
    }
    
    // Fallback for any other conditions
    else {
      return {
        title: "🌍 Current Climate Status",
        message: `Temperature: ${Math.round(temp)}°C, Humidity: ${humidity}%. Monitor local conditions and plan accordingly.`,
        severity: "medium",
      };
    }
  };

  const alert = getAlert();

  // Generate pollution data based on weather conditions
  const getPollutionData = () => {
    if (!weatherData) return [];
    
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    
    // Higher temp and lower wind speed = worse air quality
    const basePollution = Math.round(30 + (35 - Math.min(temp, 35)) * 2 - windSpeed * 5);
    
    return [
      { 
        label: "PM2.5", 
        value: Math.max(15, basePollution - 20), 
        max: 100, 
        color: "from-emerald-500 to-teal-500", 
        badgeColor: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" 
      },
      { 
        label: "PM10", 
        value: Math.max(30, basePollution), 
        max: 100, 
        color: "from-amber-500 to-orange-500", 
        badgeColor: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300" 
      },
      { 
        label: "NO2", 
        value: Math.max(5, Math.round((35 - Math.min(temp, 35)) + humidity / 10)), 
        max: 100, 
        color: "from-blue-500 to-cyan-500", 
        badgeColor: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300" 
      },
    ];
  };

  // Generate health recommendations based on weather
  const getHealthRecommendations = () => {
    if (!weatherData) return { title: "Loading...", message: "", recommendations: [], icon: "⚠️" };
    
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const pollution = getPollutionData();
    const avgPollution = Math.round((pollution[0].value + pollution[1].value) / 2);

    if (temp > 35 && avgPollution > 50) {
      return {
        title: "⚠️ Limit Outdoor Activities",
        message: "High temperature and pollution. Avoid prolonged outdoor exposure.",
        icon: "⚠️",
        recommendations: [
          "Use N95 masks if going outside",
          "Stay in air-conditioned areas",
          "Drink plenty of water",
          "Avoid peak hours (11 AM - 4 PM)"
        ]
      };
    } else if (temp > 35) {
      return {
        title: "🌡️ Hot Weather",
        message: "High temperatures. Take precautions.",
        icon: "🌡️",
        recommendations: [
          "Wear light, breathable clothing",
          "Stay hydrated",
          "Use sunscreen (SPF 30+)",
          "Avoid peak sun hours"
        ]
      };
    } else if (avgPollution > 50) {
      return {
        title: "💨 Poor Air Quality",
        message: "Air quality is compromised. Consider mask usage.",
        icon: "💨",
        recommendations: [
          "Wear N95 recommended",
          "Limit outdoor activities",
          "Keep windows closed",
          "Use air purifier indoors"
        ]
      };
    } else if (humidity > 75) {
      return {
        title: "💧 High Humidity",
        message: "Uncomfortable humidity levels. Stay cool.",
        icon: "💧",
        recommendations: [
          "Wear loose clothing",
          "Stay in shade",
          "Keep hydrated",
          "Avoid strenuous activities"
        ]
      };
    } else {
      return {
        title: "✅ Good Conditions",
        message: "Great conditions for outdoor activities.",
        icon: "✅",
        recommendations: [
          "Ideal for exercise",
          "Wear light clothing",
          "Good time for outdoor work",
          "Perfect for nature walks"
        ]
      };
    }
  };

  // Generate actions based on weather conditions
  const generateActions = () => {
    if (!weatherData) return [];

    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const cloudCover = weatherData.clouds.all;

    const actions: Array<{
      title: string;
      desc: string;
      severity: "high" | "medium" | "low";
      icon: string;
    }> = [];

    // Temperature-based actions
    if (temp > 40) {
      actions.push({
        title: "🔥 Extreme Heat Alert",
        desc: "Avoid all outdoor activities. Stay in air-conditioned spaces.",
        severity: "high",
        icon: "🔥",
      });
      actions.push({
        title: "💧 Drink Plenty of Water",
        desc: "Drink at least 4-5 liters of water daily to prevent dehydration.",
        severity: "high",
        icon: "💧",
      });
    } else if (temp > 35) {
      actions.push({
        title: "⚠️ High Temperature",
        desc: "Limit outdoor activities to early morning/evening.",
        severity: "high",
        icon: "⚠️",
      });
      actions.push({
        title: "🧴 Use Sunscreen",
        desc: "Apply SPF 30+ sunscreen every 2 hours when outdoors.",
        severity: "medium",
        icon: "🧴",
      });
    } else if (temp < 5) {
      actions.push({
        title: "❄️ Freezing Temperature",
        desc: "Wear multiple layers and limit outdoor exposure.",
        severity: "high",
        icon: "❄️",
      });
      actions.push({
        title: "🧣 Bundle Up",
        desc: "Wear warm clothing, hats, and gloves.",
        severity: "high",
        icon: "🧣",
      });
    } else if (temp > 28) {
      actions.push({
        title: "🌡️ Warm Weather",
        desc: "Comfortable for activities with sun protection.",
        severity: "low",
        icon: "🌡️",
      });
    } else {
      actions.push({
        title: "✅ Pleasant Temperature",
        desc: "Great conditions for outdoor activities.",
        severity: "low",
        icon: "✅",
      });
    }

    // Humidity-based actions
    if (humidity > 80) {
      actions.push({
        title: "💧 High Humidity",
        desc: `Humidity at ${humidity}%. Wear light, breathable clothing.`,
        severity: "medium",
        icon: "💧",
      });
    } else if (humidity < 30) {
      actions.push({
        title: "🏜️ Low Humidity",
        desc: `Humidity at ${humidity}%. Use moisturizer and drink water.`,
        severity: "low",
        icon: "🏜️",
      });
    }

    // Wind-based actions
    if (windSpeed > 10) {
      actions.push({
        title: "🌪️ Strong Winds",
        desc: "Secure outdoor items and be careful when going outside.",
        severity: "medium",
        icon: "🌪️",
      });
    }

    // Cloud cover actions
    if (cloudCover < 10) {
      actions.push({
        title: "☀️ Clear Skies",
        desc: "Strong UV rays. Use sun protection when outside.",
        severity: "medium",
        icon: "☀️",
      });
    }

    return actions;
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-[73px] z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
              {city || 'Select a city'}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Updated {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Alert Banner */}
        {alert ? (
          <div className={`p-6 rounded-xl border-l-4 flex items-center justify-between gap-4 shadow-lg hover:shadow-xl transition-all duration-200 ${
            alert.severity === 'high' 
              ? 'border-red-500 bg-red-50 dark:bg-red-950/40' 
              : 'border-amber-500 bg-amber-50 dark:bg-amber-950/40'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{alert.title.split(' ')[0]}</span>
              <div>
                <h3 className={`font-semibold text-base ${
                  alert.severity === 'high' 
                    ? 'text-red-900 dark:text-red-100' 
                    : 'text-amber-900 dark:text-amber-100'
                }`}>{alert.title}</h3>
                <p className={`text-sm ${
                  alert.severity === 'high' 
                    ? 'text-red-700 dark:text-red-200' 
                    : 'text-amber-700 dark:text-amber-200'
                }`}>{alert.message}</p>
              </div>
            </div>
            <button 
              onClick={() => router.push(`/dashboard/actions?city=${encodeURIComponent(city)}`)}
              className={`px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors flex-shrink-0 shadow-md hover:shadow-lg ${
                alert.severity === 'high' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              Take Action
            </button>
          </div>
        ) : null}

        {/* Main Content */}
        {city ? (
          <>
            {/* Weather Display */}
            <WeatherDisplay city={city} />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => {
                const metricColors = {
                  0: "border-l-4 border-red-500 bg-red-50 dark:bg-red-950/30",
                  1: "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30",
                  2: "border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30",
                  3: "border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                };

                return (
                  <div key={index} className={`rounded-xl p-6 transition-all duration-200 shadow-lg hover:shadow-xl ${metricColors[index]}`}>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-3">{metric.title}</p>
                    <div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">{metric.trend}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="mb-8 p-8 bg-slate-100 dark:bg-slate-800 rounded-2xl text-center">
            <p className="text-slate-600 dark:text-slate-400">Loading location...</p>
          </div>
        )}

        {/* Temperature Trend Chart */}
        {city && weatherData && <TemperatureTrendChart city={city} />}
      </div>
    </div>
  );
}
