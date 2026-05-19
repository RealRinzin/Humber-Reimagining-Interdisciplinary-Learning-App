"use client";
import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
// import TabProgressBar from "@/components/ui/progress/Tab";
import TabHorizontal from "@/components/ui/progress/TabHorizontal";
import { clientFetch } from "@/lib/clientFetch";
import { useEffect, useState } from "react";
/**
 *
 * Main Page Return
 */
export default function KnowledgeMapPage() {
  // topics
  const [topics, setTopics] = useState<any[]>([]);
  // On Click Function Call for the individual accordons
  async function selectProfileType(link: string) {
    const res = await clientFetch(`/${link}`);
    const { data: allTopics } = await res.json();
    setTopics(allTopics);
  }

  // Use Effect Mounted during rendering
  useEffect(() => {
    async function getTopics() {
      const res = await clientFetch(`/topics`);
      const { data: allTopics } = await res.json();
      // console.log(allTopics)
      // console.log(allTopics.sort((a:any, b:any) => b.is_following - a.is_following));
      setTopics(allTopics.sort((a:any, b:any) => b.is_following - a.is_following));
    }
    getTopics();
  }, []); // empty array = run once on mount

  return (
    <>
      <main className="grid grid-cols-6">
        {/* Sidebar */}
        <div className="bg-gray-300 p-6 col-span-2">
          <ul className="flex w-fulljustify-evenly gap-6 items-center-safe text-center">
            <li
              className="w-full bg-gray-900 rounded-xl py-2 text-white cursor-pointer"
              onClick={() => selectProfileType("topics")}
            >
              Step-by-Step
            </li>
            <li
              className="w-full bg-gray-400 rounded-xl py-2 text-gray-600"
              // onClick={() => selectProfileType("topic-connections")}
            >
              Foundation First
            </li>
            <li
              className="w-full bg-gray-400 rounded-xl py-2 text-gray-600"
              // onClick={() => selectProfileType("users")}
            >
              Explore Mode
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
          <div className="my-4 h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {topics.map((topic: any, index: number) => (
                <TabHorizontal
                  key={index}
                  id={topic.id}
                  name={topic.title}
                  color={topic.node_color}
                  slug={topic.slug}
                  description={topic.description}
                  is_started={topic.is_following}
                  ringInformation={topic?.videos}
                />
              ))}
            </div>
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
