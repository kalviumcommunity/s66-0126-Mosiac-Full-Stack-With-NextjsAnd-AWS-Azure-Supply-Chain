"use client";

import React, { useState } from "react";
import ActionCenter from "../components/ActionCenter";
import DashboardChart from "./DashboardChart";
import AirQualityChart from "./AirQualityChart";
import TrendsChart from "./TrendsChart";
import AirGasCompositionChart from "./AirGasCompositionChart";

export default function Dashboard(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isActionCenterOpen, setIsActionCenterOpen] = useState(false);

  const metrics = [
    {
      title: "Temperature",
      value: "28°C",
      trend: "+2°C from avg",
      status: "Normal",
      color: "text-brand-blue",
      bg: "bg-blue-50",
    },
    {
      title: "Air Quality",
      value: "42",
      trend: "Good",
      status: "Healthy",
      color: "text-brand-green",
      bg: "bg-emerald-50",
    },
    {
      title: "Rainfall",
      value: "12mm",
      trend: "-5mm from avg",
      status: "Low",
      color: "text-brand-orange",
      bg: "bg-amber-50",
    },
    {
      title: "UV Index",
      value: "6",
      trend: "High",
      status: "Caution",
      color: "text-brand-red",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[73px] z-40 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">New Delhi, India</h1>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider transition-colors">
                Current Location
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Last updated: Today, 12:45 PM
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 text-white text-sm font-bold shadow-sm hover:from-blue-700 hover:to-emerald-700 dark:hover:from-blue-600 dark:hover:to-emerald-600 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 pt-8">
        {/* Alert Banner */}
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/25 border border-red-100 dark:border-red-900/40 rounded-2xl flex items-center justify-between gap-4 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-500 dark:bg-red-600 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Heatwave Warning</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">Temperatures are expected to rise above 40°C in the next 48 hours. Stay hydrated.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsActionCenterOpen(true)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-xs rounded-lg hover:bg-red-50 dark:hover:bg-slate-700 transition-colors duration-200 uppercase tracking-wider"
          >
            View Actions
          </button>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((m) => (
            <div key={m.title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/20 hover:shadow-md dark:hover:shadow-slate-900/40 flex flex-col justify-between transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{m.title}</span>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-colors duration-200 ${
                  m.title === "Temperature" ? "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-300" :
                  m.title === "Air Quality" ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300" :
                  m.title === "Rainfall" ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300" :
                  "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-300"
                }`}>
                  {m.status}
                </span>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-1">{m.value}</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">{m.trend}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabbed Content */}
        <div className="mb-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-8">
          {["Overview", "Air Quality", "Weather", "Trends", "Gas Composition"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative duration-300 ${
                activeTab === tab ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Content */}
            {activeTab === "Overview" && (
              <>
                {/* Temperature Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/20 hover:shadow-md dark:hover:shadow-slate-900/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Temperature Trend</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Weekly analysis of temperature variations</p>
                    </div>
                    <select className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 transition-colors duration-200">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-64 w-full bg-slate-50 dark:bg-slate-700 rounded-xl flex items-end justify-between px-8 pb-4">
                    {[45, 60, 40, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 w-8">
                        <div 
                          className="w-full bg-blue-500/20 dark:bg-blue-400/20 rounded-t-lg relative group"
                          style={{ height: `${h}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-950 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}°
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pollution and Health */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/50 transition-colors">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Pollution Levels</h3>
                    <div className="space-y-4">
                      {[
                        { label: "PM2.5", value: 45, max: 100, color: "bg-emerald-500 dark:bg-emerald-400" },
                        { label: "PM10", value: 68, max: 100, color: "bg-amber-500 dark:bg-amber-400" },
                        { label: "NO2", value: 12, max: 100, color: "bg-blue-500 dark:bg-blue-400" },
                      ].map((p) => (
                        <div key={p.label}>
                          <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tight text-slate-900 dark:text-white">
                            <span>{p.label}</span>
                            <span>{p.value} µg/m³</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${p.color} transition-all duration-1000`}
                              style={{ width: `${p.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/50 transition-colors">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Health Impact</h3>
                    <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl mb-4 border border-emerald-100 dark:border-emerald-800">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 dark:bg-emerald-600 flex items-center justify-center text-white text-xl">✓</div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Good for Outdoor Activities</div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Air quality is ideal for exercise and walking.</p>
                      </div>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        Wear light clothing
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        Ideal for planting trees
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === "Air Quality" && (
              <AirQualityChart />
            )}

            {activeTab === "Trends" && (
              <TrendsChart />
            )}

            {activeTab === "Gas Composition" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/50 transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Air Gas Composition</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Breakdown of gases in the atmosphere</p>
                  </div>
                </div>
                <div className="flex justify-center mb-8">
                  <div className="w-full max-w-lg">
                    <AirGasCompositionChart />
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase">Nitrogen (N₂)</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">78%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Most abundant</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase">Oxygen (O₂)</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">21%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Essential for life</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase">Argon (Ar)</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">0.93%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Inert gas</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900/30">
                    <div className="text-xs text-red-600 dark:text-red-400 font-semibold uppercase">CO₂</div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">0.04%</div>
                    <div className="text-xs text-red-500 dark:text-red-400 mt-1">Greenhouse gas</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-900/30">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase">NO₂</div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">0.002%</div>
                    <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">Air pollutant</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase">Other Gases</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">0.028%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Trace elements</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Weather" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/50 transition-colors">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Weather Forecast</h3>
                <p className="text-slate-600 dark:text-slate-400">Coming soon - detailed weather forecasting and analysis</p>
              </div>
            )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-md dark:shadow-slate-900/30 transition-colors duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: "🌱", label: "Plant Trees", count: "128 Pledged" },
                  { icon: "🚲", label: "Reduce Travel", count: "Eco-Friendly" },
                  { icon: "⚡", label: "Save Energy", count: "Smart Tips" },
                ].map((action) => (
                  <button key={action.label} className="flex items-center justify-between p-4 rounded-xl bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200 group">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{action.icon}</span>
                      <div className="text-left">
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{action.label}</div>
                        <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{action.count}</div>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30 shadow-sm dark:shadow-slate-900/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Efficiency</h3>
              </div>
              <div className="text-center pb-4">
                <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">84%</div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Personal Impact Score</div>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 w-[84%]" />
              </div>
              <p className="mt-4 text-[10px] text-center text-slate-600 dark:text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">
                You are in the top 5% of climate-conscious citizens this month!
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
