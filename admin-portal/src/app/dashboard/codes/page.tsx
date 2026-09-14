// app/code/page.tsx (or wherever CodePage lives)
import { Suspense } from "react";
import { serverFetch } from "@/hooks/server/useServer";
import DataTable, { Column } from "@/components/ui/table/DataTable";
import { truncate } from "@/lib/truncate";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";

type Code = {
  id: number;
  description: string;
  code: string;
};

const columns: Column<Code>[] = [
  { key: "id", header: "S.No" },
  {
    key: "description",
    header: "Description",
    render: (row) => <>{truncate(row.description, 60)}</>,
  },
  {
    key: "code",
    header: "Code",
    render: (row) => (
      <pre className="max-w-md overflow-x-auto whitespace-pre-wrap text-xs bg-gray-700 text-slate-200 p-1 rounded">
        {truncate(row.code, 60)}
      </pre>
    ),
  },
];

export default function CodePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<TableSkeleton rows={5} columns={2}/>}>
        <CodeList />
      </Suspense>
    </div>
  );
}

async function CodeList() {
  const codes: Code[] = await serverFetch("/codes");
  return <DataTable data={codes} columns={columns} rowKey={(row) => row.id} />;
}
