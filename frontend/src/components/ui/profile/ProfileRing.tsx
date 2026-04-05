import { cookies } from "next/headers";

// import { useEffect, useState } from "react";
export default async function ProfileCirleRing() {
  
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  
  const res = await fetch('http://localhost:8000/api/v1/users', {
    headers: {
      Cookie: cookieHeader,
      Referer: 'http://localhost:3000', // required for Sanctum stateful check
    },
    cache: 'no-store',
  });

  const user = await res.json();
  console.log(user)
  return (
    <div className="flex flex-col gap-y-3 py-2">
      <h1 className="font-semibold text-gray-700">Your Progress</h1>

      <div className="relative flex h-30 w-30 items-center justify-center">
        {/* Profile image */}
        <img src="/img/profile.jpg" alt="" className="h-24 w-24 rounded-full" />
        <svg
          className="absolute inset-0"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {/* Gray dashes (all 6, as base) */}
          <circle
            cx="60"
            cy="60"
            r="57"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="6"
            strokeDasharray="8 21.85"
            strokeLinecap="round"
          />
          {/* Green dashes (first 2 only) */}
          {/* Each segment = 59.69px. Dash=20, gap=39.69 */}
          {/* 2 dashes = 2 × 59.69 = 119.38px, then hide the rest */}
          <circle
            cx="60"
            cy="60"
            r="57"
            fill="none"
            stroke="#1e2939"
            strokeWidth="6"
            strokeDasharray="8 21.85 8 21.85 8 21.85 8 999"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="text-center py-2">
        <p className="text-sm font-semibold text-gray-700">4/12</p>
        <p className="text-xs font-light text-gray-500">Modules Complete</p>
      </div>
    </div>
  );
}
