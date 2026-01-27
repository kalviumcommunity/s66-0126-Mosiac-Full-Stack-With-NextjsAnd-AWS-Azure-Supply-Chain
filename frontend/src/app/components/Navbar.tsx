"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar(): React.ReactElement {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Community", href: "/community" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-slate-950/50 transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 dark:from-blue-400 dark:to-emerald-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {/* Sun */}
              <circle cx="12" cy="5" r="2" fill="currentColor" />
              <line x1="12" y1="2" x2="12" y2="1" />
              <line x1="17.66" y1="6.34" x2="18.41" y2="5.59" />
              <line x1="21" y1="11" x2="22" y2="11" />
              <line x1="17.66" y1="15.66" x2="18.41" y2="16.41" />
              {/* Cloud */}
              <path d="M20 14h-1.5c-.83-2.04-2.78-3.5-5.11-3.5-1.66 0-3.14.63-4.28 1.68C8.4 11.5 7.2 11 5.8 11c-2.49 0-4.5 1.49-4.5 3.33C1.3 15.84 2.52 17 4 17h16c1.66 0 2.5-1.34 2.5-3s-.84-3-2-3z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 text-transparent bg-clip-text">
              Climatrix
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Climate Intelligence</span>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
          >
            Launch Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
