"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(username, password);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        {error && <p>{error}</p>}
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="flex justify-center-safe items-center h-screen">
        <div className="w-full max-w-xl rounded-2xl bg-slate-300/60 backdrop-blur-md p-10 shadow-xl">
          {/* Step Indicator */}
        <div className="flex justify-center bg-slate-800 mx-auto p-5 rounded-full h-30 w-30 items-center-safe">
            <FontAwesomeIcon icon={faAtom} size='4x' className="text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-900 tracking-widest">
          SPACES PROJECT
        </h1>
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 text-center">
              Personal Details
            </h2>
            <div className="mt-2 border-t border-slate-400/50" />
          </div>

          <form onSubmit={handleLogin}>
            {/* Fields */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-8">
              <button className="text-sm text-slate-500 underline underline-offset-2 hover:text-slate-700" disabled={loading}>
                {loading?"Logging in....":"Login"}
              </button>
              <button className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
