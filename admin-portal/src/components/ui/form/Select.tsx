"use client";

import { useFetch } from "@/hooks/client/useHTTP";
import { useEffect, useState } from "react";
import LoadingPath from "../skeletons/Paths";
import SkeletonCard from "../skeletons/Cards";

export default function Select({ title }: any) {
  const [topics, setTopics] = useState([]);
  const {
    data: topic,
    loading,
    error,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/topics`);
  if (loading) return <p className="bg-gray-100 px-2 text-xs py-1 rounded">Loading...</p>
  if (error) return <p>Error: {error}</p>;
  return (
    <select className="border border-gray-300 bg-gray-200 text-gray-500 px-4 py-1  rounded-md w-50 text-xs">
      <option value="" disabled>
        {" "}
        {title}
      </option>

      {topic?.map((topic: any) => (
        <option value={topic.id}>{topic.title}</option>
      ))}
      <option value="1"> Transformations</option>
      <option value="3"> Spaces</option>
      <option value="3"> Metrics</option>
    </select>
  );
}
