import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function PathCard() {
  return (
    <div className="border rounded-xl border-gray-200 p-4 shadow-sm">
      <h1 className="font-extrabold text-gray-900">Explore</h1>
      <div className="flex items-center-safe gap-2 my-2 text-gray-500 text-sm">
        <FontAwesomeIcon icon={faEye} size="1x" className="cursor-pointer " />
        <p>Visible to students</p>
      </div>
      <p className="text-gray-800 my-2">
        This mode encourages self-directed learning by allowing students to
        explore modules in any order. Choose a starting module while allowing
        students to navigate the rest of the map independently.
      </p>
      <div className="flex justify-end my-2">
        <button className="bg-gray-800 text-white text-xs rounded-md  px-2 py-1">
          Edit
        </button>
      </div>
    </div>
  );
}
