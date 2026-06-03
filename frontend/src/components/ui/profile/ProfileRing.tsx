export default async function ProfileCirleRing() {
  const arr =[];
  for (let index = 0; index < 19; index++) {
    arr.push("8 15")
  }
  const total = arr.join().replace(/ , /g, "")

  return (
    <div className="flex flex-col gap-y-3 py-2">
      <h1 className="font-semibold text-gray-700">Your Progress</h1>


      <div className="relative flex h-30 w-30 items-center justify-center">
        {/* Profile image */}
        <img
          src="/img/student_icon.png"
          alt=""
          className="h-24 w-24 rounded-full"
        />
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
            strokeDasharray="8 15"
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
            strokeDasharray={`${total} 8 15`}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="text-center py-2">
        <p className="text-sm font-semibold text-gray-700">0/18</p>
        <p className="text-xs font-light text-gray-500">Modules Complete</p>
      </div>
    </div>
  );
}
