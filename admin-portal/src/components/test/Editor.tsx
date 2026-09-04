// components/Editor.tsx
'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
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
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

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
        licenseKey: 'GPL',
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
        toolbar: [
          'undo', 'redo', '|',
          'bold', 'italic', '|',
          'uploadImage',
        ],
        image: {
          toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'resizeImage',
          ],
        },
        simpleUpload: {
          uploadUrl: `${process.env.NEXT_PUBLIC_API_END_POINT}/uploads/images`, // your endpoint
          withCredentials: true,
        },
      }}
      onChange={(_, editor) => onChange(editor.getData())}
    />
  );
}