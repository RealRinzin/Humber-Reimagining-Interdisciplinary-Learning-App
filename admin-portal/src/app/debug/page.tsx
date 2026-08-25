"use client";

import { clientPostFormData } from "@/hooks/client/useClient";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await clientPostFormData("/upload", formData);
    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {url && (
        <p>
          Uploaded: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}
