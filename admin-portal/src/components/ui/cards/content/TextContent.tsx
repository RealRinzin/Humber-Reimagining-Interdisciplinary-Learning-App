

"use client";
import dynamic from "next/dynamic";

const CkEditor = dynamic(
  () => import("@/components/ui/ckeditor/CkEditor"),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

export default function TextContent() {
  return (
    <div className="border-b-2 border-gray-200 my-6 py-2">
      <p className="flex text-gray-700 gap-2 font-extrabold">
        <FontAwesomeIcon
          icon={faFileLines}
          className="cursor-pointer text-2xl text-gray-500"
        />{" "}
        Topic Description
      </p>
      <CkEditor />
    </div>
  );
}
