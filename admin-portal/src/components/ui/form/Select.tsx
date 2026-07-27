"use client";

import { useFetch } from "@/hooks/client/useHTTP";
import { useEffect, useState } from "react";
import LoadingPath from "../skeletons/Paths";
import SkeletonCard from "../skeletons/Cards";

export default function Select({ title,endpoint }: any,) {
  const {
    data: data,
    loading,
    error,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/${endpoint}`,"GET");
  if (loading) return <p className="bg-gray-100 px-2 text-xs py-1 rounded">Loading...</p>
  if (error) return <p>Error: {error}</p>;
  return (
    <select className="border border-gray-300 bg-gray-200 text-gray-500 px-4 py-1  rounded-md w-50 text-xs">
      <option value="" disabled>
        {" "}
        {title}
      </option>

      {data?.map((data: any,index:number) => (
        <option value={data.id} key={index}>{data.title}</option>
      ))}
      <option value="1"> Transformations</option>
      <option value="3"> Spaces</option>
      <option value="3"> Metrics</option>
    </select>
  );
}
