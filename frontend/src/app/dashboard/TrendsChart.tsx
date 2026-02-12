"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

export default function TrendsChart({ city = "Mumbai" }: { city?: string }): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [24, 26, 25, 28, 30, 29],
        backgroundColor: isDark ? "rgba(59, 130, 246, 0.7)" : "rgba(37, 99, 235, 0.7)",
        borderColor: isDark ? "#3b82f6" : "#2563eb",
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: isDark ? "rgba(59, 130, 246, 0.9)" : "rgba(37, 99, 235, 0.9)",
      },
      {
        label: "Humidity (%)",
        data: [65, 62, 68, 60, 55, 58],
        backgroundColor: isDark ? "rgba(16, 185, 129, 0.7)" : "rgba(5, 150, 105, 0.7)",
        borderColor: isDark ? "#10b981" : "#059669",
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: isDark ? "rgba(16, 185, 129, 0.9)" : "rgba(5, 150, 105, 0.9)",
      },
      {
        label: "Air Quality Index",
        data: [55, 52, 58, 65, 72, 68],
        backgroundColor: isDark ? "rgba(245, 158, 11, 0.7)" : "rgba(249, 115, 22, 0.7)",
        borderColor: isDark ? "#f59e0b" : "#f97316",
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: isDark ? "rgba(245, 158, 11, 0.9)" : "rgba(249, 115, 22, 0.9)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: isDark ? "#cbd5e1" : "#475569",
          font: {
            size: 12,
            weight: "bold" as const,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: "rect" as const,
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#1f2937",
        titleColor: isDark ? "#f1f5f9" : "#ffffff",
        bodyColor: isDark ? "#cbd5e1" : "#f3f4f6",
        borderColor: isDark ? "#475569" : "#d1d5db",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: isDark ? "rgba(75, 85, 99, 0.2)" : "rgba(209, 213, 219, 0.3)",
          borderColor: isDark ? "#475569" : "#d1d5db",
        },
        ticks: {
          color: isDark ? "#cbd5e1" : "#6b7280",
          font: {
            size: 11,
            weight: "bold" as const,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "#cbd5e1" : "#6b7280",
          font: {
            size: 11,
            weight: "bold" as const,
          },
        },
      },
    },
  };

  if (!mounted) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Climate Trends</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">6-week trend in {city}</p>
        </div>
        <select className="bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 transition-colors">
          <option>Last 6 Weeks</option>
          <option>Last 12 Weeks</option>
          <option>Last 6 Months</option>
        </select>
      </div>
      <div className="h-80 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
