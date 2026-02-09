import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from "react";

export const metadata = {
  title: "Climatrix | Understand Your Climate",
  description: "Real-time climate intelligence and actionable insights for a sustainable future.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
