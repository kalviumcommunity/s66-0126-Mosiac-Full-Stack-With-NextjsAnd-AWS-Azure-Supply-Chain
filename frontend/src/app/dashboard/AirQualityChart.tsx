"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AirQualityChart(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "PM2.5 (µg/m³)",
        data: [45, 52, 48, 65, 55, 70, 42],
        borderColor: isDark ? "#10b981" : "#059669",
        backgroundColor: isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(5, 150, 105, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: isDark ? "#10b981" : "#059669",
        pointBorderColor: isDark ? "#1f2937" : "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "PM10 (µg/m³)",
        data: [68, 75, 70, 82, 78, 88, 65],
        borderColor: isDark ? "#f59e0b" : "#f97316",
        backgroundColor: isDark ? "rgba(245, 158, 11, 0.1)" : "rgba(249, 115, 22, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: isDark ? "#f59e0b" : "#f97316",
        pointBorderColor: isDark ? "#1f2937" : "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "NO2 (ppb)",
        data: [12, 15, 18, 14, 16, 20, 11],
        borderColor: isDark ? "#3b82f6" : "#2563eb",
        backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(37, 99, 235, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: isDark ? "#3b82f6" : "#2563eb",
        pointBorderColor: isDark ? "#1f2937" : "#ffffff",
        pointBorderWidth: 2,
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
          pointStyle: "circle",
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
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/50 transition-colors">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Air Quality Index</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Weekly analysis of pollutant levels</p>
        </div>
        <select className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-lg px-3 py-2 transition-colors">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
