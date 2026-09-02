"use client";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface FormFileType<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  type:string,
}
export default function FormFileInputHtmlType<T extends FieldValues>({
  name,
  label,
  type,
  required,
}: FormFileType<T>) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  // Handler
  const handleHtmlUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  return (
    <label className="flex gap-2 bg-gray-200 items-center justify-center py-2  px-4  rounded-md cursor-pointer w-fit">
      <FontAwesomeIcon
        icon={faCloudUpload}
        size="1x"
        className=" text-gray-400/80"
      />
      <span className="text-sm text-gray-500">Upload File</span>
      <input
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className="hidden"
        accept=".html,.htm"
        onChange={handleHtmlUpload}
      />
    </label>
  );
}
