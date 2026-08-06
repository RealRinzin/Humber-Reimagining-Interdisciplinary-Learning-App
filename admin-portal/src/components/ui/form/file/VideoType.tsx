// Only Video formats | mp4, mv etc
"use client";
import { useEffect, useRef, useState } from "react";
import InputFile from "./Input";

interface PreviewFile {
  file: File;
  url: string;
}

// Video Format types
const videoFormats = ["video/mp4", "video/x-matroska", "video/quicktime"];
export default function VideoFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  // File Handler
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
    }
  };

  // Remove the file
  const removeFile = (id: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== id));
    console.log(selectedFiles);
  };

  // Drag Handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
    }
  };

  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }
    // Preview
    const newPreviews = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [selectedFiles]);

  return (
    <>
      {selectedFiles.map((file, index) => (
        <p key={index}>
          Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
        </p>
      ))}

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-fit p-4 rounded-md border transition ${
          isDragging
            ? "bg-blue-100 border-blue-400 shadow"
            : "bg-gray-200 border-gray-300 hover:shadow"
        }`}
      >
          <InputFile format={videoFormats.join(",")} label="Video | mp4, mvk, mov" handlerFunction={handleFile} />
      </div>
      {previews.map((p, index) => (
        <div key={index} className="relative w-fit">
          <p
            className="absolute -right-2 -top-1 bg-red-800 h-3 w-3 p-3 rounded flex justify-center items-center text-gray-100 text-sm"
            onClick={(e) => removeFile(index)}
          >
            X
          </p>
          <video
            src={p.url}
            controls
            style={{ width: "100%", maxWidth: "480px", marginTop: "12px" }}
          />
        </div>
      ))}
    </>
  );
}
