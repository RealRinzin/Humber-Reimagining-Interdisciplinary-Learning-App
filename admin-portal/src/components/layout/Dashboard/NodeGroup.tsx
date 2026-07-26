import ListCard from "@/components/ui/cards/nodes/ListCard";
import NodeCard from "@/components/ui/cards/nodes/NodeCard";
function NodeGroup({ color,title }: any) {
  return (
    <>
      <div className="bg-slate-200/30 border-2 rounded-md border-slate-300 py-4 my-4">
        <div className="flex justify-between  items-center pb-2 px-6 border-b-2 border-slate-300">
          <h2 className="font-extrabold text-gray-700">{title} <span className="text-gray-500 font-thin">(Group Name)</span></h2>
          <button className="flex justify-center items-center rounded-full text-md h-6 w-6  bg-slate-300 font-medium">
            +
          </button>
        </div>
        <div className="p-6">
          {Array.from({ length: 3 }).map((_, index) => (
          <ListCard key={index} color={color} title={title}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default NodeGroup;
