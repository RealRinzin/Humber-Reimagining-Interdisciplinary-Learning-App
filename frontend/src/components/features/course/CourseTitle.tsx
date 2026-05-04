"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/clientFetch";

// const CourseTitle = ({ title }: { title: string }) => {
export default function CourseTitle({
  title,
  videoID,
  userID,
  status,
}: {
  title: string;
  videoID: number;
  userID: number;
  status:any
}) {
  const router = useRouter();

const [markCompleteAll, setMarkCompleteAll] = useState(status?.all_checked ? true : false);
console.log(status?.all_checked)
  // Update all check
  async function handleMarkAllComplete() {

    const res = await clientFetch(
      `/user-video-setting/users/me/videos/${videoID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code:status?.code,
          interactive: status?.interactive,
          rambling: status?.rambling,
          quiz: status?.quiz,
          quiz_checked_with_all: markCompleteAll?true:false,
          code_checked_with_all: markCompleteAll?true:false,
          interactive_checked_with_all: markCompleteAll?true:false,
          rambling_checked_with_all: markCompleteAll?true:false,
          all_checked:!status?.all_checked
        }),
      },
    );

    const { data: setting } = await res.json();
    // console.log(setting)
    // 3. data now has the latest checked status for each tab
    // emit it up or store it
    router.refresh();
    // onStatusUpdate(setting);
  }

  return (
    <div className="flex justify-between items-center-safe bg-gray-200 p-8 rounded-xl">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h1 className="text-3xl font-bold">{videoID}</h1>
      <h1 className="text-3xl font-bold">{userID}</h1>
      <button
        className={`rounded-2xl  p-3 text-white cursor-pointer ${markCompleteAll ? "bg-green-600 transition-all" : "bg-gray-500"}`}
        onClick={() => {
          setMarkCompleteAll((prev) => !prev);
          handleMarkAllComplete();
        }}
      >
        {markCompleteAll ? "Marked Completed" : "Mark All Content Complete"}
      </button>
      {/* <button onClick={handleMarkAllComplete}>Mark All Content Complete</button> */}
    </div>
  );
}
