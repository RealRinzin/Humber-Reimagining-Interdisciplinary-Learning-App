'use client'
import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
// import TabProgressBar from "@/components/ui/progress/Tab";
import TabHorizontal from "@/components/ui/progress/TabHorizontal";
import { useEffect, useState } from "react";
export default  function KnowledgeMapPage() {
 const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/videos`, {
            credentials: 'include', // browser handles cookies + referer automatically
            headers: {
                Accept: 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => setData(data));
    }, []);
  return (
    <>
      <main className="grid grid-cols-6">
        {/* Sidebar */}
        <div className="bg-gray-300 p-6 col-span-2">
          <ul className="flex w-fulljustify-evenly gap-6 items-center-safe text-center">
            <li className="w-full bg-gray-400 rounded-xl py-2 text-gray-600">
              Explore Mode
            </li>
            <li className="w-full bg-gray-900 rounded-xl py-2 text-white">
              Main Path
            </li>
            <li className="w-full bg-gray-400 rounded-xl py-2 text-gray-600">
              Secondary Path
            </li>
          </ul>
          <div className="h-2 w-full bg-gray-400 rounded-lg mt-4 relative">
            <div className="h-2 w-1/3 bg-gray-700 rounded-lg mt-2 relative"></div>
          </div>
          <p className="py-2 text-sm font-normal text-gray-600">
            10% Completed
          </p>
          <p className="text-gray-600">
            A little overview of how this path is structured. Study by covering
            the key concepts first then devlving deeper into each topic one by
            one.
          </p>
          {/* Progres Tabs */}
          <div className="my-4">
          <TabHorizontal name={"Intro to Spaces"} color={"color"}/>
          <TabHorizontal name={"Model Space"} color={"color"}/>
          <TabHorizontal name={"Model Matrix"} color={"color"}/>
          <TabHorizontal name={"Module"} color={"color"}/>
          <TabHorizontal name={"Volexity"} color={"color"}/>
          <TabHorizontal name={"Vertex"} color={"color"}/>
          <TabHorizontal name={"Translation"} color={"color"}/>
          </div>
        </div>
        {/* Progress */}
        <div className="col-span-4 bg-blue-950">
          <CourseNodeLink />
        </div>
      </main>
      {/* <TabProgressBar name="Coming up " completed={4} incomplete={10} /> */}
    </>
  );
}
