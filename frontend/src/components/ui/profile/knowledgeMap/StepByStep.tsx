"use client";
import { StepByStepDtypes } from "@/types/profile/step-by-step.types";
import TabHorizontal from "../../progress/TabHorizontal";
import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/clientFetch";

export default function StepByStep({
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
        allTopics.sort((a: any, b: any) => b.is_following - a.is_following),
      );
    }
    getTopics();
  }, []);
  return (
    <>
      <div className="h-2 w-full bg-gray-400 rounded-lg mt-4 relative">
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
        A little overview of how this path is structured. Study by covering the
        key concepts first then devlving deeper into each topic one by one.
      </p>
      {topics.map((topic: any, index: number) => (
        <TabHorizontal
          key={index}
          id={topic.id}
          name={topic.title}
          color={topic.node_color}
          video={topic?.videos[0]}
          slug={topic.slug}
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
