'use client'

import NodeAnimations from "@/components/features/course/NodeAnimations";
import { useState } from "react";
export default function SearchPage() {
    const [isOn,setIsOn] = useState(true);
  return (
    <>
     <div className="bg-black">
      <NodeAnimations/>
    </div>
      <div className="h-screen">
        <button onClick={() => setIsOn((prev) => !prev)} className="bg-red-700 p-4">Click</button>
        {isOn?'true':'false'}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
          <div className={`bg-amber-400 col-span-1 ${isOn?'md:col-span-2':'md:col-span-3'}`}>First column</div>
          <div className="bg-green-600">Second column</div>
          <div className="bg-pink-600">Third column</div>
        </div>
      </div>
    </>
  );
}
