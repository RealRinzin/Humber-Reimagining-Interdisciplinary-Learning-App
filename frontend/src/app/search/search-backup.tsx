
"use client";
import { useState } from "react";
import { useRouter,useSearchParams } from 'next/navigation'
 
// --- Types ---
type FilterName =
  | "Modules"
  | "Videos"
  | "Code"
  | "Interactive Demos"
  | "Ramblings"
  | "Resources";

interface SearchResult {
  type: string;
  title: string;
  excerpt: string;
  color: string;
  truncated?: boolean;
}

interface NodeIconProps {
  color: string;
}

interface ResultCardProps {
  result: SearchResult;
}

// --- Constants ---
const FILTERS: FilterName[] = [
  "Modules",
  "Videos",
  "Code",
  "Interactive Demos",
  "Ramblings",
  "Resources",
];

const RESULTS: SearchResult[] = [
  {
    type: "Module",
    title: "Camera Space",
    excerpt:
      "The <b>camera</b> is always at the origin looking down the -z axis, dammit! (Scott probably wrote this).",
    color: "#F72585",
  },
  {
    type: "Video",
    title: "Camera Space",
    excerpt:
      'Transcript: "So, this is <b>camera</b> space. Now, it always confuses me … <b>camera</b> space … cause there is no <b>camera</b>! Where is it? What\'s going on? Of course there is no <b>camera</b>! The <b>camera</b> is actually your eyeball. So you are looking at a computer screen and as you look at the computer screen, you are looking from your eye, through the screen. Alright"',
    color: "#F72585",
    truncated: true,
  },
  {
    type: "Code",
    title: "Space Camera",
    excerpt:
      "To get to <b>camera</b> space from world space:\n```cpp\n// Grab a 3D vertex from world space, turn it into 4D. Set w = 1, as we want to translate\nVec4 vertexPosWorldSpace = Vec4(vertex.x, vertex.y, vertex.z, 1.0f);\n// viewMatrix takes you from world space to <b>camera</b> space",
    color: "#F72585",
    truncated: true,
  },
  {
    type: "Quizzes",
    title: "Camera Space",
    excerpt:
      "Flashcard:\nIf your silly make-believe <b>camera</b> in world space is at position (0, 0, 5), then in <b>camera</b> space the world is translated by:",
    color: "#F72585",
    truncated: true,
  },
];

// --- Sub-components ---
function NodeIcon({ color }: NodeIconProps) {
  return (
    <div className="relative shrink-0 w-10 h-10">
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{ background: color, filter: "blur(6px)" }}
      />
      <div
        className="absolute inset-0 rounded-full border-4"
        style={{ borderColor: color, opacity: 0.5 }}
      />
      <div
        className="absolute inset-2 rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

function ResultCard({ result }: ResultCardProps) {
  const titleParts = result.title.split(" ");

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-pink-200 hover:shadow-md transition-all duration-200 group">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3 block">
        {result.type}
      </span>

      <div className="flex items-start gap-3 mb-3">
        <NodeIcon color={result.color} />
        <h3 className="text-lg font-semibold text-gray-800 leading-tight pt-1.5">
          <span className="font-black">{titleParts[0]}</span>
          {titleParts.length > 1 && (
            <span className="font-light text-gray-500">
              {" "}
              {titleParts.slice(1).join(" ")}
            </span>
          )}
        </h3>
      </div>

      <p
        className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4"
        dangerouslySetInnerHTML={{
          __html: result.excerpt.replace(
            /<b>/g,
            '<b class="text-gray-800 font-semibold">'
          ),
        }}
      />

      {result.truncated && (
        <span className="text-gray-400 text-sm block mb-4">…</span>
      )}

      <div className="flex justify-end">
        <button className="bg-gray-800 hover:bg-pink-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors duration-200">
          View
        </button>
      </div>
    </div>
  );
}

// --- Main component ---
export default function SearchPage() {
    const router = useRouter();
  const params = useSearchParams();
  console.log(params)
  const [query, setQuery] = useState<string>("Camera");
  const [activeFilters, setActiveFilters] = useState<FilterName[]>([]);

  const toggleFilter = (f: FilterName): void => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const clearFilters = (): void => setActiveFilters([]);

  const filteredResults = RESULTS.filter(
    (r) =>
      activeFilters.length === 0 ||
      activeFilters.some(
        (f) =>
          r.type.toLowerCase().includes(f.toLowerCase()) ||
          f.toLowerCase().includes(r.type.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans">
      {/* Search bar */}
      <div className="bg-[#4a5568] px-6 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto relative">
          <input
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Search…"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-6">
        {/* Sidebar filters */}
        <aside className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Filters
              </span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm3 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="space-y-2">
              {FILTERS.map((f) => (
                <label
                  key={f}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div
                    onClick={() => toggleFilter(f)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeFilters.includes(f)
                        ? "bg-pink-500 border-pink-500"
                        : "border-gray-300 group-hover:border-pink-300"
                    }`}
                  >
                    {activeFilters.includes(f) && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {f}
                  </span>
                </label>
              ))}
            </div>

            {activeFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="mt-4 w-full text-xs text-gray-500 hover:text-pink-500 bg-gray-100 hover:bg-pink-50 rounded-lg py-1.5 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-4">
            Results for{" "}
            <span className="font-semibold text-gray-800">"{query}"</span>
          </p>

          <div className="space-y-4">
            {filteredResults.map((result, i) => (
              <ResultCard key={i} result={result} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}