"use client";
import { clientPostFormData } from "@/hooks/client/useClient";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Bold,
  Italic,
  Paragraph,
  Heading,
  List,
  Underline,
  Strikethrough,
  Font,
  TodoList,
  Indent,
  IndentBlock,
  Link,
  AutoLink,
  BlockQuote,
  HorizontalLine,
  CodeBlock,
  Table,
  TableToolbar,
  // Base64UploadAdapter,
  MediaEmbed,
  Alignment,
  Autoformat,
  PasteFromOffice,
  Highlight,
  // Newly Added for the image upload
  Image,
  ImageUpload,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
} from "ckeditor5";

// Import the necessary CSS styles for the editor
import "ckeditor5/ckeditor5.css";

interface CkEditorProps {
  data?: string;
  onChange?: (event: any, editor: any) => void;
}

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
export default function CkEditor({ data, onChange }: CkEditorProps) {
  return (
    <div className="p-4">
      <CKEditor
        editor={ClassicEditor}
        data={data}
        config={{
          // CRITICAL: The free open-source tier requires 'GPL' as the key
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Heading,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Font,
            Highlight,
            List,
            TodoList,
            Indent,
            IndentBlock,
            Link,
            AutoLink,
            BlockQuote,
            HorizontalLine,
            CodeBlock,
            Table,
            TableToolbar,
            // Base64UploadAdapter,
            MediaEmbed,
            Alignment,
            Autoformat,
            PasteFromOffice,
            // Added for image upload
            Image,
            ImageUpload,
            ImageToolbar,
            ImageCaption,
            ImageStyle,
            ImageResize,
          ],
          extraPlugins: [uploadPlugin],

          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "highlight",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
            "|",
            "link",
            "insertImage",
            "insertTable",
            "blockQuote",
            "codeBlock",
            "mediaEmbed",
            "uploadImage",
          ],
          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "toggleImageCaption",
              "imageTextAlternative",
            ],
          },

          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          },
        }}
        onChange={onChange}
      />
    </div>
  );
}
