"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ActionCenter from "../components/ActionCenter";
import TemperatureTrendChart from "./TemperatureTrendChart";
import AirQualityChart from "./AirQualityChart";
import TrendsChart from "./TrendsChart";
import AirGasCompositionChart from "./AirGasCompositionChart";
import WeatherSearch from "./WeatherSearch";
import WeatherDisplay from "./WeatherDisplay";

export default function Dashboard(): React.ReactElement {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isActionCenterOpen, setIsActionCenterOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [airQualityData, setAirQualityData] = useState<any>(null);
  const popularCities = ["Delhi", "London", "Tokyo", "New York", "Mumbai", "Paris"];

  useEffect(() => {
    // Check if city is passed via URL query params
    const cityParam = searchParams.get("city");
    if (cityParam) {
      setSelectedCity(decodeURIComponent(cityParam));
    }
  }, [searchParams]);

  const getMetrics = () => {
    if (!weatherData || !forecastData) {
      return [
        {
          title: "Temperature",
          value: "—",
          trend: "Loading...",
          status: "Loading",
          color: "text-brand-blue",
          bg: "bg-blue-50",
        },
        {
          title: "Air Quality",
          value: "—",
          trend: "Loading...",
          status: "Loading",
          color: "text-brand-green",
          bg: "bg-emerald-50",
        },
        {
          title: "Rainfall",
          value: "—",
          trend: "Loading...",
          status: "Low",
          color: "text-brand-orange",
          bg: "bg-amber-50",
        },
        {
          title: "UV Index",
          value: "—",
          trend: "Loading...",
          status: "Loading",
          color: "text-brand-red",
          bg: "bg-red-50",
        },
      ];
    }

    const currentTemp = Math.round(weatherData.main?.temp || 0);
    const maxTemp = Math.round(forecastData.list?.[0]?.main?.temp_max || 0);
    const minTemp = Math.round(forecastData.list?.[0]?.main?.temp_min || 0);
    const tempTrend = maxTemp > currentTemp ? `+${maxTemp - currentTemp}°C from current` : `${minTemp - currentTemp}°C from current`;
    
    const humidity = weatherData.main?.humidity || 0;
    const airQuality = airQualityData?.list?.[0]?.main?.aqi || 3;
    const airQualityStatus = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][airQuality - 1] || "Moderate";
    
    const rainfall = forecastData.list?.[0]?.rain?.["3h"] || 0;
    const rainfallMm = Math.round(rainfall * 10) / 10;
    
    const uvIndex = Math.round(weatherData.clouds?.all ? (weatherData.clouds.all / 20) : 6);
    const uvStatus = uvIndex > 7 ? "High" : uvIndex > 5 ? "Moderate" : "Low";

    return [
      {
        title: "Temperature",
        value: `${currentTemp}°C`,
        trend: tempTrend,
        status: currentTemp > 30 ? "Hot" : currentTemp > 20 ? "Normal" : "Cool",
        color: "text-brand-blue",
        bg: "bg-blue-50",
      },
      {
        title: "Air Quality",
        value: `${Math.round((5 - airQuality) * 20)}`,
        trend: airQualityStatus,
        status: airQualityStatus,
        color: "text-brand-green",
        bg: "bg-emerald-50",
      },
      {
        title: "Rainfall",
        value: `${rainfallMm}mm`,
        trend: rainfallMm > 5 ? "Heavy" : rainfallMm > 0 ? "Light" : "None",
        status: rainfallMm > 5 ? "Heavy" : "Low",
        color: "text-brand-orange",
        bg: "bg-amber-50",
      },
      {
        title: "UV Index",
        value: `${uvIndex}`,
        trend: uvStatus,
        status: uvStatus,
        color: "text-brand-red",
        bg: "bg-red-50",
      },
    ];
  };

  const metrics = getMetrics();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-white dark:bg-slate-900 sticky top-[73px] z-40 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{selectedCity || "Select a City"}</h1>
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-semibold">
                📍 {selectedCity ? "Current" : "No city selected"}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Last updated: Today, 12:45 PM
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-semibold shadow-sm hover:from-blue-600 hover:to-emerald-600 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Alert Banner */}
        <div className="mb-8 p-5 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-red-900 dark:text-red-100">⚠️ Heatwave Alert</h3>
              <p className="text-sm text-red-800 dark:text-red-200">Temperatures expected above 40°C. Stay hydrated and avoid peak hours.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsActionCenterOpen(true)}
            className="px-5 py-2 bg-red-500 text-white font-semibold text-sm rounded-lg hover:bg-red-600 transition-all duration-200 flex-shrink-0"
          >
            Take Action
          </button>
        </div>

        {/* Live Weather Display Component */}
        <div className="mb-12">
          <WeatherDisplay 
            city={selectedCity || undefined} 
            onWeatherUpdate={(data) => {
              setWeatherData(data);
            }}
          />
        </div>

        {/* Popular Cities Selection */}
        {!selectedCity && (
          <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Popular Cities</h2>
            <div className="flex flex-wrap gap-3">
              {popularCities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-md dark:hover:shadow-emerald-900/50 transition-all transform hover:scale-105"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedCity && (
          <button
            onClick={() => setSelectedCity(null)}
            className="mb-8 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
          >
            ← Change City
          </button>
        )}

        {/* Weather Search Component */}
        <WeatherSearch />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {metrics.map((m) => (
            <div key={m.title} className={`rounded-2xl p-6 transition-all duration-300 ${
              m.title === "Temperature" ? "bg-red-50 dark:bg-red-950/30" :
              m.title === "Air Quality" ? "bg-emerald-50 dark:bg-emerald-950/30" :
              m.title === "Rainfall" ? "bg-blue-50 dark:bg-blue-950/30" :
              "bg-orange-50 dark:bg-orange-950/30"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  m.title === "Temperature" ? "text-red-700 dark:text-red-300" :
                  m.title === "Air Quality" ? "text-emerald-700 dark:text-emerald-300" :
                  m.title === "Rainfall" ? "text-blue-700 dark:text-blue-300" :
                  "text-orange-700 dark:text-orange-300"
                }`}>{m.title}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  m.title === "Temperature" ? "bg-red-500 text-white" :
                  m.title === "Air Quality" ? "bg-emerald-500 text-white" :
                  m.title === "Rainfall" ? "bg-blue-500 text-white" :
                  "bg-orange-500 text-white"
                }`}>
                  {m.status}
                </span>
              </div>
              <div>
                <div className={`text-4xl font-bold mb-1 ${
                  m.title === "Temperature" ? "text-red-900 dark:text-red-100" :
                  m.title === "Air Quality" ? "text-emerald-900 dark:text-emerald-100" :
                  m.title === "Rainfall" ? "text-blue-900 dark:text-blue-100" :
                  "text-orange-900 dark:text-orange-100"
                }`}>{m.value}</div>
                <div className={`text-xs font-medium ${
                  m.title === "Temperature" ? "text-red-700 dark:text-red-300" :
                  m.title === "Air Quality" ? "text-emerald-700 dark:text-emerald-300" :
                  m.title === "Rainfall" ? "text-blue-700 dark:text-blue-300" :
                  "text-orange-700 dark:text-orange-300"
                }`}>{m.trend}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabbed Content */}
        <div className="mb-6 flex items-center gap-8 pb-4">
          {["Overview", "Air Quality", "Weather", "Trends", "Gas Composition"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold transition-all relative pb-3 ${
                activeTab === tab 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 dark:from-blue-400 dark:to-emerald-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Content */}
            {activeTab === "Overview" && (
              <>
                {/* Temperature Chart */}
                <TemperatureTrendChart city={selectedCity} onDataLoaded={setForecastData} />

                {/* Pollution and Health */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6 transition-all duration-300">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      Pollution Levels
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "PM2.5", value: 45, max: 100, color: "from-emerald-500 to-teal-500", badgeColor: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" },
                        { label: "PM10", value: 68, max: 100, color: "from-amber-500 to-orange-500", badgeColor: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300" },
                        { label: "NO2", value: 12, max: 100, color: "from-blue-500 to-cyan-500", badgeColor: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300" },
                      ].map((p) => (
                        <div key={p.label}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{p.label}</span>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${p.badgeColor}`}>{p.value} µg/m³</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${p.color} transition-all duration-1000`}
                              style={{ width: `${p.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-slate-100 dark:from-emerald-950/30 dark:to-slate-900/50 rounded-2xl p-6 transition-all duration-300">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      Health Impact
                    </h3>
                    <div className="flex items-center gap-3 p-4 bg-emerald-100 dark:bg-emerald-950/40 rounded-xl mb-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg flex-shrink-0">✓</div>
                      <div>
                        <div className="text-sm font-bold text-emerald-900 dark:text-emerald-100">Good for Outdoor Activities</div>
                        <p className="text-xs text-emerald-700 dark:text-emerald-200 mt-0.5">Air quality is ideal for exercise</p>
                      </div>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 font-medium">
                      <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Wear light clothing
                      </li>
                      <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Ideal for planting trees
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === "Air Quality" && (
              <AirQualityChart city={selectedCity} lat={weatherData?.coord?.lat} lon={weatherData?.coord?.lon} onDataLoaded={setAirQualityData} />
            )}

            {activeTab === "Trends" && (
              <TrendsChart city={selectedCity} forecastData={forecastData} />
            )}

            {activeTab === "Gas Composition" && (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Air Gas Composition</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Atmospheric gases breakdown</p>
                  </div>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="w-full max-w-lg">
                    <AirGasCompositionChart />
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">Nitrogen (N₂)</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">78%</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Most abundant</div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase">Oxygen (O₂)</div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">21%</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Essential for life</div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase">Argon (Ar)</div>
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">0.93%</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Inert gas</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
                    <div className="text-xs text-red-600 dark:text-red-400 font-bold uppercase">CO₂</div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">0.04%</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Greenhouse gas</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
                    <div className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase">NO₂</div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-2">0.002%</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Air pollutant</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase">Other Gases</div>
                    <div className="text-2xl font-bold text-slate-600 dark:text-slate-400 mt-2">0.028%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Trace elements</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Weather" && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-950/30 dark:to-slate-900/50 rounded-2xl p-6 transition-all duration-300">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Weather Forecast</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Coming soon - detailed weather forecasting and analysis</p>
              </div>
            )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/40 dark:to-slate-900 rounded-2xl p-6 transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: "🌱", label: "Plant Trees", count: "128 Pledged", color: "bg-green-100 dark:bg-green-950/40" },
                  { icon: "🚲", label: "Reduce Travel", count: "Eco-Friendly", color: "bg-blue-100 dark:bg-blue-950/40" },
                  { icon: "⚡", label: "Save Energy", count: "Smart Tips", color: "bg-orange-100 dark:bg-orange-950/40" },
                ].map((action) => (
                  <button key={action.label} className={`flex items-center justify-between p-4 rounded-xl ${action.color} hover:opacity-80 transition-all duration-200 group`}>
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-2xl">{action.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{action.label}</div>
                        <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{action.count}</div>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-6 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase">Efficiency</h3>
              </div>
              <div className="text-center pb-4">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">84%</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Personal Score</div>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 w-[84%]" />
              </div>
              <p className="mt-4 text-[10px] text-center text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                You're in top 5% this month!
              </p>
            </div>
          </div>
        </div>
      </div>

      <ActionCenter 
        isOpen={isActionCenterOpen} 
        onClose={() => setIsActionCenterOpen(false)} 
      />
    </div>
  );
}
