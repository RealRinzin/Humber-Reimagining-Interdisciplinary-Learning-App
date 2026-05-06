import { OnboardLearningPathType,OnboardShowProgressType } from "@/types/onboard/onboard-types";
import {  UseFormRegister, FieldError, FieldValues, Path } from "react-hook-form";
interface ToggleInterface <T extends FieldValues> {
  name: Path<T>;
  register:UseFormRegister<T>;
  label: string; // use label prop, not hardcoded
  required?: boolean;
  error: any; 
  type:string;
}
export default function ToggleCheckBox<T extends FieldValues>({
  name,
  label,
  register,
  required = false,
  error,
}: ToggleInterface<T>) {
console.log(name)

  return (
    <>
      <label className="flex items-center gap-3 cursor-pointer mt-4" htmlFor={name}>
        <div className="relative">
          <input
            id={name} // connect id to htmlFor
            type="checkbox"
            className="sr-only peer"
            {...register(name, {
              required: required ? `${label} is required` : false,
            })}
          />
          <div className="w-14 h-7 bg-red-500 peer-checked:bg-green-500 rounded-full transition-colors duration-300" />
          <div className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow peer-checked:translate-x-7 transition-transform duration-300" />
        </div>
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </label>
      {error && <p className="text-xs text-red-700">{error}</p>}
    </>
  );
}
