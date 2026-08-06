// Only Image upload feature
"use client";

import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputFile from "./Input";

export default function ImageType() {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("test")
    console.log(e.target.files);
  };
  return (
    <div
      // onDragEnter={handleDragEnter}
      // onDragLeave={handleDragLeave}
      // onDragOver={handleDragOver}
      // onDrop={handleDrop}
      className="w-fit p-4 rounded-md border transition 
        bg-gray-200 border-gray-300 hover:shadow"
    >
      <label className="cursor-pointer flex flex-col items-center justify-center p-6">
        <FontAwesomeIcon
          icon={faCloudUpload}
          size="3x"
          className="text-4xl text-gray-400/80"
        />
        <span className="text-sm text-gray-500 mt-3">
          Upload Videos, Images or Files
        </span>
        <InputFile format="image/*" handlerFunction={handleImageUpload} />
        {/* <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        /> */}
      </label>
    </div>
  );
}
