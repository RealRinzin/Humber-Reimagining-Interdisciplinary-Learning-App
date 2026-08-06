'use client'

import { useState } from "react";

export default function TextInput() {
  const [data,setData] = useState(null)
  return (
    <input
      type="text"
      placeholder="Title"
      value="title"
      className="border border-gray-200 rounded-md"
      onChange={(e)=>setData(e.target.value)}
    />
  );
}
