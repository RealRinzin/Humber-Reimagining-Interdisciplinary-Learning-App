export default function ProfileCirleRing() {
  return (
    <div className="flex w-auto flex-col justify-center">
      <h1 className="font-semibold text-gray-700">Your Progress</h1>

      <div className="relative flex h-30 w-30 items-center justify-center">
        {/* Profile image */}
        <img
          src="https://picsum.photos/id/237/200/300"
          alt=""
          className="h-24 w-24 rounded-full"
        />

        {/* SVG dashed ring — 6 dashes, first 2 green, rest gray */}
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
            strokeLinecap="square"
          />
          {/* Green dashes (first 2 only) */}
          {/* Each segment = 59.69px. Dash=20, gap=39.69 */}
          {/* 2 dashes = 2 × 59.69 = 119.38px, then hide the rest */}
          <circle
            cx="60"
            cy="60"
            r="57"
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeDasharray="8 21.85 8 21.85 8 21.85 8 999"
            strokeLinecap="square"
          />
        </svg>
      </div>

      <p className="text-sm font-semibold text-gray-700">3/12</p>
      <p className="text-xs font-light text-gray-500">Modules Complete</p>
    </div>
  );
}
