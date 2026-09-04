// components/Editor.tsx
"use client";

import { clientPostFormData } from "@/hooks/client/useClient";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageUpload,
  SimpleUploadAdapter,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
class UploadAdapter {
  loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  async upload() {
    const file = await this.loader.file;
    const formData = new FormData();
    formData.append("upload", file);

    const res = await clientPostFormData("/uploads/images", formData);
    if (!res.ok) throw new Error("Upload failed");

    const { url } = await res.json();
    return { default: url };
  }
  abort() {}
}
function uploadPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) =>
    new UploadAdapter(loader);
}

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (data: string) => void;
}) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        licenseKey: "GPL",
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Image,
          ImageToolbar,
          ImageCaption,
          ImageStyle,
          ImageResize,
          ImageUpload,
          SimpleUploadAdapter,
        ],
        extraPlugins: [uploadPlugin],
        toolbar: ["undo", "redo", "|", "bold", "italic", "|", "uploadImage"],
        image: {
          toolbar: [
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
            "|",
            "toggleImageCaption",
            "resizeImage",
          ],
        },
        // simpleUpload: {
        //   uploadUrl: `${process.env.NEXT_PUBLIC_API_END_POINT}/uploads/images`, // your endpoint
        //   withCredentials: true,
        // },
      }}
      onChange={(_, editor) => onChange(editor.getData())}
    />
  );
}
