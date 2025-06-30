"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-6 flex flex-col justify-between">
      {/* Top-left Logo */}
      <div className="flex justify-start mb-6">
        <img src="/logo.jpg" alt="Logo" className="h-10" />
      </div>

      {/* Login Form */}
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4 text-black">Welcome back</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-4 text-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4 text-black"
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4 text-black">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-center text-gray-400 py-4">
        ©️ 2025. All rights reserved.
      </div>
    </div>
  );
}