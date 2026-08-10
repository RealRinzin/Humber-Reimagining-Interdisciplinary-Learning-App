"use client";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";
import { error } from "console";

interface inputType<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number" | "checkbox" | "radio";
}

export default function TestInput<T extends FieldValues>({
  name,
  label,
  required,
  type,
}: inputType<T>) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  return (
    <>
      <input
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        placeholder={label}
        className={` ${touchedFields[name] && errors[name] ? " border-red-500 " : " border-gray-200 "}  border rounded-md`}
      />
          <FormErrorMessage name={name} errors={errors} touched={!!touchedFields['name']}/>
{/*       
      {touchedFields[name] && errors[name] && (
        <p className="text-red-500 text-xs">{String(errors[name]?.message)}</p>
      )} */}
    </>
  );
}
