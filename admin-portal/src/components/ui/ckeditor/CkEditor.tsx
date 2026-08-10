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
  ImageUpload,
  Base64UploadAdapter,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  MediaEmbed,
  Alignment,
  Autoformat,
  PasteFromOffice,
  Highlight,
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
            ImageUpload,
            Base64UploadAdapter,
            ImageToolbar,
            ImageCaption,
            ImageStyle,
            MediaEmbed,
            Alignment,
            Autoformat,
            PasteFromOffice,
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
          ],
          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "toggleImageCaption",
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