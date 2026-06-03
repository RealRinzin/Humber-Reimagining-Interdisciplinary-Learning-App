import { highlightKeyword } from "@/lib/common";
import Link from "next/link";

interface NodeIconProps {
  color: string;
}

interface SearchResultCardProps {
  searched: any;
  query: string;
}

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
export default function SearchResultCard({
  searched: result,
  query,
}: SearchResultCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-pink-200 hover:shadow-md transition-all duration-200 group">
      <span
        className={`inline-flex items-center rounded-full uppercase  px-2.5 py-0.5 text-xs font-semibold my-2
         ${
           result.type === "topic"
             ? "text-blue-800 bg-blue-100"
             : result.type === "quiz"
               ? "text-red-800 bg-red-100"
               : "text-gray-800 bg-gray-100 "
         }
         `}
      >
        {result.type}
      </span>
      <div className="flex items-start gap-3 mb-3">
        <NodeIcon color={result?.node_color ?? "red"} />
        <h3 className="text-lg font-semibold text-gray-800 leading-tight pt-1.5">
          <span className="font-black text-bold">{result.title}</span>
        </h3>
      </div>
      <p
        className="font-light text-gray-500"
        dangerouslySetInnerHTML={{
          __html:
            result.type === "quiz"
              ? highlightKeyword(query, result.question)
              : result.type === "code"
                ? highlightKeyword(query, result.code)
                : highlightKeyword(query, result.description),
        }}
      />
      <div className="flex justify-end">
        {result.type === "topic" && (
          <Link
            href={`/video/${result.slug}`}
            className="bg-gray-800 hover:bg-pink-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors duration-200"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
}
