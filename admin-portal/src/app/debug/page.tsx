// app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Editor = dynamic(() => import('@/components/test/Editor'), { ssr: false });

export default function Page() {
  const [content, setContent] = useState('<p>Hello world</p>');
  return <Editor value={content} onChange={setContent} />;
}