"use client";

import React, { useEffect } from "react";
import SettingsForm from "./SettingsForm";
import { useRouter } from "next/navigation";

export default function Settings(): React.ReactElement {
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/signup");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">Configure your application preferences</p>
        </div>
        <SettingsForm />
      </div>
    </div>
  );
}
