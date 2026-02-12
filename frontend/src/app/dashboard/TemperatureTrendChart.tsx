'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TrendData {
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
}

interface TemperatureTrendChartProps {
  city: string;
}

export default function TemperatureTrendChart({ city }: TemperatureTrendChartProps) {
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendData = async () => {
      if (!city) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/weather/trend?city=${encodeURIComponent(city)}`);

        if (!response.ok) {
          throw new Error('Failed to fetch trend data');
        }

        const data = await response.json();
        setTrendData(data.trend);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setTrendData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
  }, [city]);

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-300">Loading temperature trend...</p>
      </div>
    );
  }

  if (error || trendData.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-300">
          {error || 'No trend data available'}
        </p>
      </div>
    );
  }

  const avgTemp = Math.round(trendData.reduce((sum, d) => sum + d.avgTemp, 0) / trendData.length);
  const maxTemp = Math.max(...trendData.map((d) => d.maxTemp));
  const minTemp = Math.min(...trendData.map((d) => d.minTemp));

  const chartData = {
    labels: trendData.map((d) => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: trendData.map((d) => d.avgTemp),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Max Temperature (°C)',
        data: trendData.map((d) => d.maxTemp),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        fill: false,
        tension: 0.4,
        borderDash: [5, 5],
        pointRadius: 4,
        pointBackgroundColor: 'rgb(239, 68, 68)',
      },
      {
        label: 'Min Temperature (°C)',
        data: trendData.map((d) => d.minTemp),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        fill: false,
        tension: 0.4,
        borderDash: [5, 5],
        pointRadius: 4,
        pointBackgroundColor: 'rgb(16, 185, 129)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(100, 116, 139)',
          font: {
            size: 12,
            weight: '500' as const,
          },
          padding: 16,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y}°C`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(100, 116, 139)',
          font: {
            size: 12,
          },
          callback: function (value: any) {
            return value + '°C';
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(100, 116, 139)',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Temperature Trend
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Last 7 days in {city}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-medium mb-1">Average</p>
            <p className="text-2xl font-bold text-blue-600">{avgTemp}°C</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-medium mb-1">High</p>
            <p className="text-2xl font-bold text-red-600">{Math.round(maxTemp)}°C</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-medium mb-1">Low</p>
            <p className="text-2xl font-bold text-emerald-600">{Math.round(minTemp)}°C</p>
          </div>
        </div>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
