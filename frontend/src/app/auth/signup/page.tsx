"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import Link from "next/link";

export default function Signup(): React.ReactElement {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Signup attempt:", { name, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <FormInput
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        <Button type="submit" className="w-full">
          Create Account
        </Button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
