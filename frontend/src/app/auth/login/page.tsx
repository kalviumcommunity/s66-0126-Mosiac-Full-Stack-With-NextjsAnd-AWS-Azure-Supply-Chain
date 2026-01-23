"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import Link from "next/link";

export default function Login(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>
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
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <p className="text-center mt-4">
          Dont have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
