import ListCard from "@/components/ui/cards/nodes/ListCard";
import NodeCard from "@/components/ui/cards/nodes/NodeCard";
import Link from "next/link";
function NodeGroup({data:data}:any) {
  return (
    <>
      <div className={`bg-slate-200/30 border-2 rounded-md border-slate-300 py-4 my-4`}>
        <div className="flex justify-between  items-center pb-2 px-6 border-b-2 border-slate-300">
          <h2 className="font-extrabold text-gray-700">{data.name}</h2>
          <Link  href={`/dashboard/topics`} className="flex justify-center items-center rounded-full text-md h-6 w-6  bg-slate-300 font-medium">
            
            +
          </Link>
        </div>
        <div className="p-6">

              {
                data?.topics?.map((topics:any,index:number)=>(
                  <ListCard key={index} topics={topics} node_color={data?.color ?? 'gray'}/>
                ))
              }
        </div>
      </div>
    </>
  );
}

export default NodeGroup;
