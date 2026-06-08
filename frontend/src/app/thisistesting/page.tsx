"use client";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import { useToggle } from "@/hooks/common/useToggle";
import React from "react";

export default function Page() {
  const { isOn: isOpen, toggle } = useToggle(false);

  return (
    <div className="h-screen bg-red-700">
      <button className="cursor-pointer" onClick={toggle}>
        Open
      </button>
      <div
        className={`
          fixed inset-0 flex justify-center items-center
          bg-black/30 backdrop-blur-md
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
        onClick={toggle}
      >
        <div
          className={`
            bg-gray-200 w-2/3 p-4 rounded-lg
            transition-all duration-300 ease-in-out
            ${isOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-2xl font-extrabold my-3">
            Intro To special Topic
          </h1>
          <MyPlayer
            src="SpacesProject_V16_Viewport_Matrix_exp1_HD.mp4"
            last_stop={0}
            videoID={1}
            userVideoID={1}
            subtitle="SpaceProject_V13_ProjectionMatrix.vtt"
          />
          <button
            className="text-white font-extrabold cursor-pointer absolute -top-2 -right-2 h-10 w-10 bg-red-600 rounded-full"
            onClick={toggle}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
