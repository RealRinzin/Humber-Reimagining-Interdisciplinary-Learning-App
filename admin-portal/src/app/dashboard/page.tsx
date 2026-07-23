import NodeGroup from "@/components/layout/Dashboard/NodeGroup";
import PathCard from "@/components/ui/cards/paths/PathCard";
export default function HomePage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
        <div className="col-span-3">
          <div className="flex justify-between pb-2 border-b-2 border-gray-300">
            <h2 className="font-extrabold text-gray-700">Paths</h2>
            <button className="flex justify-center items-center rounded-full text-md h-6 w-6 font-medium bg-slate-300 text-gray-700 ">
              +
            </button>
          </div>
          {/* Path Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            {Array.from({ length: 3 }).map((_, index: number) => (
              <PathCard key={index} />
            ))}
          </div>
          {/* Node Card */}
          <div className="flex flex-row justify-between border-b-2 border-gray-300 pb-2 mb-4 mt-10">
            <h1 className="text-xl font-semibold text-gray-700">
              Nodes Groups
            </h1>
            <button className="flex justify-center items-center rounded-full text-md h-6 w-6 font-extrabold bg-slate-300">
              +
            </button>
          </div>
          {/* Groups */}
          <NodeGroup color="blue-600" />
          <NodeGroup color="purple-600" />
          <NodeGroup color="red-600" />
        </div>
        {/* Sidebar Areas */}
        <div> Sidebar</div>
      </div>
    </>
  );
}
