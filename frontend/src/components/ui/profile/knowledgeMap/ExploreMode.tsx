"use client";

import { StepByStepDtypes } from "@/types/profile/step-by-step.types";
import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/clientFetch";
import ExploreHorizontalTab from "./Tabs/ExploreHorizontalTab";
export default function ExploreMode({
  // topics,
  onHover,
  onLeave,
  totalCount,
}: StepByStepDtypes) {
  const [topics, setTopics] = useState<any[]>([]);
  useEffect(() => {
    async function getTopics() {
      const res = await clientFetch(`/topics`);
      const { data: allTopics } = await res.json();
      // We will sort the sequence of the response output data with respect
      // to whether the user has started the topic or not
      setTopics(
        // allTopics.sort((a: any, b: any) => b.is_following - a.is_following),
        allTopics.filter((n: any) => n.is_following === true),
      );
    }
    getTopics();
  }, []); // empty array = run once on mount
  return (
    <>
      <div className="h-2 w-full bg-gray-400 rounded-lg mt-4 relative">
        {/* Progres Tabs */}
        <div
          className={`h-2 bg-gray-700  w-1/2 rounded-lg mt-2 relative`}
          style={{
            width: `${(totalCount() / 18) * 100}%`,
          }}
        ></div>
      </div>
      <p className="py-3 text-sm font-bold text-gray-500 text-right">
        {totalCount()}/18 Completed
      </p>
      <p className="text-gray-600">
        Explore the modules in any order and learn at your own pace. There's no
        set path!
      </p>
      {topics.map((topic: any, index: number) => (
        <ExploreHorizontalTab
          key={index}
          video={topic?.videos[0]}
          id={topic.id}
          name={topic.title}
          color={topic.node_color}
          slug={topic.slug}
          total_started={topics?.length}
          description={topic.description}
          is_started={topic.is_following}
          ringInformation={topic?.videos}
          onHover={() => onHover?.(String(topic.id))}
          onLeave={onLeave}
        />
      ))}
    </>
  );
}
