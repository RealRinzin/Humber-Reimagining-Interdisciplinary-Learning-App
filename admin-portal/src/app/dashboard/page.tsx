import NodeGroup from "@/components/layout/Dashboard/NodeGroup";
import PathCard from "@/components/ui/cards/paths/PathCard";
import React from "react";

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
          <div className="flex flex-row justify-between border-b border-gray-400 pb-2">
            <h1>Nodes</h1>
            <button>+</button>
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
