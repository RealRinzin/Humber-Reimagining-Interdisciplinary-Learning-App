"use client";
import { login } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Login Functioin
  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    // TODO: POST { username, password } to /api/auth/login
    // On success: redirect to /dashboard
    // On failure: setError(response.message) and setLoading(false)
    try {
      setLoading(true);
      await login(user.username, user.password);
    } catch (error) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /**
     * Login form for the Spaces Project. Submits credentials to the auth API
     * and redirects to /dashboard on success.
     */
    <>
      <div
        className="flex justify-center-safe items-center h-screen"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="w-full max-w-xl rounded-2xl bg-slate-300/60 backdrop-blur-md p-10 shadow-xl">
          {/* Step Indicator */}
          <div className="flex justify-center bg-slate-800 mx-auto p-5 rounded-full h-30 w-30 items-center-safe">
            <Image
              src="/img/SpaceLogo.png"
              alt="Space Project"
              height={100}
              width={100}
            />
            {/* <FontAwesomeIcon icon={faAtom} size="4x" className="text-white" /> */}
          </div>
          <h1 className="text-2xl font-semibold text-center py-4 text-gray-900 tracking-widest">
            SPACES PROJECT
          </h1>
          <div className="mt-2 border-t border-slate-300/50 py-4" />
          <form onSubmit={handleLogin}>
            {/* Error Message*/}
            {error && <p className="text-red-800 py-2">{error}</p>}
            {/* Fields */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  className="w-full mt-2 rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full mt-2 rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center justify-start text-center gap-4 mt-4">
              <button
                className="w-1/3 bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                disabled={loading}
              >
                {loading ? "Logging in...." : "Login"}
              </button>
            </div>
            <p className="text-gray-800 text-xs mt-4 pt-2">
              Don't have an Account?
              <Link
                href="/onboarding"
                className="text-slate-900 font-extrabold hover:text-slate-900 px-2 underline"
              >
                Create one here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
