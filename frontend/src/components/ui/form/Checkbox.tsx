import { clientFetch, clientPatch } from "@/lib/clientFetch";
import { useEffect, useState } from "react";

interface checkBox {
  name: string;
  value: boolean;
  id?:number
}
export default function Checkbox({ name, value,id }: checkBox) {
  const [status, setStatus] = useState(value);
  /**
   * Handle the onChange update
   */
  const updateSetting = () => {
    const res = clientPatch(`/user-content-settings/users/me/${id}`, {[name]:!status})
    setStatus(!status)
  };

  useEffect(() => {
    setStatus(value);
  }, [value]);
  return (
    <label
      className="flex items-center gap-3 cursor-pointer mt-4"
      htmlFor={name}
    >
      <div className="relative">
        <input
          id={name} // connect id to htmlFor
          type="checkbox"
          checked={status}
          onChange={updateSetting}
          className="sr-only peer"
        />
        <div className="w-14 h-7 bg-red-500 peer-checked:bg-green-500 rounded-full transition-colors duration-300" />
        <div className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow peer-checked:translate-x-7 transition-transform duration-300" />
      </div>
      <span className="text-sm font-medium text-gray-900 first-letter:uppercase">
        {name}
      </span>
    </label>
  );
}
