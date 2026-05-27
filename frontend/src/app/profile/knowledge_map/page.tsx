"use client";

import CommonSideBarNode from "@/components/ui/nodeAnimation/CommonSideBarNode";
import ExploreModeNode from "@/components/ui/nodeAnimation/ExploreModeNode";
import ExploreMode from "@/components/ui/profile/knowledgeMap/ExploreMode";
import StepByStep from "@/components/ui/profile/knowledgeMap/StepByStep";

// import TabProgressBar from "@/components/ui/progress/Tab";
import { clientFetch } from "@/lib/clientFetch";
import { useEffect, useState } from "react";
/**
 * Main Page Return
 */
export default function KnowledgeMap() {
  // topics
  const [topics, setTopics] = useState<any[]>([]);
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);
  // Initialization of the sidebar title options
  const [sideBarOptions, setSideBarOptions] = useState([
    {
      id: 1,
      name: "Explore Mode ",
      status: true,
      component: ExploreMode,
      sidebarNode: ExploreModeNode,
    },
    {
      id: 2,
      name: "Suggested Path",
      status: false,
      component: StepByStep,
      sidebarNode: CommonSideBarNode,
    },
    // {
    //   id: 2,
    //   name: "Foundation First",
    //   status: false,
    //   component: FoundationFirst,
    //   sidebarNode: FoundationFirstNode,
    // },
  ]);

  //   Function to active and deactive the tab options
  const switchTab = (id: number) => {
    setSideBarOptions((prev) =>
      prev.map((option) => ({ ...option, status: option.id === id })),
    );
  };
  // On Click Function Call for the individual accordons
  async function selectProfileType(link: string) {
    const res = await clientFetch(`/${link}`);
    const { data: allTopics } = await res.json();
    setTopics(allTopics);
  }

  // Count the total watched topic or started
  const countTotalTopicStarted = () => {
    let count = 0;
    topics.forEach((topic) => {
      if (topic.is_following) {
        count += 1;
      }
    });
    return count;
  };
  // Use Effect Mounted during rendering
  useEffect(() => {
    async function getTopics() {
      const res = await clientFetch(`/topics`);
      const { data: allTopics } = await res.json();
      // We will sort the sequence of the response output data with respect
      // to whether the user has started the topic or not
      setTopics(
        allTopics.sort((a: any, b: any) => b.is_following - a.is_following),
      );
    }
    getTopics();
  }, []); // empty array = run once on mount

  return (
    <>
      <main className="grid grid-cols-6">
        {/* Sidebar */}
        <div className="bg-gray-300 p-6 col-span-6 md:col-span-2">
          <ul className="flex w-full justify-evenly gap-6 items-center-safe text-center">
            {sideBarOptions.map((title, index) => (
              <li
                className={`w-full ${title.status ? "bg-gray-900 text-white" : "bg-gray-400 text-gray-600"} font-medium  rounded-xl py-2  cursor-pointer`}
                onClick={() => {
                  selectProfileType("topics");
                  switchTab(title.id);
                }}
                key={index}
              >
                {title.name}
              </li>
            ))}
          </ul>

          <div className="my-4 h-screen flex flex-col">
            {(() => {
              const active = sideBarOptions.find((t) => t.status);
              if (!active) return null;
              return (
                <div className="flex-1 overflow-y-auto">
                  <active.component
                    topics={topics}
                    hoveredTopicId={hoveredTopicId}
                    onHover={(id: string) => setHoveredTopicId(id)}
                    onLeave={() => setHoveredTopicId(null)}
                    totalCount={() => countTotalTopicStarted()}
                  />
                </div>
              );
            })()}
          </div>
        </div>
        {/* Progress */}
        <div className="col-span-6 md:col-span-4 bg-blue-950">
          {(() => {
            const active = sideBarOptions.find((t) => t.status);
            if (!active) return null;
            return (
              <div className="flex-1 overflow-y-auto">
                <active.sidebarNode
                  hoveredTopicId={hoveredTopicId}
                />
              </div>
            );
          })()}
          {/* <CourseNodeLink /> */}
          {/* <CommonSideBarNode hoveredTopicId={hoveredTopicId} /> */}
        </div>
      </main>
    </>
  );
}
