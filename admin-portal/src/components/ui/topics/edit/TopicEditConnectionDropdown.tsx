import { useFetch, usePatch, usePost } from "@/hooks/client/useHTTP";
import { AddNewTopic } from "@/types/topic.type";
import { useEffect, useState } from "react";

export default function TopicEditConnectionDropdown({
  topicId,
  connections,
  updateFun,
}: {
  topicId: number | null;
  connections: any;
  updateFun: (data: AddNewTopic) => Promise<void>;
}) {
  const {
    postData,
    loading: load,
    error: err,
  } = usePost(`/topics/${topicId}/connections`);

  const [selectedOptions, setSelectedOptions] = useState<any[]>(connections);
  const selectedIds = selectedOptions.map((o: any) => o.id);
  console.log(selectedIds)
  const {
    data: topics,
    loading,
    error,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/topics`);
  useEffect(() => {
    async function topicConnectionFunction() {
      const res = await postData({ connected_topic_ids: selectedIds });
    }
    topicConnectionFunction();
  }, [updateFun]);
  if (loading)
    return <p className="bg-gray-100 px-2 text-xs py-1 rounded">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;
    const selectedTopic = (topics as any)?.find(
      (t: any) => String(t.id) === value,
    );
    if (!selectedTopic) return;
    setSelectedOptions((prev: any[]) =>
      prev.some((o) => o.id === selectedTopic.id)
        ? prev
        : [...prev, selectedTopic],
    );
    e.target.value = "";
  };

  const handleRemove = (idToRemove: number) => {
    setSelectedOptions((prev: any[]) =>
      prev.filter((o: any) => o.id !== idToRemove),
    );
  };

  return (
    <div>
      <select
        name="topic_id"
        id="topic_id"
        onChange={handleSelect}
        className=" bg-gray-200 text-gray-500 px-4 py-1  rounded-md w-50 text-xs"
      >
        <option value="" disabled>
          Select the Options
        </option>
        {(topics as any)?.map((topic: any, index: number) => (
          <option
            value={topic?.id}
            key={index}
            disabled={selectedIds.includes(Number(topic.id))}
          >
            {topic.title}
          </option>
        ))}
      </select>
      <ul className="flex gap-4 my-4">
        {selectedOptions.map((options: any) => (
          <li
            key={options.id}
            className="text-xs px-3 py-1.5 bg-gray-600 rounded-md text-white relative pr-4 font-thin"
          >
            {options?.title}
            <button
              type="button"
              onClick={() => handleRemove(options.id)}
              className="text-xs absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white h-4 w-4 flex justify-center items-center rounded-full text-[10px] leading-none"
              aria-label={`Remove ${options?.title}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
