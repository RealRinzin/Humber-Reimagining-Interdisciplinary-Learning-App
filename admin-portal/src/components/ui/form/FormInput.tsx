"use client";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";
interface FormInputType<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number" | "color";
}

export default function FormInput<T extends FieldValues>({
  name,
  label,
  required,
  type,
}: FormInputType<T>) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  return (
    <>
      {["number", "color"].includes(type ?? "") && (
        <span className="text-xs">{label}</span>
      )}
      <input
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        placeholder={label}
        className={` ${touchedFields[name] && errors[name] ? " border-red-500 " : " border-gray-200 "} border  w-full ${name === "title" ? "text-white" : "text-gray-600"} rounded-md px-4 py-1`}
      />
      {touchedFields[name] && errors[name] && (
        <p className="text-red-500 text-xs">{String(errors[name]?.message)}</p>
      )}
      {/* <FormErrorMessage
        name={name}
        errors={errors}
        touched={!!touchedFields["name"]}
        required={true}
      /> */}
    </>
  );
}
