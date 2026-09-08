'use client';
import Table from "@/components/ui/table/Table";
import { useFetch } from "@/hooks/client/useHTTP";
import React from "react";

export default function TopicList() {
    const {data:topics,loading,error} = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/topics`, "GET");
    console.log(topics)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <Table topics={topics}/> */}
    </div>
  );
}
