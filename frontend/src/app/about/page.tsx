import React from "react";
import Link from "next/link";

export default function About(): React.ReactElement {
  const team = [
    {
      name: "Jannat",
      role: "Lead & Full Stack Developer",
      email: "jannat.s66@kalvium.community",
      icon: "👩‍💻"
    },
    {
      name: "Khushil Chopra",
      role: "Backend Developer",
      email: "khushil.chopra.s66@kalvium.community",
      icon: "👨‍💻"
    },
    {
      name: "Marvan Kasim",
      role: "Frontend Developer",
      email: "marvan.kasim.s66@kalvium.community",
      icon: "👨‍💻"
    }
  ];

  const values = [
    {
      icon: "🌍",
      title: "Global Impact",
      description: "We believe in creating solutions that make a real difference in addressing climate challenges worldwide."
    },
    {
      icon: "📊",
      title: "Data-Driven",
      description: "Our platform leverages real-time data and advanced analytics to provide accurate, actionable insights."
    },
    {
      icon: "🤝",
      title: "Community First",
      description: "We empower communities with the tools and knowledge they need to take meaningful climate action."
    },
    {
      icon: "🔬",
      title: "Innovation",
      description: "Constantly pushing boundaries to deliver cutting-edge climate intelligence technology."
    }
  ];

  const features = [
    "Real-time weather monitoring for 5,000+ cities",
    "Advanced air quality tracking and alerts",
    "Personalized climate action recommendations",
    "Historical data analysis and trend predictions",
    "Community-driven environmental initiatives",
    "Integration with global climate data sources"
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-blue-50 dark:from-slate-900 to-white dark:to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20">🌍</div>
          <div className="absolute top-40 right-20 text-7xl animate-pulse opacity-15">💡</div>
          <div className="absolute bottom-32 left-1/3 text-5xl animate-bounce opacity-20" style={{ animationDuration: "3s" }}>📊</div>
          <div className="absolute top-1/2 right-1/4 text-6xl opacity-10">🌱</div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
            About <span className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text">Climatrix</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize climate intelligence and empower every individual to make informed decisions for a sustainable future.
          </p>
        </div>

        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-200 to-emerald-200 dark:from-blue-900/20 dark:to-emerald-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 pointer-events-none" />
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Climatrix was born from a simple yet powerful idea: everyone deserves access to accurate, real-time climate data to make informed decisions about their environment and future.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                We combine cutting-edge technology with comprehensive environmental data to deliver hyper-local climate intelligence that empowers individuals, communities, and organizations to take meaningful action.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                From monitoring air quality in your neighborhood to tracking global temperature trends, Climatrix provides the insights you need to navigate our changing climate with confidence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text mb-2">5K+</div>
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Cities Covered</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text mb-2">1M+</div>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Active Users</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text mb-2">50M+</div>
                <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">Data Points Daily</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text mb-2">99.9%</div>
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do at Climatrix
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive climate intelligence tools at your fingertips
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-900 dark:text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The talented individuals behind Climatrix
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{member.name}</h3>
                <p className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text font-semibold mb-4">
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-700 dark:to-emerald-700 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-blue-50 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Join millions of users worldwide who trust Climatrix for accurate, real-time climate intelligence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 text-transparent bg-clip-text">
                  Explore Dashboard
                </span>
              </Link>
              <Link
                href="/community"
                className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
