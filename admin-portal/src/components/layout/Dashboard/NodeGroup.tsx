import ListCard from "@/components/ui/cards/nodes/ListCard";
import NodeCard from "@/components/ui/cards/nodes/NodeCard";
function NodeGroup({ color }: any) {
  return (
    <>
      {/* <div className="my-6">
        <h2 className="text-lg font-extrabold my-2 text-gray-600">Group 1</h2>
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <NodeCard key={index} color={color} />
          ))}
        </div>
      </div> */}

      <div className="bg-gray-200/50 border-2 rounded-md border-gray-300 py-4 my-4">
        <div className="flex justify-between  items-center pb-2 px-6 border-b-2 border-gray-300">
          <h2 className="font-extrabold text-gray-700">Transformation <span className="text-gray-500 font-thin">(Group Name)</span></h2>
          <button className="flex justify-center items-center rounded-full text-md h-6 w-6  bg-slate-300 font-medium">
            +
          </button>
        </div>
        <div className="p-6">
          {Array.from({ length: 3 }).map((_, index) => (
          <ListCard key={index} color={color} />
          ))}

        </div>
      </div>
    </>
  );
}

export default NodeGroup;
