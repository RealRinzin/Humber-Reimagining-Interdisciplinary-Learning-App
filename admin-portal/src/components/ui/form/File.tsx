"use client";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const handleFile = () => {
  console.log("Hello")
}

export default function File() {
  return (
    <div className="w-fit bg-gray-200 p-4 rounded-md border border-gray-300 hover:shadow transition">
      <label
        className="cursor-pointer flex flex-col items-center justify-center p-6"
      >
        {/* <UploadIcon className="text-4xl text-gray-400" /> */}
        <FontAwesomeIcon
          icon={faCloudUpload}
          size="3x"
          className="text-4xl text-gray-400/80"
        />
        <span className="text-sm text-gray-500 mt-3">
          Upload Videos, Images or Files
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
