"use client";

import { useFetch, usePost } from "@/hooks/client/useHTTP";
import { AddNewTopic, TopicType } from "@/types/topic.type";
import { useEffect, useState } from "react";

export default function TopicConnectionDropdown({
  topicId,
}: {
  topicId: number | null;
}) {
  const {
    postData,
    loading: load,
    error: err,
  } = usePost(`/topics/${topicId}/connections`);
  // Store selected IDs as an array of strings
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const {
    data: data,
    loading,
    error,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/topics`);

  useEffect(() => {
    if (!topicId) return; // don't post until topic exists
    async function topicConnectionFunction() {
      const res = await postData({ connected_topic_ids: selectedOptions });
    }
    topicConnectionFunction();
  }, [topicId]);
  if (loading)
    return <p className="bg-gray-100 px-2 text-xs py-1 rounded">Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;
    // Prevent duplicates and add new value to state
    if (!selectedOptions.includes(value)) {
      setSelectedOptions((prev) => [...prev, value]);
    }
    // Reset select dropdown back to default
    e.target.value = "";
  };

  const handleRemove = (idToRemove: string) => {
    setSelectedOptions((prev) => prev.filter((id) => id !== idToRemove));
  };

  return (
    <div className="">
      <select
        name="topic_id"
        id="topic_id"
        className=" bg-gray-200 text-gray-500 px-4 py-1  rounded-md w-50 text-xs"
        onChange={handleSelect}
        defaultValue=""
      >
        <option value="" disabled>
          Select a topic...
        </option>
        {(data as any)?.map((topic: TopicType) => (
          <option
            key={topic.id}
            value={topic.id}
            disabled={selectedOptions.includes(String(topic.id))}
          >
            {topic.title}
          </option>
        ))}
      </select>

      {/* Selected Tags Display */}
      <ul className="flex flex-wrap gap-4 my-4">
        {selectedOptions.map((id) => {
          const topic = (data as any)?.find((t: any) => String(t.id) === id);
          return (
            <li
              key={id}
              className="text-xs px-3 py-1.5 bg-gray-600 rounded-md text-white relative pr-4 font-thin"
            >
              {topic?.title}
              <button
                type="button"
                onClick={() => handleRemove(id)}
                className="text-xs absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white h-4 w-4 flex justify-center items-center rounded-full text-[10px] leading-none"
                aria-label={`Remove ${topic?.title}`}
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
