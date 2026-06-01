"use client";

import { clientFetch } from "@/lib/clientFetch";
import { calculateRingProgress } from "@/utils/RingProgressPerCalculator";
import { useEffect } from "react";
async function getUserContentSetting() {
  const res = await clientFetch(`/user-content-settings/users/me`);
  const { data: user } = await res.json();
  console.log(user);
  // const { code, rambling, quiz, interactive } = user;
  // const fields = ["code", "rambling", "quiz", "interactive"] as const;
  // console.log(fields.filter((field) => user[field]).length)
  // return fields.filter((field) => user[field]).length * 25;
}
export default function Test() {
  // Use Effect
  useEffect(() => {
    getUserContentSetting();
  }, []);
  return <>{calculateRingProgress()}</>;
}
