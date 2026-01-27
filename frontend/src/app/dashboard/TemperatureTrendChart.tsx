"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function TemperatureTrendChart(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const data = [
    { day: "Mon", current: 24, high: 28, low: 20 },
    { day: "Tue", current: 25, high: 29, low: 21 },
    { day: "Wed", current: 26, high: 30, low: 22 },
    { day: "Thu", current: 28, high: 32, low: 24 },
    { day: "Fri", current: 27, high: 31, low: 23 },
    { day: "Sat", current: 29, high: 33, low: 25 },
    { day: "Sun", current: 28, high: 32, low: 24 },
  ];

  const maxTemp = 35;
  const minTemp = 15;

  const getY = (temp: number) => {
    return ((temp - minTemp) / (maxTemp - minTemp)) * 100;
  };

  // Smooth bezier curve path
  const createSmoothPath = (values: number[]) => {
    let path = "";
    values.forEach((value, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = getY(value);
      if (i === 0) {
        path += `M ${x} ${100 - y}`;
      } else {
        const prevX = ((i - 1) / (values.length - 1)) * 100;
        const prevY = getY(values[i - 1]);
        const cpX = (prevX + x) / 2;
        const cpY1 = 100 - prevY;
        const cpY2 = 100 - y;
        path += ` C ${cpX} ${cpY1}, ${cpX} ${cpY2}, ${x} ${100 - y}`;
      }
    });
    return path;
  };

  const currentPath = createSmoothPath(data.map(d => d.current));
  const highPath = createSmoothPath(data.map(d => d.high));
  const lowPath = createSmoothPath(data.map(d => d.low));

  const avgTemp = Math.round(data.reduce((sum, d) => sum + d.current, 0) / data.length);
  const maxCurrentTemp = Math.max(...data.map(d => d.current));
  const minCurrentTemp = Math.min(...data.map(d => d.current));

  if (!mounted) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Temperature Trend</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">7-day forecast with high and low</p>
        </div>
        <select className="bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 transition-colors">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3 text-center">
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase mb-1">Average</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{avgTemp}°C</div>
        </div>
        <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-3 text-center">
          <div className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase mb-1">High</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{maxCurrentTemp}°C</div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 text-center">
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-1">Low</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{minCurrentTemp}°C</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-72" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Gradient for current temperature area */}
            <linearGradient id={`tempGradient-${isDark ? "dark" : "light"}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#06b6d4" : "#06b6d4"} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isDark ? "#06b6d4" : "#06b6d4"} stopOpacity="0.05" />
            </linearGradient>

            {/* Gradient for high temperature area */}
            <linearGradient id={`highGradient-${isDark ? "dark" : "light"}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#f87171" : "#fca5a5"} stopOpacity="0.2" />
              <stop offset="100%" stopColor={isDark ? "#f87171" : "#fca5a5"} stopOpacity="0" />
            </linearGradient>

            {/* Gradient for low temperature area */}
            <linearGradient id={`lowGradient-${isDark ? "dark" : "light"}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#10b981" : "#6ee7b7"} stopOpacity="0.2" />
              <stop offset="100%" stopColor={isDark ? "#10b981" : "#6ee7b7"} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[0, 20, 40, 60, 80, 100].map((y) => (
            <line
              key={`grid-${y}`}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke={isDark ? "#475569" : "#e2e8f0"}
              strokeWidth="0.3"
            />
          ))}

          {/* Y-axis labels */}
          {[minTemp, minTemp + (maxTemp - minTemp) / 2, maxTemp].map((temp, i) => (
            <text
              key={`label-${i}`}
              x="2"
              y={100 - ((temp - minTemp) / (maxTemp - minTemp)) * 100 + 1}
              fontSize="3"
              fill={isDark ? "#94a3b8" : "#94a3b8"}
              fontWeight="bold"
            >
              {Math.round(temp)}°
            </text>
          ))}

          {/* High temperature area and line */}
          <path
            d={`${highPath} L 100,100 L 0,100 Z`}
            fill={`url(#highGradient-${isDark ? "dark" : "light"})`}
            stroke="none"
          />
          <path
            d={highPath}
            fill="none"
            stroke={isDark ? "#f87171" : "#fc8181"}
            strokeWidth="0.8"
            opacity="0.5"
            strokeDasharray="2,2"
          />

          {/* Low temperature area and line */}
          <path
            d={`${lowPath} L 100,100 L 0,100 Z`}
            fill={`url(#lowGradient-${isDark ? "dark" : "light"})`}
            stroke="none"
          />
          <path
            d={lowPath}
            fill="none"
            stroke={isDark ? "#10b981" : "#6ee7b7"}
            strokeWidth="0.8"
            opacity="0.5"
            strokeDasharray="2,2"
          />

          {/* Current temperature area */}
          <path
            d={`${currentPath} L 100,100 L 0,100 Z`}
            fill={`url(#tempGradient-${isDark ? "dark" : "light"})`}
            stroke="none"
          />

          {/* Current temperature line */}
          <path
            d={currentPath}
            fill="none"
            stroke={isDark ? "#06b6d4" : "#06b6d4"}
            strokeWidth="2.5"
          />

          {/* Data points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = getY(d.current);
            return (
              <g key={`point-${i}`}>
                {/* Outer glow */}
                <circle
                  cx={x}
                  cy={100 - y}
                  r="2.5"
                  fill="none"
                  stroke={isDark ? "#06b6d4" : "#06b6d4"}
                  strokeWidth="0.5"
                  opacity="0.4"
                />
                {/* Main point */}
                <circle
                  cx={x}
                  cy={100 - y}
                  r="1.2"
                  fill={isDark ? "#0f172a" : "#ffffff"}
                  stroke={isDark ? "#06b6d4" : "#06b6d4"}
                  strokeWidth="0.8"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Data Table */}
      <div className="grid grid-cols-7 gap-3">
        {data.map((d) => (
          <div
            key={d.day}
            className="p-4 rounded-xl bg-white dark:bg-slate-700/50 text-center hover:shadow-md transition-all duration-200 border border-slate-100 dark:border-slate-600/50"
          >
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-3">
              {d.day}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              {d.current}°C
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[10px]">
              <div className="flex items-center gap-0.5">
                <span className="text-red-600 dark:text-red-400 font-bold">{d.high}°</span>
              </div>
              <span className="text-slate-400 dark:text-slate-500">/</span>
              <div className="flex items-center gap-0.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{d.low}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded-full bg-cyan-500" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Current Temp</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded-full bg-red-500 opacity-50" style={{ borderTop: "2px dashed" }} />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded-full bg-emerald-500 opacity-50" style={{ borderTop: "2px dashed" }} />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Low</span>
        </div>
      </div>
    </div>
  );
}
