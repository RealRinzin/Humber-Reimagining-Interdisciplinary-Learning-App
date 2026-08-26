"use client";
import { useEffect, useRef, useState } from "react";
import InputFile from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { clientPostFormDataProgress } from "@/hooks/client/useClient";
import { VideoType } from "@/types/video.type";

interface PreviewFile {
  file: File;
  url: string;
  thumbnail?: string; // data URL of the generated thumbnail
}

const videoFormats = ["video/mp4", "video/x-matroska", "video/quicktime"];

export default function VideoFileUpload({ videoID,saveVideoFun }: { videoID: number | null,saveVideoFun:(data: VideoType)=>Promise<void> }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadButton, setUploadButton] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // Per-file progress, keyed by index in `previews`
  const [progressByFile, setProgressByFile] = useState<Record<number, number>>({});

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      setUploadButton(true);
      setUploadError(null);
    }
  };

  const removeFile = (id: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== id));
    if (selectedFiles.length <= 1) {
      setUploadButton(false);
    }
  };

  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }

    let cancelled = false;
    console.log("test");
    const newPreviews: PreviewFile[] = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews(newPreviews);
    setProgressByFile({});
  }, [selectedFiles,saveVideoFun]);

  // Uploads each video + its thumbnail via the shared client hook, tracking progress per file
  const handleUpload = async () => {
    if(!videoID) return setUploadError("Add the Video details before uploading the video");
    setIsUploading(true);
    setUploadError(null);
    try {
      for (let index = 0; index < previews.length; index++) {
        const preview = previews[index];
        const formData = new FormData();
        formData.append("video", preview.file);
        formData.append(
          "thumbnail",
          `${preview.file.name.replace(/\.[^/.]+$/, "")}-thumb.jpg`
        );
        if (videoID !== null) {
          formData.append("videoID", String(videoID));
        }

        await clientPostFormDataProgress(
          "/upload",
          formData,
          (percent: number) =>
            setProgressByFile((prev) => ({ ...prev, [index]: percent })),
        );
      }

      setSelectedFiles([]);
      setUploadButton(false);
      setProgressByFile({});
    } catch (err) {
      console.error(err);
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div
        className={`w-fit p-4 rounded-md border transition mx-4 ${
          isDragging
            ? "bg-blue-100 border-blue-400 shadow"
            : "bg-gray-200 border-gray-300 hover:shadow"
        }`}
      >
        <InputFile
          format={videoFormats.join(",")}
          label="Video | mp4, mvk, mov"
          handlerFunction={handleFile}
        />
      </div>
      {videoID}
      <div className="flex flex-col gap-4">
        {uploadButton && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="text-white w-fit bg-blue-400 disabled:bg-blue-300 text-md py-3 px-4 rounded-md cursor-pointer flex items-center gap-2"
          >
            <FontAwesomeIcon icon={isUploading ? faSpinner : faArrowUp} spin={isUploading} />
            {isUploading ? "Uploading..." : "Upload Video"}
          </button>
        )}

        {uploadError && <p className="text-red-600 text-sm">{uploadError}</p>}

        {selectedFiles.map((file, index: number) => (
          <p key={index}>
            {index + 1} {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}{" "}
            MB)
          </p>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previews.map((p, index) => (
            <div key={index} className="relative">
              <p
                className="absolute -right-2 -top-1 cursor-pointer bg-red-800 h-3 w-3 p-3 rounded flex justify-center items-center text-gray-100 text-sm"
                onClick={(e) => removeFile(index)}
              >
                X
              </p>

              {/* {p.thumbnail ? (
                <img
                  src={p.thumbnail}
                  alt={`${p.file.name} thumbnail`}
                  style={{ width: "100%", maxWidth: "320px", marginTop: "12px" }}
                  className="rounded-md"
                />
              ) : (
                <div
                  style={{ width: "100%", maxWidth: "320px", height: "180px", marginTop: "12px" }}
                  className="bg-gray-300 rounded-md flex items-center justify-center text-gray-500 text-sm"
                >
                  Generating thumbnail...
                </div>
              )} */}

              <video
                src={p.url}
                controls
                style={{ width: "100%", maxWidth: "320px", marginTop: "8px" }}
              />

              {progressByFile[index] !== undefined && progressByFile[index] < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2 max-w-[320px]">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${progressByFile[index]}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}