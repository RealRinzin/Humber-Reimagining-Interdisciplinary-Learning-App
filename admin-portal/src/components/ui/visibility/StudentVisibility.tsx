"use client";
import { usePatch } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import {
  faChevronDown,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
export default function StudentVisibility({
  status,
  model,
  id,
}: {
  status: boolean;
  model: string;
  id: number;
}) {
  const { isOn: isVisible, toggle } = useToggle(status);
  const { patchData, loading, error } = usePatch(`/${model}/${id}/visibility`);
  const updateVideo = async () => {
    const res = await patchData({});
    if (res) toggle();
  };
  return (
    <div className="text-gray-500 text-xs">
      <ul
        onClick={updateVideo}
        className={loading ? "opacity-50 pointer-events-none" : ""}
      >
        {isVisible ? (
          <li className="flex gap-4 items-center cursor-pointer">
            <FontAwesomeIcon icon={faEye} size="1x" />
            <span>Student Visible</span>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </li>
        ) : (
          <li className="flex gap-4 items-center cursor-pointer">
            <FontAwesomeIcon icon={faEyeSlash} size="1x" />
            <span>Hidden from Student</span>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </li>
        )}
      </ul>
      {error && (
        <p className="text-red-500 text-xs">Failed to update visibility</p>
      )}
    </div>
  );
}
