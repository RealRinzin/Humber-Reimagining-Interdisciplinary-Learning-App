// components/ui/table/DataTable.tsx
import { ReactNode } from "react";

export type Column<T> = {
  key: keyof T & string;
  header: string;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
};

export default function DataTable<T>({
  data,
  columns,
  rowKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto  my-10">
      <button className="my-1 bg-gray-400 px-2 py-1 rounded-md text-slate-200 text-md">Add Code</button>
      <div className="rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left  p-2">
                  {col.header}
                </th>
              ))}
              <th className="text-left p-2">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr key={rowKey(row)} className="odd:bg-white even:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
                <td className="px-4 py-3 text-gray-700">Delete Edit View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
