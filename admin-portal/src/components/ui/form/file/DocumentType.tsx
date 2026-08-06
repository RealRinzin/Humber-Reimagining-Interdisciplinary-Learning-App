"use client";

import InputFile from "./Input";

// Document File upload features | doc, srt etc
const imageFormats = [".html,.srt,.vtt,text/html,text/vtt,application/x-subrip"];
export default function DocumentType() {
    const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("test")
    console.log(e.target.files);
  };
  return (
    <div
      className="w-fit p-4 rounded-md border transition 
        bg-gray-200 border-gray-300 hover:shadow"
    >
      <InputFile
        format={imageFormats.join(",")}
        label="Subtitles | srt, vtt"
        handlerFunction={handleDocumentUpload}
      />
    </div>
  );
}
