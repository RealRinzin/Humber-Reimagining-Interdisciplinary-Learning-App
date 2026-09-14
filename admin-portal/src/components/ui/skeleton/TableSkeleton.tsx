
// components/ui/table/TableSkeleton.tsx
export default function TableSkeleton({
  rows = 5,
  columns = 2,
}: {
  rows?: number;
  columns?: number;
}) {
  // vary widths so bars don't look like a copy-pasted block
  const widths = ["w-3/4", "w-1/2", "w-5/6", "w-2/3", "w-full"];

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <th key={colIdx} className="text-left p-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td key={colIdx} className="p-2">
                <div
                  className={`h-4 ${widths[(rowIdx + colIdx) % widths.length]} bg-gray-200 rounded animate-pulse`}
                  style={{ animationDelay: `${rowIdx * 75}ms` }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
