"use client";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import { useToggle } from "@/hooks/common/useToggle";
import { VideoPartsType } from "@/types/video";
import React from "react";

export default function VideoPlayerModal({src,title,description,subtitle}:VideoPartsType) {
  const { isOn: isOpen, toggle } = useToggle(false);
  return (
    <>
      <button className="cursor-pointer" onClick={toggle}>
        {title}
      </button>
      {isOpen && (
        <div className="">
          <div
            className={`z-40
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
              <h1 className="text-2xl font-extrabold my-3 text-gray-700">
                {title}
              </h1>
              <p className="mb-4 font-medium text-gray-700 px-2">{description}</p>
              <MyPlayer
                src={src}
                last_stop={0}
                videoID={1}
                userVideoID={1}
                subtitle={subtitle}
              />
              <button
                className="text-white font-extrabold cursor-pointer absolute -top-2 -right-2 h-10 w-10 bg-gray-600 rounded-full"
                onClick={toggle}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
