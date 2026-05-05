export default function ModelSpaceSkeleton() {
  return (
    <main className="px-1 md:px-20 py-5">
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex flex-1">
          {/* Main Content */}
          <div className="flex-1 p-6 space-y-5 max-w-175">
            {/* Header card */}
            <div className="bg-white rounded-lg p-5 flex items-center justify-between shadow-sm">
              <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-9 w-44 bg-gray-300 rounded-md animate-pulse" />
            </div>

            {/* Video section */}
            <div className="space-y-3">
              {/* Section title */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-5 w-16 bg-gray-300 rounded animate-pulse" />
              </div>
              {/* TLDR line */}
              <div className="space-y-1.5 pl-1">
                <div className="h-3.5 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-3.5 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
              {/* Video player */}
              <div
                className="rounded-lg overflow-hidden bg-gray-800 animate-pulse"
                style={{ aspectRatio: "16/9" }}
              >
                <div className="w-full h-full flex flex-col justify-end">
                  {/* Caption bar */}
                  <div className="flex justify-center mb-4">
                    <div className="h-5 w-56 bg-gray-600 rounded animate-pulse" />
                  </div>
                  {/* Controls bar */}
                  <div className="bg-black/50 px-4 py-2 flex items-center gap-3">
                    <div className="h-4 w-4 bg-gray-500 rounded animate-pulse" />
                    <div className="h-3 w-3 bg-gray-500 rounded animate-pulse" />
                    <div className="h-3 w-3 bg-gray-500 rounded animate-pulse" />
                    <div className="h-3 w-6 bg-gray-500 rounded animate-pulse" />
                    {/* Progress bar */}
                    <div className="flex-1 h-1.5 bg-gray-600 rounded-full animate-pulse">
                      <div className="h-full w-1/12 bg-red-400 rounded-full" />
                    </div>
                    <div className="h-3 w-6 bg-gray-500 rounded animate-pulse" />
                    <div className="h-3 w-6 bg-gray-500 rounded animate-pulse" />
                    <div className="h-3 w-3 bg-gray-500 rounded animate-pulse" />
                    <div className="h-3 w-3 bg-gray-500 rounded animate-pulse" />
                    <div className="h-3 w-3 bg-gray-500 rounded animate-pulse" />
                    <div className="h-3 w-3 bg-gray-500 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion rows */}
            {[
              { icon: "</>", label: "Code" },
              { icon: "≡", label: "Interactive Mode" },
              { icon: "?", label: "Test Your Knowledge" },
              { icon: "✦", label: "Umer's Rambling" },
            ].map(({ icon, label }, i) => (
              <div
                key={i}
                className="bg-white rounded-lg px-5 py-4 flex items-center justify-between shadow-sm animate-pulse"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-300 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-3 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-5 bg-gray-300 rounded-full" />
              </div>
            ))}

            {/* What is next */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-5 w-28 bg-gray-300 rounded animate-pulse" />
              </div>
              <div className="h-3.5 w-64 bg-gray-200 rounded animate-pulse" />

              {/* Module cards grid */}
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-4 shadow-sm space-y-3 animate-pulse"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-full bg-gray-200" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-3 w-full bg-gray-100 rounded" />
                      <div className="h-3 w-3/4 bg-gray-100 rounded" />
                    </div>
                    <div className="flex justify-end">
                      <div className="h-7 w-14 bg-gray-800 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — knowledge graph */}
          <div className="w-95 bg-[#060d1f] relative shrink-0 min-h-full">
            {/* Tracking toggle */}
            <div className="absolute top-3 right-3 flex items-center gap-2 animate-pulse">
              <div className="h-4 w-14 bg-gray-700 rounded" />
              <div className="h-4 w-8 bg-gray-600 rounded" />
            </div>

            {/* Zoom controls */}
            <div className="absolute top-10 right-3 flex flex-col gap-1 animate-pulse">
              <div className="h-6 w-6 bg-gray-700 rounded" />
              <div className="h-6 w-6 bg-gray-700 rounded" />
            </div>

            {/* Graph nodes — mimics the scattered bubble layout */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Large bg node (grey — unvisited) */}
              <div
                className="absolute rounded-full bg-gray-700 animate-pulse opacity-60"
                style={{ width: 80, height: 80, top: "18%", left: "28%" }}
              />
              {/* Pink nodes */}
              {[
                { w: 74, h: 74, top: "28%", left: "10%" },
                { w: 68, h: 68, top: "22%", left: "50%" },
                { w: 72, h: 72, top: "38%", left: "6%" },
                { w: 64, h: 64, top: "45%", left: "38%" },
                { w: 70, h: 70, top: "60%", left: "15%" },
                { w: 66, h: 66, top: "68%", left: "55%" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: s.w,
                    height: s.h,
                    top: s.top,
                    left: s.left,
                    background: "rgba(219, 39, 119, 0.35)",
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              ))}
              {/* Green node — current */}
              <div
                className="absolute rounded-full animate-pulse"
                style={{
                  width: 64,
                  height: 64,
                  top: "38%",
                  left: "58%",
                  background: "rgba(34, 197, 94, 0.35)",
                  animationDelay: "240ms",
                }}
              />
              {/* Label pills on nodes */}
              {[
                { top: "17%", left: "20%" },
                { top: "27%", left: "46%" },
                { top: "34%", left: "8%" },
                { top: "41%", left: "30%" },
                { top: "38%", left: "54%" },
                { top: "52%", left: "36%" },
                { top: "59%", left: "10%" },
                { top: "66%", left: "50%" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute h-4 rounded animate-pulse bg-gray-700 opacity-70"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    width: 60 + (i % 3) * 20,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}

              {/* Connector lines (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="30%"
                  y1="32%"
                  x2="55%"
                  y2="26%"
                  stroke="#6366f1"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="15%"
                  y1="45%"
                  x2="38%"
                  y2="42%"
                  stroke="#6366f1"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="38%"
                  y1="42%"
                  x2="62%"
                  y2="40%"
                  stroke="#6366f1"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="20%"
                  y1="63%"
                  x2="38%"
                  y2="54%"
                  stroke="#6366f1"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="58%"
                  y1="40%"
                  x2="60%"
                  y2="68%"
                  stroke="#6366f1"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-200 py-3 flex justify-center">
          <div className="h-3.5 w-40 bg-gray-300 rounded animate-pulse" />
        </footer>
      </div>
    </main>
  );
}
