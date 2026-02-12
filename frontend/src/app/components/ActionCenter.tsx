"use client";

import { useState } from "react";

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

interface ActionCenterProps {
  isOpen: boolean;
  onClose: () => void;
  city?: string;
  weatherData?: WeatherData | null;
}

export default function ActionCenter({ isOpen, onClose, city = "Not Selected", weatherData }: ActionCenterProps) {
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  if (!isOpen) return null;

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
        desc: "Wear warm clothing, hats, and gloves. Check heating at home.",
        severity: "high" as const,
        icon: "🧣",
      });
    } else {
      tempActions.push({
        title: "✅ Pleasant Temperature",
        desc: `Temperature is comfortable at ${Math.round(temp)}°C. Great for outdoor activities.`,
        severity: "low" as const,
        icon: "✅",
      });
    }

    if (tempActions.length > 0) {
      actions.push({
        category: "🌡️ Temperature Actions",
        items: tempActions,
      });
    }

    // Humidity-based actions
    const humidityActions = [];
    if (humidity > 80) {
      humidityActions.push({
        title: "💧 High Humidity",
        desc: `Humidity at ${humidity}%. This increases discomfort and health risks.`,
        severity: "medium" as const,
        icon: "💧",
      });
      humidityActions.push({
        title: "👕 Wear Light Clothing",
        desc: "Choose loose, breathable fabrics like cotton to stay cool.",
        severity: "medium" as const,
        icon: "👕",
      });
    } else if (humidity < 30) {
      humidityActions.push({
        title: "🏜️ Dry Air",
        desc: `Low humidity (${humidity}%) can cause dry skin and respiratory issues.`,
        severity: "low" as const,
        icon: "🏜️",
      });
      humidityActions.push({
        title: "💧 Use Moisturizer",
        desc: "Apply moisturizer regularly and use a humidifier indoors.",
        severity: "low" as const,
        icon: "💧",
      });
    }

    if (humidityActions.length > 0) {
      actions.push({
        category: "💨 Humidity Actions",
        items: humidityActions,
      });
    }

    // Wind-based actions
    if (windSpeed > 10) {
      actions.push({
        category: "💨 Wind Actions",
        items: [
          {
            title: "🌪️ Strong Winds",
            desc: `Wind speed is ${Math.round(windSpeed)} m/s. Be careful outdoors.`,
            severity: "medium" as const,
            icon: "🌪️",
          },
          {
            title: "🏠 Secure Outdoor Items",
            desc: "Bring in plants, trash cans, and secure loose items.",
            severity: "medium" as const,
            icon: "🏠",
          },
        ],
      });
    }

    // Cloud cover / Air quality actions
    const airActions = [];
    if (cloudCover > 70) {
      airActions.push({
        title: "☁️ Heavy Cloud Cover",
        desc: "Limited sunlight today. Vitamin D synthesis may be reduced.",
        severity: "low" as const,
        icon: "☁️",
      });
      airActions.push({
        title: "🏃 Indoor Exercise",
        desc: "Consider indoor workouts or use time for indoor activities.",
        severity: "low" as const,
        icon: "🏃",
      });
    } else if (cloudCover < 10) {
      airActions.push({
        title: "☀️ Clear Skies",
        desc: "Strong UV rays today. Use protection when outside.",
        severity: "medium" as const,
        icon: "☀️",
      });
    }

    if (airActions.length > 0) {
      actions.push({
        category: "☁️ Sky & Light Actions",
        items: airActions,
      });
    }

    // Community/Environmental actions
    const communityActions = [];
    if (temp > 30) {
      communityActions.push({
        title: "🌳 Plant Trees",
        desc: "Support tree planting initiatives to increase green cover.",
        severity: "low" as const,
        icon: "🌳",
      });
    }
    communityActions.push({
      title: "♻️ Reduce Carbon Footprint",
      desc: "Use public transport or carpool to reduce emissions.",
      severity: "low" as const,
      icon: "♻️",
    });
    communityActions.push({
      title: "⚡ Save Energy",
      desc: "Use energy-efficient appliances and turn off lights when not needed.",
      severity: "low" as const,
      icon: "⚡",
    });

    actions.push({
      category: "🌍 Community & Environment",
      items: communityActions,
    });

    return actions;
  };

  const actions = generateActions();

  const toggleAction = (actionTitle: string) => {
    setCompletedActions((prev) =>
      prev.includes(actionTitle)
        ? prev.filter((a) => a !== actionTitle)
        : [...prev, actionTitle]
    );
  };

  const markAllComplete = () => {
    const allTitles = actions.flatMap((group) =>
      group.items.map((item) => item.title)
    );
    setCompletedActions(allTitles);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm transition-colors" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-slate-800 shadow-2xl dark:shadow-slate-950/50 flex flex-col transition-colors">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recommended Actions</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Climate-specific actions for {city}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400 dark:text-slate-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
            {actions.length > 0 ? (
              actions.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3 px-1">
                    {group.category}
                  </h3>
                  <div className="space-y-3">
                    {group.items.map((action, idx) => (
                      <div 
                        key={`${group.category}-${idx}`}
                        className={`p-4 rounded-2xl transition-all border-2 ${
                          completedActions.includes(action.title)
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                            : action.severity === "high"
                            ? "border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40"
                            : action.severity === "medium"
                            ? "border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/40"
                            : "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/40"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4
                            className={`font-semibold text-lg ${
                              completedActions.includes(action.title)
                                ? "text-emerald-900 dark:text-emerald-200 line-through"
                                : action.severity === "high"
                                ? "text-red-900 dark:text-red-200"
                                : action.severity === "medium"
                                ? "text-amber-900 dark:text-amber-200"
                                : "text-emerald-900 dark:text-emerald-200"
                            }`}
                          >
                            {action.icon} {action.title}
                          </h4>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                              completedActions.includes(action.title)
                                ? "bg-emerald-500 text-white"
                                : action.severity === "high"
                                ? "bg-red-500 text-white"
                                : action.severity === "medium"
                                ? "bg-amber-500 text-white"
                                : "bg-emerald-500 text-white"
                            }`}
                          >
                            {completedActions.includes(action.title) ? "Done" : action.severity}
                          </span>
                        </div>
                        <p
                          className={`text-sm mb-3 ${
                            completedActions.includes(action.title)
                              ? "text-emerald-700 dark:text-emerald-300"
                              : action.severity === "high"
                              ? "text-red-700 dark:text-red-300"
                              : action.severity === "medium"
                              ? "text-amber-700 dark:text-amber-300"
                              : "text-emerald-700 dark:text-emerald-300"
                          }`}
                        >
                          {action.desc}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleAction(action.title)}
                            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                              completedActions.includes(action.title)
                                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                : action.severity === "high"
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : action.severity === "medium"
                                ? "bg-amber-500 hover:bg-amber-600 text-white"
                                : "bg-emerald-500 hover:bg-emerald-600 text-white"
                            }`}
                          >
                            {completedActions.includes(action.title) ? "✓ Completed" : "Mark Done"}
                          </button>
                          <button
                            className={`px-3 py-2 rounded-lg transition-all ${
                              action.severity === "high"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50"
                                : action.severity === "medium"
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                                : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                            }`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                   
              onClick={markAllComplete}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold transition-all"
            
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                  Loading actions for {city}...
                </p>
              </div>
            )}

            <div className="pt-6">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-widest px-1">Settings</h3>
              <div className="space-y-3">
                {[
                  { label: "Push Notifications", enabled: true },
                  { label: "Critical Alerts Only", enabled: false },
                  { label: "Weekly Summary", enabled: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700/50">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
                    <button 
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        s.enabled ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                        s.enabled ? 'left-5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30">
            <button 
              onClick={markAllComplete}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold transition-all"
            >
              Mark All Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
