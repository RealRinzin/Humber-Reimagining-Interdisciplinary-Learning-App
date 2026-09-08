'use client'
import NodeGroup from "@/components/layout/Dashboard/NodeGroup";
import NodeSidebar from "@/components/layout/NodeSidebar";
import PathCard from "@/components/ui/cards/paths/PathCard";
import { useFetch } from "@/hooks/client/useHTTP";
import Link from "next/link";
export default  function HomePage() {
  const {
    data: res,
    loading,
    error,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/node_groups`, "GET");
  if (loading)
    return <p className="bg-gray-100 px-2 text-xs py-1 rounded">Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
          <div className="col-span-3">
            <div className="flex justify-between pb-2 border-b-2 border-gray-300">
              <h2 className="text-xl font-semibold text-gray-700">Paths</h2>
              <button className="flex justify-center items-center rounded-full text-md h-6 w-6 font-medium bg-slate-300 text-gray-700 ">
                +
              </button>
            </div>
            {/* Path Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              {/* {Array.from({ length: 3 }).map((_, index: number) => ( */}
              <PathCard title="Explore" />
              <PathCard title="Step-By-Step" />
              <PathCard title="Foundation" />
              {/* ))} */}
            </div>
            {/* Node Card */}
            <div className="flex flex-row justify-between border-b-2 border-gray-300 pb-2 mb-4 mt-10">
              <h1 className="text-xl font-semibold text-gray-700">
                Nodes Groups
              </h1>
              <Link
                href="/dashboard/topics"
                className="flex justify-center items-center rounded-full text-md h-6 w-6 font-extrabold bg-slate-300"
              >
                +
              </Link>
              {/* <button className="flex justify-center items-center rounded-full text-md h-6 w-6 font-extrabold bg-slate-300">
              +
            </button> */}
            </div>
            {/* Groups */}
            {
              res?.data?.map((nodes:any,index:number) =>(
                <NodeGroup key={index} data={nodes} />
              ))
            }

          </div>
          {/* Sidebar Areas */}
          <div className="bg-slate-900"> 
            <NodeSidebar/>
          </div>
        </div>
      </div>
    </>
  );
}
