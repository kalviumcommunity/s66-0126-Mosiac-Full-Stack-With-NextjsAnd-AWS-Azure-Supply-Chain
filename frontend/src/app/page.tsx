"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home(): React.ReactElement {
  const router = useRouter();
  const popularCities = ["Delhi", "London", "Tokyo", "New York", "Mumbai", "Paris"];

  const handleCityClick = (city: string) => {
    // Navigate to dashboard - the city will be selected via state
    router.push(`/dashboard?city=${encodeURIComponent(city)}`);
  };

  const features = [
    {
      icon: "📍",
      title: "Hyper-Local Data",
      description: "Get precise environmental data for your exact location with up-to-the-minute updates.",
    },
    {
      icon: "🌡️",
      title: "Climate Alerts",
      description: "Receive real-time notifications about air quality, temperature, and weather changes.",
    },
    {
      icon: "💡",
      title: "Action Plans",
      description: "Get personalized recommendations to reduce your environmental impact.",
    },
    {
      icon: "📊",
      title: "Data Insights",
      description: "Understand trends and patterns in your local climate with interactive charts.",
    },
    {
      icon: "🌍",
      title: "Global Network",
      description: "Compare your data with cities worldwide and learn from others.",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Customizable alerts tailored to your interests and lifestyle.",
    },
  ];

  const stats = [
    { number: "5,000+", label: "Cities Covered" },
    { number: "1M+", label: "Active Users" },
    { number: "50M+", label: "Daily Data Points" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-gradient-to-b from-emerald-50 dark:from-slate-900 to-white dark:to-slate-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating weather icons */}
          <div className="absolute top-20 left-10 text-6xl opacity-20">☁️</div>
          <div className="absolute top-40 right-20 text-7xl opacity-15">🌤️</div>
          <div className="absolute bottom-32 left-1/3 text-5xl opacity-20">💨</div>
          <div className="absolute top-1/2 right-1/4 text-6xl opacity-10">🌍</div>
          <div className="absolute bottom-20 right-10 text-5xl opacity-15">💧</div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 text-sm font-semibold mb-8 border border-emerald-200 dark:border-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400"></span>
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text">Real-time Climate Intelligence</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
              Understand Your Climate,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text">
                Take Action.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl">
              Climatrix provides hyper-local environmental data and personalized action plans to help you navigate a changing world. Monitor air quality, temperature trends, and receive smart alerts tailored to your location.
            </p>

            {/* Search Bar */}
            <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 flex items-center gap-2 mb-8 max-w-2xl mx-auto hover:shadow-2xl transition-shadow">
              <div className="flex-1 flex items-center gap-3 px-4">
                <svg
                  className="w-5 h-5 text-slate-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search for your city..."
                  className="w-full py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-sm border-l border-slate-200 dark:border-slate-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Location
              </button>
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 dark:from-blue-500 dark:to-emerald-500 dark:hover:from-blue-600 dark:hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Search
              </Link>
            </div>

            {/* Popular Cities */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Popular:
              </span>
              {popularCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityClick(city)}
                  className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-md dark:hover:shadow-emerald-900/50 transition-all transform hover:scale-105"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-200 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Powerful Features for Climate Intelligence
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to understand and respond to your local climate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                  index === 0 ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800" :
                  index === 1 ? "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800" :
                  index === 2 ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800" :
                  index === 3 ? "bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800" :
                  index === 4 ? "bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800" :
                  "bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800"
                }`}
              >
                <div className="text-6xl mb-4 transform hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${
                  index === 0 ? "text-blue-900 dark:text-blue-100" :
                  index === 1 ? "text-red-900 dark:text-red-100" :
                  index === 2 ? "text-emerald-900 dark:text-emerald-100" :
                  index === 3 ? "text-orange-900 dark:text-orange-100" :
                  index === 4 ? "text-purple-900 dark:text-purple-100" :
                  "text-cyan-900 dark:text-cyan-100"
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  index === 0 ? "text-blue-700 dark:text-blue-300" :
                  index === 1 ? "text-red-700 dark:text-red-300" :
                  index === 2 ? "text-emerald-700 dark:text-emerald-300" :
                  index === 3 ? "text-orange-700 dark:text-orange-300" :
                  index === 4 ? "text-purple-700 dark:text-purple-300" :
                  "text-cyan-700 dark:text-cyan-300"
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text mb-3">
                  {stat.number}
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Visual */}
      <section className="py-24 bg-gradient-to-b from-white dark:from-slate-950 to-emerald-50 dark:to-slate-900">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 dark:from-slate-800 to-slate-800 dark:to-slate-900 p-12 md:p-16">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to explore Climatrix?
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Get started with our comprehensive dashboard featuring real-time climate data from over 5,000 cities worldwide. Make informed decisions for a sustainable future.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                  >
                    Explore Dashboard
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center gap-2 bg-white dark:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
              
              {/* Animated Weather Visual */}
              <div className="w-full max-w-md aspect-square rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center relative bg-gradient-to-br from-blue-400 to-emerald-300 dark:from-blue-600 dark:to-emerald-600">
                {/* Sky background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-emerald-100 dark:from-blue-700 dark:to-emerald-900" />
                
                {/* Animated clouds */}
                <div className="absolute top-8 left-8 w-24 h-12 bg-white rounded-full opacity-70" />
                <div className="absolute top-20 right-12 w-28 h-14 bg-white rounded-full opacity-60" />
                <div className="absolute top-40 left-1/4 w-20 h-10 bg-white rounded-full opacity-75" />
                
                {/* Sun */}
                <div className="absolute top-12 right-1/4 w-16 h-16 bg-yellow-300 rounded-full shadow-2xl" />
                
                {/* Rain drops */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl">🌧️</div>
                </div>
                
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-600/20 to-transparent" />
              </div>
            </div>

            {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full opacity-10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Trusted by thousands
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              See what users are saying about Climatrix
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Environmental Officer",
                content: "Climatrix has transformed how we monitor air quality in our city. The real-time alerts are invaluable.",
                color: "bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 border-emerald-200 dark:border-emerald-800"
              },
              {
                name: "Marcus Chen",
                role: "Sustainability Manager",
                content: "The personalized action plans help our team make data-driven decisions. Highly recommended!",
                color: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
              },
              {
                name: "Emma Williams",
                role: "Climate Researcher",
                content: "The data accuracy and coverage across cities is impressive. A must-have tool for climate work.",
                color: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800"
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${testimonial.color}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">
                  {testimonial.content}
                </p>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section with Weather Animation */}
      <section className="py-24 bg-gradient-to-b from-white dark:from-slate-950 to-slate-50 dark:to-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 dark:from-blue-950 via-emerald-50 dark:via-emerald-950 to-emerald-100 dark:to-emerald-950 p-12 md:p-16">
            {/* Weather icons background */}
            <div className="absolute top-4 left-8 text-5xl">☀️</div>
            <div className="absolute top-20 right-12 text-4xl">⛅</div>
            <div className="absolute bottom-16 left-1/4 text-5xl">💧</div>
            <div className="absolute bottom-8 right-1/4 text-4xl">🌬️</div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Stay updated on climate insights
              </h2>
              <p className="text-xl text-slate-700 dark:text-slate-300 mb-10 leading-relaxed">
                Subscribe to get weekly climate reports and action recommendations for your area. Join thousands of climate-conscious citizens.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-4 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 dark:from-blue-500 dark:to-emerald-500 dark:hover:from-blue-600 dark:hover:to-emerald-600 text-white font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 transform">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                ✓ No spam • ✓ Unsubscribe anytime • ✓ Monthly insights
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
