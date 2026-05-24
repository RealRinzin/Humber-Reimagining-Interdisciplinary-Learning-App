"use client";
import AnimatedCourseNode from "@/components/features/course/AnimatedCourseNode";
import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import ExploreMode from "@/components/ui/profile/knowledgeMap/ExploreMode";
import FoundationFirst from "@/components/ui/profile/knowledgeMap/FoundationFirst";
import StepByStep from "@/components/ui/profile/knowledgeMap/StepByStep";
// import TabProgressBar from "@/components/ui/progress/Tab";
import TabHorizontal from "@/components/ui/progress/TabHorizontal";
import { clientFetch } from "@/lib/clientFetch";
import { useEffect, useState } from "react";
import Component from "video.js/dist/types/component";
/**
 * Main Page Return
 */
export default function KnowledgeMap() {
  // topics
  const [topics, setTopics] = useState<any[]>([]);
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);
  // Initialization of the sidebar title options
  const [sideBarOptions, setSideBarOptions] = useState([
    { id: 1, name: "Step by Step", status: false, component: StepByStep },
    {
      id: 2,
      name: "Foundation First",
      status: false,
      component: FoundationFirst,
    },
    { id: 3, name: "Explore Mode ", status: true, component: ExploreMode },
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
        <div className="bg-gray-300 p-6 col-span-2">
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
        <div className="col-span-4 bg-blue-950">
          {/* <CourseNodeLink /> */}
          <AnimatedCourseNode hoveredTopicId={hoveredTopicId} />
        </div>
      </main>
    </>
  );
}
