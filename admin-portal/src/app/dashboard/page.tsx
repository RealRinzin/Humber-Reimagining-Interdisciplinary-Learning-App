import NodeGroup from "@/components/layout/Dashboard/NodeGroup";
import PathCard from "@/components/ui/cards/paths/PathCard";
export default function HomePage() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="flex flex-row justify-between border-b border-gray-400 pb-2">
            <h1>Paths</h1>
            <button>+</button>
          </div>
          {/* Path Card */}
          <div className="grid grid-cols-3 gap-4 my-4">
            {Array.from({ length: 3 }).map((_, index:number) => (
              <PathCard key={index} />
            ))}
          </div>
          {/* Node Card */}
          <div className="flex flex-row justify-between border-b-2 border-gray-300 pb-2 mb-4">
            <h1 className="text-xl font-semibold text-gray-700">Nodes Groups</h1>
            <button className="flex justify-center items-center rounded-full text-md h-6 w-6 font-extrabold bg-gray-700 text-white">+</button>
          </div>
          {/* Groups */}
          <NodeGroup color="pink-600"/>
          <NodeGroup color="blue-600"/>
          <NodeGroup color="purple-600"/>
        </div>
        {/* Sidebar Areas */}
        <div> Sidebar</div>
      </div>
    </>
  );
}
