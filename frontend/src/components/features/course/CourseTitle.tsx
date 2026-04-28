"use client";

import { useState } from "react";

const CourseTitle = ({ title }: { title: string }) => {
  const [markCompleteAll, setMarkCompleteAll] = useState(false);

  return (
    <div className="flex justify-between items-center-safe bg-gray-200 p-8 rounded-xl">
      <h1 className="text-3xl font-bold">{title}</h1>
      <button
        className={`rounded-2xl  p-3 text-white cursor-pointer ${markCompleteAll ? "bg-green-600 transition-all" : "bg-gray-500"}`}
        onClick={() => setMarkCompleteAll((prev) => !prev)}
      >
        {markCompleteAll ? "Marked Completed" : "Mark All Content Complete"}
      </button>
    </div>
  );
};
export default CourseTitle;
