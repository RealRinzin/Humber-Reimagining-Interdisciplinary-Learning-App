"use client";
import { useFetch } from "@/hooks/client/useHTTP";
import { useEffect } from "react";
import ChildPrp from "../dashboard/modalTest/page";
export default function page() {
  const {
    data: data,
    loading,
    error,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/topics`, "GET");
  const refreshData = async () => {
    console.log("Refreshed");
  };

  useEffect(() => {
    refreshData();
  });
  return <div>
    <ChildPrp onRefresh={refreshData}/>
  </div>;
}
