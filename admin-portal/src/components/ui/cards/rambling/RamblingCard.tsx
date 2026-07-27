"use client";
import dynamic from "next/dynamic";

const CkEditor = dynamic(() => import("@/components/ui/ckeditor/CkEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageInputType from "../../form/Image";

export default function RamblingCard() {
  return (
    <div className="border-b-2 border-gray-200 my-6 py-2">
      <p className="flex text-gray-700 gap-2 font-extrabold">
        <FontAwesomeIcon
          icon={faGear}
          className="cursor-pointer text-2xl text-gray-500"
        />{" "}
        Rambling
      </p>
      <div className="my-2 px-2 flex justify-end">
        <ImageInputType />
      </div>
      <div className="p-4">
        <CkEditor />
      </div>
    </div>
  );
}
