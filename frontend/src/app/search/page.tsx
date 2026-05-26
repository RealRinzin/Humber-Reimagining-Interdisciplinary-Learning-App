"use client";

import SearchResultCard from "@/components/ui/search/ResultCard";
import { clientFetch } from "@/lib/clientFetch";
import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
/**
 * @returns 
 */

export default function SearchPage() {
  const router = useRouter(); // router
  const params = useSearchParams(); // params
  const q = params.get("q") ?? "";
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(q);
  async function getSearchResults(query: string) {
    try {
      const res = await clientFetch(`/search?q=${query}`);
      if (!res?.ok) throw new Error(`Server error (${res.status})`);
      const {data} = await res.json();
      setResults(data);
      // return data ?? [];
    } catch (error) {}
  }

function handleSearch() {
  router.push(`?q=${encodeURIComponent(query)}`);
  getSearchResults(query);
}
  useEffect(() => {
    // Call the function
    getSearchResults(query);
  }, [q]);
  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans">
      {/* Search */}
      <div className="bg-[#4a5568] px-6 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Search… (press Enter)"
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
      {/* sidebar */}
      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-6">
        {/* <aside className="w-56 shrink-0">
          <aside className="w-56 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <span className="text-sm font-semibold text-gray-700 block mb-3">
                Filters
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors border-gray-300 group-hover:border-pink-300"></div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Modules
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors border-gray-300 group-hover:border-pink-300"></div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Videos
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors border-gray-300 group-hover:border-pink-300"></div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Code
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors border-gray-300 group-hover:border-pink-300"></div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Interactive Demos
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors border-gray-300 group-hover:border-pink-300"></div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Ramblings
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors border-gray-300 group-hover:border-pink-300"></div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Resources
                  </span>
                </label>
              </div>
            </div>
          </aside>
        </aside> */}
        <main className="flex-1 min-w-0">
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              {results.length} results for{" "}
              <span className="font-semibold text-gray-800">"{query}"</span>
            </p>
            {results.map((result, index) => (
              <SearchResultCard searched={result} query={query} key={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
