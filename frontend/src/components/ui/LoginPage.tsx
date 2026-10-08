"use client";
import { useRef, useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom } from "@fortawesome/free-solid-svg-icons";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

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
      router.push("/profile/knowledge_map");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  //
  const ref = useRef<HTMLDivElement>(null);
  const initVanta = () => {
    
    if ((window as any).VANTA && ref.current) {
      (window as any).VANTA.NET({
        el: ref.current,
        color: 0xff3f81, // line/dot color
        backgroundColor: 0x0b1220, // background color
        points: 12, // number of points
        maxDistance: 20, // how far points connect
        spacing: 18, // spacing between points
        showDots: true, // show dots at intersections
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.0,
        scaleMobile: 1.0,
        // camera zoom
        minHeight: 200,
        minWidth: 200,
      });
    }
  };

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"
        strategy="afterInteractive"
        onLoad={initVanta}
      />
      <div
        className="flex justify-center-safe items-center h-screen"
        ref={ref}
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="w-full max-w-xl rounded-2xl bg-slate-300/60 backdrop-blur-md p-10 shadow-xl">
          {/* Step Indicator */}
          <div className="flex justify-center bg-slate-800 mx-auto p-5 rounded-full h-30 w-30 items-center-safe">
            <Image src="/img/SpaceLogo.png" alt="Space Project" height={100} width={100}/>
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center justify-start text-center gap-4 mt-4">
              <button suppressHydrationWarning type="submit"
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
