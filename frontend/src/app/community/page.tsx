import React from "react";

export default function Community(): React.ReactElement {
  const stats = [
    { label: "Trees Pledged", value: "1.2M+", icon: "🌳" },
    { label: "Cars Off Road", value: "450K", icon: "🚗" },
    { label: "Energy Saved", value: "89GWh", icon: "⚡" },
    { label: "Active Groups", value: "2,500", icon: "🤝" },
  ];

  const initiatives = [
    {
      title: "Plant a Tree Challenge",
      description: "Join 50,000+ people planting trees in their local communities",
      participants: "52,341",
      icon: "🌱",
      color: "emerald"
    },
    {
      title: "Zero Waste Month",
      description: "Reduce your household waste to zero for 30 days",
      participants: "23,890",
      icon: "♻️",
      color: "green"
    },
    {
      title: "Carpool Network",
      description: "Connect with neighbors to share rides and reduce emissions",
      participants: "18,765",
      icon: "🚙",
      color: "blue"
    },
    {
      title: "Solar Energy Adoption",
      description: "Switch to renewable energy sources for your home",
      participants: "31,204",
      icon: "☀️",
      color: "amber"
    }
  ];

  const tips = [
    {
      title: "Switch to LED Bulbs",
      impact: "Save 75% energy",
      icon: "💡"
    },
    {
      title: "Use Reusable Bags",
      impact: "Reduce 500+ plastic bags/year",
      icon: "🛍️"
    },
    {
      title: "Compost Food Waste",
      impact: "Divert 30% of trash",
      icon: "🥬"
    },
    {
      title: "Use Public Transport",
      impact: "Cut 4,800 lbs CO2/year",
      icon: "🚌"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 py-16">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Our Collective <span className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text">Impact</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of citizens taking small steps for a massive change.
            Track our progress and find local groups near you.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 py-16">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s, index) => {
            const colors = [
              "border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
              "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30",
              "border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30",
              "border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30",
            ];
            return (
              <div key={s.label} className={`rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200 ${colors[index]}`}>
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{s.icon}</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{s.value}</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Community Initiatives */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Active Initiatives</h2>
            <p className="text-slate-600 dark:text-slate-400">Join community-driven projects making real impact</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiatives.map((initiative) => (
              <div key={initiative.title} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{initiative.icon}</div>
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 text-sm font-bold">
                    <span className="bg-gradient-to-r from-blue-700 to-emerald-700 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text">
                      {initiative.participants} joined
                    </span>
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{initiative.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{initiative.description}</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                  Join Initiative
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Tips */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quick Climate Actions</h2>
            <p className="text-slate-600 dark:text-slate-400">Small changes that make a big difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 shadow-md hover:shadow-xl">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{tip.title}</h3>
                <p className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text font-semibold text-sm">{tip.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-700 dark:to-emerald-700 rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
            Your actions matter. Join our community today and be part of the solution to climate change.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white hover:bg-slate-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 text-transparent bg-clip-text">
                Start Your Journey
              </span>
            </button>
            <button className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
