"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/clientFetch";
import { userVideoSettingTypes } from "@/types/user-video-setting.types";

// const CourseTitle = ({ title }: { title: string }) => {
export default function CourseTitle({
  title,
  videoID,
  status,
}: {
  title: string;
  videoID: number;
  status: userVideoSettingTypes;
}) {
  const router = useRouter();

  const [markCompleteAll, setMarkCompleteAll] = useState(
    status?.all_checked ? true : false,
  );
  // Update all check
  async function handleMarkAllComplete() {
    const res = await clientFetch(
      `/user-video-setting/users/me/videos/${videoID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: status?.code ? true : false,
          interactive: status?.interactive ? true : false,
          rambling: status?.rambling ? true : false,
          quiz: status?.quiz ? true : false,
          quiz_checked_with_all: markCompleteAll ? true : false,
          code_checked_with_all: markCompleteAll ? true : false,
          interactive_checked_with_all: markCompleteAll ? true : false,
          rambling_checked_with_all: markCompleteAll ? true : false,
          all_checked: !status?.all_checked,
        }),
      },
    );
    // Refresh once its updated
    router.refresh();
  }
  return (
    <div className="flex justify-between items-center-safe bg-gray-200 p-8 rounded-xl">
      <h1 className="text-3xl font-bold">{title}</h1>
      <button
        className={`rounded-2xl  p-3 text-white cursor-pointer ${markCompleteAll ? "bg-green-600 transition-all" : "bg-gray-500"}`}
        onClick={() => {
          setMarkCompleteAll((prev) => !prev);
          handleMarkAllComplete();
        }}
      >
        {markCompleteAll ? "Marked Completed" : "Mark All Content Complete"}
      </button>
    </div>
  );
}
