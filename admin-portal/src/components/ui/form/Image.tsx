"use client";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const handleFile = () => {
  console.log("Hello")
}

export default function ImageInputType() {
  return (
    <div className="w-fit bg-gray-600 rounded-md border border-gray-300 hover:shadow transition">
      <label
        className="cursor-pointer flex gap-4 items-center px-2 py-1"
      >
        {/* <UploadIcon className="text-4xl text-gray-400" /> */}
        <FontAwesomeIcon
          icon={faCloudUpload}
          size="1x"
          className=" text-gray-100/80"
        />
        <span className="text-sm text-gray-100">
          Upload Images
        </span>
        <input 
        type="file" 
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFile}
         />
      </label>
    </div>
  );
}
