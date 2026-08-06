import { checkBoxType } from "@/types/form.type";
import { useState } from "react";

export default function CheckBox({ checked, label }: checkBoxType) {
  const [data, setData] = useState(checked);
  return (
    <>
      <label
        htmlFor=""
        className="flex flex-col text-gray-500 font-medium text-sm py-1"
      >
        {label}
      </label>
      <input
        type="checkbox"
        className="border border-gray-300 rounded p-2 text-sm"
        checked={data}
        onChange={(e) => {
          setData(e.target.checked);
        }}
        placeholder={label}
      />
    </>
  );
}
