"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function ActionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "Not Selected";
  
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather/city?city=${encodeURIComponent(city)}`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (city && city !== "Not Selected") {
      fetchWeatherData();
    } else {
      setLoading(false);
    }
  }, [city]);

  // Generate dynamic actions based on weather conditions
  const generateActions = () => {
    if (!weatherData) {
      return [];
    }

    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const cloudCover = weatherData.clouds.all;

    const actions: Array<{
      category: string;
      items: Array<{
        title: string;
        desc: string;
        severity: "high" | "medium" | "low";
        icon: string;
      }>;
    }> = [];

    // Temperature-based actions
    const tempActions = [];
    if (temp > 40) {
      tempActions.push({
        title: "🔥 Extreme Heat Alert",
        desc: `Temperature is ${Math.round(temp)}°C. Avoid all outdoor activities. Stay in air-conditioned spaces.`,
        severity: "high" as const,
        icon: "🔥",
      });
      tempActions.push({
        title: "💧 Drink Plenty of Water",
        desc: "Drink at least 4-5 liters of water daily to prevent dehydration.",
        severity: "high" as const,
        icon: "💧",
      });
    } else if (temp > 35) {
      tempActions.push({
        title: "⚠️ High Temperature",
        desc: `Temperature around ${Math.round(temp)}°C. Limit outdoor activities to early morning/evening.`,
        severity: "high" as const,
        icon: "⚠️",
      });
      tempActions.push({
        title: "🧴 Use Sunscreen",
        desc: "Apply SPF 30+ sunscreen every 2 hours when outdoors.",
        severity: "medium" as const,
        icon: "🧴",
      });
    } else if (temp < 5) {
      tempActions.push({
        title: "❄️ Freezing Temperature",
        desc: `Temperature dropped to ${Math.round(temp)}°C. Wear multiple layers and limit outdoor exposure.`,
        severity: "high" as const,
        icon: "❄️",
      });
      tempActions.push({
        title: "🧣 Bundle Up",
        desc: "Wear thermal clothing, warm coat, and gloves. Protect exposed skin.",
        severity: "medium" as const,
        icon: "🧣",
      });
    } else if (temp > 28) {
      tempActions.push({
        title: "🌡️ Warm Weather",
        desc: `Temperature around ${Math.round(temp)}°C. Comfortable for outdoor activities with sun protection.`,
        severity: "low" as const,
        icon: "🌡️",
      });
      tempActions.push({
        title: "☀️ Stay Protected",
        desc: "Wear light clothing, hat, and apply sunscreen. Stay hydrated.",
        severity: "medium" as const,
        icon: "☀️",
      });
    } else {
      tempActions.push({
        title: "🌤️ Mild Temperature",
        desc: `Temperature around ${Math.round(temp)}°C. Perfect for outdoor activities.`,
        severity: "low" as const,
        icon: "🌤️",
      });
    }

    if (tempActions.length > 0) {
      actions.push({ category: "🌡️ Temperature", items: tempActions });
    }

    // Humidity-based actions
    const humidityActions = [];
    if (humidity > 80) {
      humidityActions.push({
        title: "💧 High Humidity",
        desc: `Humidity at ${humidity}%. Air feels heavy. Increase fluid intake.`,
        severity: "medium" as const,
        icon: "💧",
      });
      humidityActions.push({
        title: "👕 Wear Light Clothing",
        desc: "Cotton and moisture-wicking fabrics help with sweat management.",
        severity: "low" as const,
        icon: "👕",
      });
    } else if (humidity < 30) {
      humidityActions.push({
        title: "🏜️ Low Humidity",
        desc: `Humidity at ${humidity}%. Air is very dry. Use moisturizer.`,
        severity: "medium" as const,
        icon: "🏜️",
      });
      humidityActions.push({
        title: "💧 Stay Hydrated",
        desc: "Drink water regularly and use a humidifier if available.",
        severity: "low" as const,
        icon: "💧",
      });
    }

    if (humidityActions.length > 0) {
      actions.push({ category: "💨 Humidity", items: humidityActions });
    }

    // Wind-based actions
    const windActions = [];
    if (windSpeed > 10) {
      windActions.push({
        title: "🌪️ Strong Wind",
        desc: `Wind speed at ${windSpeed.toFixed(1)} m/s. Secure loose items and stay alert.`,
        severity: "high" as const,
        icon: "🌪️",
      });
      windActions.push({
        title: "⚠️ Avoid Outdoor Activities",
        desc: "Strong winds can be hazardous. Stay indoors or in protected areas.",
        severity: "medium" as const,
        icon: "⚠️",
      });
    } else if (windSpeed > 5) {
      windActions.push({
        title: "💨 Moderate Wind",
        desc: `Wind speed at ${windSpeed.toFixed(1)} m/s. Good for outdoor activities.`,
        severity: "low" as const,
        icon: "💨",
      });
    }

    if (windActions.length > 0) {
      actions.push({ category: "💨 Wind", items: windActions });
    }

    // Cloud cover actions
    const cloudActions = [];
    if (cloudCover > 70) {
      cloudActions.push({
        title: "☁️ Heavy Cloud Cover",
        desc: "Overcast sky. Good for outdoor activities, minimal sun exposure risk.",
        severity: "low" as const,
        icon: "☁️",
      });
      cloudActions.push({
        title: "🏞️ Outdoor Friendly",
        desc: "Less UV radiation today. Great day for outdoor work or sports.",
        severity: "low" as const,
        icon: "🏞️",
      });
    } else if (cloudCover < 10) {
      cloudActions.push({
        title: "☀️ Clear Skies",
        desc: "Sunny day with strong UV radiation. Use sunscreen SPF 30+.",
        severity: "high" as const,
        icon: "☀️",
      });
      cloudActions.push({
        title: "🕶️ UV Protection",
        desc: "Wear sunglasses and a hat. Avoid peak sun hours (11 AM - 4 PM).",
        severity: "medium" as const,
        icon: "🕶️",
      });
    }

    if (cloudActions.length > 0) {
      actions.push({ category: "⛅ Sky", items: cloudActions });
    }

    // Community and Environmental Actions (always included)
    actions.push({
      category: "🌍 Community & Environment",
      items: [
        {
          title: "🌳 Plant Trees",
          desc: "Support local tree plantation drives. Trees help combat climate change and improve air quality.",
          severity: "low" as const,
          icon: "🌳",
        },
        {
          title: "♻️ Reduce Carbon Footprint",
          desc: "Use public transport, carpool, or cycle when possible. Reduce emissions.",
          severity: "low" as const,
          icon: "♻️",
        },
        {
          title: "💡 Energy Saving",
          desc: "Use LED bulbs, turn off electronics, and optimize HVAC usage.",
          severity: "low" as const,
          icon: "💡",
        },
        {
          title: "🌱 Support Green Initiatives",
          desc: "Join community environmental projects and support sustainability.",
          severity: "low" as const,
          icon: "🌱",
        },
      ],
    });

    return actions;
  };

  const actions = generateActions();

  const toggleAction = (title: string) => {
    setCompletedActions((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const severityColors = {
    high: "bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500",
    medium: "bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500",
    low: "bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500",
  };

  const severityBadges = {
    high: "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-200",
    medium: "bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-200",
    low: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading actions for {city}...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            🌍 Climate Actions for {city}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Recommended actions based on current weather conditions
          </p>
        </div>

        {/* Weather Summary */}
        {weatherData && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Temperature</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {Math.round(weatherData.main.temp)}°C
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Humidity</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {weatherData.main.humidity}%
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Wind Speed</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  {weatherData.wind.speed.toFixed(1)} m/s
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Cloud Cover</p>
                <p className="text-2xl font-bold text-slate-600 dark:text-slate-300">
                  {weatherData.clouds.all}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions Grid */}
        <div className="space-y-6">
          {actions.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((action, itemIndex) => {
                  const isCompleted = completedActions.includes(action.title);
                  return (
                    <div
                      key={itemIndex}
                      onClick={() => toggleAction(action.title)}
                      className={`p-5 rounded-xl cursor-pointer transition-all duration-200 ${
                        severityColors[action.severity]
                      } ${isCompleted ? "opacity-60 bg-slate-100 dark:bg-slate-800" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0 mt-1">{action.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3
                              className={`font-semibold ${
                                isCompleted
                                  ? "text-slate-600 dark:text-slate-400 line-through"
                                  : "text-slate-900 dark:text-white"
                              }`}
                            >
                              {action.title}
                            </h3>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                                severityBadges[action.severity]
                              }`}
                            >
                              {action.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {action.desc}
                          </p>
                          {isCompleted && (
                            <div className="mt-2 flex items-center gap-2">
                              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Action Stats */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-emerald-500 dark:from-blue-600 dark:to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">Your Progress</h3>
              <p className="text-blue-100">
                {completedActions.length} of {actions.reduce((sum, cat) => sum + cat.items.length, 0)} actions completed
              </p>
            </div>
            <div className="text-4xl font-bold">
              {Math.round((completedActions.length / actions.reduce((sum, cat) => sum + cat.items.length, 0)) * 100)}%
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{
                width: `${(completedActions.length / actions.reduce((sum, cat) => sum + cat.items.length, 0)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
