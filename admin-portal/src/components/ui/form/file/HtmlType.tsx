'use client'
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function HtmlType() {
    const handleHtmlUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("test")
    console.log(e.target.files);
  };
  return (
      <label className="flex gap-2 bg-gray-200 items-center justify-center py-2  px-4  rounded-md cursor-pointer w-fit">
        <FontAwesomeIcon
          icon={faCloudUpload}
          size="1x"
          className=" text-gray-400/80"
        />
        <span className="text-sm text-gray-500">Upload File</span>
        <input
          type="file"
          className="hidden"
          accept=".html,.htm"
          onChange={handleHtmlUpload}
        />
      </label>
  );
}
