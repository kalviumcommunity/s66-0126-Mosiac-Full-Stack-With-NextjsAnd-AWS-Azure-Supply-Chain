'use client';

import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';

export default function Dashboard() {
  return (
    <div className="dashboard-container p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Users" value="1,234" />
        <DashboardCard title="Revenue" value="$45,620" />
        <DashboardCard title="Active Sessions" value="892" />
        <DashboardCard title="Conversion Rate" value="3.24%" />
      </div>
      <DashboardChart />
    </div>
  );
}
