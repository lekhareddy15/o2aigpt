"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [strength, setStrength] = useState({
    text: "Weak",
    color: "text-red-500",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      let score = 0;
      if (value.length > 8) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;

      if (score > 2)
        setStrength({ text: "Strong", color: "text-green-500" });
      else if (score > 1)
        setStrength({ text: "Medium", color: "text-yellow-500" });
      else setStrength({ text: "Weak", color: "text-red-500" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    try {
      const res = await axios.post("/api/signup", form);

      if (res.data.success) {
        router.push("/login");
      } else {
        setError(res.data.message || "Signup failed.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side with image and logo */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-blue-50 p-12 text-center">
        <img src="/logo.jpg" alt="O2 Logo" className="h-12 mb-8" />
        <img src="/mission.jpg" alt="Illustration" className="max-w-sm" />
        <h1 className="mt-8 text-2xl font-bold text-gray-800">
          Join a Community of Innovators
        </h1>
        <p className="mt-2 text-gray-600">
          Create an account to unlock powerful insights and drive growth.
        </p>
      </div>

      {/* Right side with the form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 sm:p-12">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600 mb-8">
            Let's get you started on your journey.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
            />
            <div className="flex items-center justify-between text-sm">
                <span>Password Strength:</span>
                <span className={`font-bold ${strength.color}`}>{strength.text}</span>
            </div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
            />

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 mt-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}