"use client";
import StudentVisibility from "@/components/ui/visibility/StudentVisibility";
import { useFetch } from "@/hooks/client/useHTTP";
import { useState } from "react";

export default function Page() {
      const {
        data: test,
        loading,
        error,
      } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/topics`,"GET");
      console.log(test)
  return (
    <StudentVisibility status={true} model="topics" id={1}/>
  )
}