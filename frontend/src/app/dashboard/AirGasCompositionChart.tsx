"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AirGasCompositionChart(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const data = {
    labels: ["Nitrogen (N₂)", "Oxygen (O₂)", "Argon (Ar)", "CO₂", "NO₂", "Other Gases"],
    datasets: [
      {
        label: "Gas Composition (%)",
        data: [78, 21, 0.93, 0.04, 0.002, 0.028],
        backgroundColor: [
          isDark ? "#3b82f6" : "#2563eb",
          isDark ? "#10b981" : "#059669",
          isDark ? "#f59e0b" : "#d97706",
          isDark ? "#ef4444" : "#dc2626",
          isDark ? "#8b5cf6" : "#7c3aed",
          isDark ? "#ec4899" : "#db2777",
        ],
        borderColor: isDark ? "#1e293b" : "#ffffff",
        borderWidth: 2,
        hoverBorderColor: isDark ? "#64748b" : "#e2e8f0",
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: isDark ? "#cbd5e1" : "#475569",
          font: {
            size: 12,
            weight: "500" as const,
          },
          padding: 20,
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
        titleFont: {
          size: 13,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            if (value < 0.1) {
              return `${label}: ${value.toFixed(3)}%`;
            }
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  if (!mounted) {
    return <div className="w-full h-96 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse" />;
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
