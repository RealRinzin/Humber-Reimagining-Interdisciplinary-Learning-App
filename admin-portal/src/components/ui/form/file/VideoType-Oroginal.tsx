"use client";
import { useEffect, useRef, useState } from "react";
import InputFile from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { clientPostFormDataProgress } from "@/hooks/client/useClient";

interface PreviewFile {
  file: File;
  url: string;
  thumbnail?: string; // data URL of the generated thumbnail
}

const videoFormats = ["video/mp4", "video/x-matroska", "video/quicktime"];

// Grabs a single frame from a video File and returns it as a data URL
function generateVideoThumbnail(file: File, seekTo = 1): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    const url = URL.createObjectURL(file);
    video.src = url;

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(seekTo, video.duration || seekTo);
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas context unavailable"));
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      URL.revokeObjectURL(url);
      resolve(dataUrl);
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load video for thumbnail"));
    };
  });
}

// Converts a data URL (from canvas.toDataURL) into a Blob for uploading
function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

export default function VideoUploadTest({ videoID,status }: { videoID: number | null ,status:boolean|null}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
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
      setUploadButton(true);
    }
  };

  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }

    let cancelled = false;

    const newPreviews: PreviewFile[] = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews(newPreviews);
    setProgressByFile({});

    newPreviews.forEach((p, index) => {
      generateVideoThumbnail(p.file)
        .then((thumbnail) => {
          if (cancelled) return;
          setPreviews((prev) => {
            const next = [...prev];
            if (next[index]) next[index] = { ...next[index], thumbnail };
            return next;
          });
        })
        .catch((err) => console.error("Thumbnail generation failed:", err));
    });

    return () => {
      cancelled = true;
      newPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [selectedFiles]);

  // Uploads each video + its thumbnail via the shared client hook, tracking progress per file
  const handleUpload = async () => {
    setIsUploading(true);
    setUploadError(null);

    try {
      for (let index = 0; index < previews.length; index++) {
        const preview = previews[index];

        let thumbnail = preview.thumbnail;
        if (!thumbnail) {
          thumbnail = await generateVideoThumbnail(preview.file);
        }

        const formData = new FormData();
        formData.append("video", preview.file);
        formData.append(
          "thumbnail",
          dataUrlToBlob(thumbnail),
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
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-fit p-4 rounded-md border transition mx-4 ${
          isDragging
            ? "bg-blue-100 border-blue-400 shadow"
            : "bg-gray-200 border-gray-300 hover:shadow"
        }`}
      >
        {status?'upload':'No upload'}
        <InputFile
          format={videoFormats.join(",")}
          label="Video | mp4, mvk, mov"
          handlerFunction={handleFile}
        />
      </div>
      <div className="flex flex-col gap-4">
        {uploadButton && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="text-white w-fit bg-blue-500 disabled:bg-blue-300 text-md py-3 px-4 rounded-md cursor-pointer flex items-center gap-2"
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