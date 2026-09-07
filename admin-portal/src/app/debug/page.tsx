"use client";
import StudentVisibility from "@/components/ui/visibility/StudentVisibility";
import { useState } from "react";

export default function Page() {

  return (
    <StudentVisibility status={true} model="topics" id={1}/>
  )
}