"use client";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

interface FormCheckboxType<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
}

export default function FormCheckbox<T extends FieldValues>({
  name,
  label,
  required,
}: FormCheckboxType<T>) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  return (
    <>
      <div className="flex items-center gap-2 py-1">
        <input
          id={name}
          type="checkbox"
          className="border border-gray-300 rounded p-2 text-sm"
          {...register(name, {
            required: required ? `${label} is required` : false,
          })}
        />
        <label
          htmlFor={name}
          className="text-gray-500 font-medium text-sm"
        >
          {label}
        </label>
      </div>
      {touchedFields[name] && errors[name] && (
        <p className="text-red-500 text-xs">
          {String(errors[name]?.message)}
        </p>
      )}
    </>
  );
}