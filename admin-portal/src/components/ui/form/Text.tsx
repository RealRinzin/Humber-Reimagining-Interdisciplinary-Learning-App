'use client'

import { useState } from "react";

export default function TextInput({
  text,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus,
}: {
  text: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}) {
  const [data, setData] = useState(text);
  return (
    <input
      type="text"
      placeholder="Title"
      value={data}
      autoFocus={autoFocus}
      className="border border-gray-200 rounded-md"
      onChange={(e) => {
        setData(e.target.value);
        onChange?.(e.target.value);
      }}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
}