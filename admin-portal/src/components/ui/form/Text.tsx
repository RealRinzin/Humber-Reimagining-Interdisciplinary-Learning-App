import { inputType } from "@/types/form.type";
import { useState } from "react";

// Type, text
export default function TextInput({ type, value, label }: inputType) {
  const [data,setData] = useState(value);
  console.log(data);
  return (
    <>
      <label htmlFor="" className="flex flex-col text-gray-500 font-medium text-sm py-1">
        {label}
      </label>
      <input
        type={`${type}`}
        className="border border-gray-300 rounded p-2 text-sm"
        value={data}
        onChange={(e) => {
          setData(e.target.value)
          console.log(e.target.value)
        }}
        placeholder={label}
      />
    </>
  );
}
