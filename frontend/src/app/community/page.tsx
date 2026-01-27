import React from "react";
import Link from "next/link";

export default function Community(): React.ReactElement {
  const stats = [
    { label: "Trees Pledged", value: "1.2M+", icon: "🌳" },
    { label: "Cars Off Road", value: "450K", icon: "🚗" },
    { label: "Energy Saved", value: "89GWh", icon: "⚡" },
    { label: "Active Groups", value: "2,500", icon: "🤝" },
  ];

  const groups = [
    {
      name: "Delhi Green Warriors",
      members: "12.5K",
      activity: "High",
      desc: "Focused on local air quality and urban forestry.",
    },
    {
      name: "Sustainable South Delhi",
      members: "8.2K",
      activity: "Very High",
      desc: "Waste management and solar energy initiatives.",
    },
    {
      name: "Clean Yamuna Project",
      members: "25K+",
      activity: "Extreme",
      desc: "Protecting and cleaning the city's lifeline.",
    },
  ];

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Our Collective <span className="text-brand-green">Impact</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of citizens taking small steps for a massive change.
            Track our progress and find local groups near you.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 py-16">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-8 text-center group hover:border-brand-green transition-all">
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{s.icon}</div>
              <div className="text-3xl font-black text-slate-900 mb-1">{s.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Local Groups */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Local Groups</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Join a community near your location</p>
            </div>
            <button className="text-brand-blue font-bold text-sm hover:underline">View All Groups</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {groups.map((group) => (
              <div key={group.name} className="glass-card p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold text-xl">
                    {group.name[0]}
                  </div>
                  <span className="px-2 py-1 rounded-md bg-emerald-50 text-brand-green text-[10px] font-black uppercase">
                    {group.activity} Activity
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{group.name}</h3>
                <p className="text-sm text-slate-500 mb-6 flex-1">{group.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    {group.members} Members
                  </span>
                  <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors">
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="glass-card bg-brand-blue p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-6">Your Recent Achievement</h2>
              <div className="p-6 bg-white/10 border border-white/20 rounded-2xl mb-8 backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">🏆</div>
                  <div>
                    <h4 className="text-xl font-bold">Eco-Guardian Silver</h4>
                    <p className="text-blue-100 text-sm">You have reduced your carbon footprint by 15% this month.</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-xl bg-white text-brand-blue font-bold text-sm hover:bg-blue-50 transition-colors">
                  Share Achievement
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors">
                  View Badges
                </button>
              </div>
            </div>
            <div className="hidden md:block opacity-20 transform rotate-12">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
