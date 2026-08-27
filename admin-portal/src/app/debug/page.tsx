"use client";
import ChildTest from "@/components/test";
import { useState } from "react";

export default function ParentTest() {
  const [live, setLive] = useState<boolean>(false);
  const [videoID, setVideoID] = useState<number | null>(null);

  const update = async () => {
    setLive((prev) => !prev);
    if(live) return setVideoID(1)
  };
  return (
    <>
      <button className="bg-red-50 py-2" onClick={update}>
        Click
      </button>
      {live ? "live" : "Not live"}
      <ChildTest updateFun={update} live={live} videoID={videoID} />
    </>
  );
}
