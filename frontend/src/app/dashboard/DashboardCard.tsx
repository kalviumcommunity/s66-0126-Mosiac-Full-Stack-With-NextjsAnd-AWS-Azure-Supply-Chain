import React from "react";

interface DashboardCardProps {
  title: string;
  value: string;
}

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-gray-600 font-semibold text-sm">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
