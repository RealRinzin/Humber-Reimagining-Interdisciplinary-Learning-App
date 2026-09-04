"use client";
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
  Base64UploadAdapter,
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
  SimpleUploadAdapter,
} from "ckeditor5";

// Import the necessary CSS styles for the editor
import "ckeditor5/ckeditor5.css";

interface CkEditorProps {
  data?: string;
  onChange?: (event: any, editor: any) => void;
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
            Base64UploadAdapter,
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
            SimpleUploadAdapter,
          ],
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
          simpleUpload: {
            uploadUrl: `${process.env.NEXT_PUBLIC_API_END_POINT}/uploads/images`, // your endpoint
            withCredentials: true,
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
