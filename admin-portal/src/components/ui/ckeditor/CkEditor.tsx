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
} from "ckeditor5";

// Import the necessary CSS styles for the editor
import "ckeditor5/ckeditor5.css";
export default function CkEditor() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>CKEditor 5 React Open Source Setup</h2>
      <CKEditor
        editor={ClassicEditor}
        config={{
          // CRITICAL: The free open-source tier requires 'GPL' as the key
          licenseKey: "GPL",
          plugins: [Essentials, Paragraph, Heading, List, Bold, Italic],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "bulletedList",
            "numberedList",
          ],
          initialData:
            "<p>Hello from the latest free version of CKEditor 5!</p>",
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log("Editor Data:", data);
        }}
      />
    </div>
  );
}
