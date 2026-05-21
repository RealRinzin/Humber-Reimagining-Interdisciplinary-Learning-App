import { clientPatch } from "@/lib/clientFetch";
import { useEffect, useState } from "react";

interface RadioButtonProps {
  name: string;
  value: string;
  options: { label: string; value: string }[];
  id?: number;
}

export default function RadioButton({ name, value, options, id }: RadioButtonProps) {
  const [selected, setSelected] = useState(value);

  const updateSetting = (newValue: string) => {
    clientPatch(`/user-content-settings/users/me/${id}`, { [name]: newValue });
    setSelected(newValue);
  };

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <fieldset className="mt-4">
      <legend className="text-sm font-medium text-gray-900 first-letter:uppercase mb-2">
        {name}
      </legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isChecked = selected === option.value;
          const inputId = `${name}-${option.value}`;

          return (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer"
              htmlFor={inputId}
            >
              <div className="relative">
                <input
                  id={inputId}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => updateSetting(option.value)}
                  className="sr-only peer"
                />
                {/* Outer ring */}
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-green-500 bg-white transition-colors duration-300" />
                {/* Inner dot */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-green-500 transition-all duration-300 ${
                    isChecked ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 first-letter:uppercase">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}