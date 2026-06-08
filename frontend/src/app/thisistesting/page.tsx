"use client";
import { useToggle } from "@/hooks/common/useToggle";
import React from "react";

export default function page() {
  const { isOn: isOpen, toggle } = useToggle(false);

  return (
    <div className="h-screen bg-red-700 z-0">
      <button className="cursor-pointer" onClick={toggle}>Open</button>
      {isOpen && (
        <div className="flex fixed inset-0 bg-black/30 backdrop-blur-md justify-center items-cente">
          <div className="bg-white w-1/3">
          asdf
          <button className="cursor-pointer" onClick={toggle}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
