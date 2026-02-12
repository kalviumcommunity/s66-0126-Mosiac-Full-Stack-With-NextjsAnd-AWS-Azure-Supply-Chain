"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../../components/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        setError("User not found. Please sign up first.");
        setLoading(false);
        return;
      }

      if (user.password !== password) {
        setError("Invalid password. Please try again.");
        setLoading(false);
        return;
      }

      // Store current user
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      localStorage.setItem("token", "demo-token-" + Date.now());
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-md w-full mx-4">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl mb-4 shadow-xl">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <circle cx="12" cy="5" r="2" fill="currentColor" />
              <path d="M20 14h-1.5c-.83-2.04-2.78-3.5-5.11-3.5-1.66 0-3.14.63-4.28 1.68C8.4 11.5 7.2 11 5.8 11c-2.49 0-4.5 1.49-4.5 3.33C1.3 15.84 2.52 17 4 17h16c1.66 0 2.5-1.34 2.5-3s-.84-3-2-3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-slate-600 dark:text-slate-400">Sign in to continue to Climatrix</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700 backdrop-blur-xl"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600" />
                Remember me
              </label>
              <Link href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>

        {/* Quick Access */}
        <div className="mt-6 text-center">
          <Link 
            href="/dashboard" 
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
