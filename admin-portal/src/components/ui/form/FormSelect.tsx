"use client";
import { useFetch } from "@/hooks/client/useHTTP";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

interface FormSelectType<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  endpoint: string;
}

export default function FormSelect<T extends FieldValues>({
  name,
  label,
  required,
  placeholder = "Select an option",
  endpoint,
}: FormSelectType<T>) {
  const {
    data: data,
    loading,
    error,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/${endpoint}`, "GET");

  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  if (loading)
    return <p className="bg-gray-100 px-2 text-xs py-1 rounded">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {required && <span className="text-red-500">*</span>}
      <select
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        defaultValue=""
        className={` ${
          touchedFields[name] && errors[name]
            ? " border-red-500 "
            : " border-gray-200 "
        } border  bg-gray-200 text-gray-500 px-4 py-1  rounded-md w-50 text-xs`}
      >
        <option value="" disabled className="text-black">
          {placeholder}
        </option>
        {(data as any)?.map((data: any, index: number) => (
          <option value={data.id} key={`${index}${label}`}>
            {data.title} {data.name}
          </option>
        ))}
      </select>
      {touchedFields[name] && errors[name] && (
        <p className="text-red-500 text-xs">{String(errors[name]?.message)}</p>
      )}
    </>
  );
}
