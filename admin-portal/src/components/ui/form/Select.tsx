"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

interface FormSelectType<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  status?: boolean;
  placeholder?: string;
  required?: boolean;
}

export default function SelectType<T extends FieldValues>({
  name,
  label,
  placeholder = "Select an option",
  status,
  required,
}: FormSelectType<T>) {
  const studentOptions = [
    { id: 0, name: "Not Visible to Student", status: false },
    { id: 1, name: "Visible to Student", status: true },
  ];

  const {
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();

  const currentValue = watch(name);
  const isVisible =
    currentValue !== undefined ? String(currentValue) === "1" : !!status;

  return (
    <>
      {required && <span className="text-red-500">*</span>}
      <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
      <select
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        defaultValue={status !== undefined ? (status ? "1" : "0") : ""}
        className="outline-none"
      >
        <option value="" disabled className="text-red-400">
          {placeholder}
        </option>
        {studentOptions.map((student, index) => (
          <option value={String(student.id)} key={`${index}${label}`}>
            {student.name}
          </option>
        ))}
      </select>
      {touchedFields[name] && errors[name] && (
        <p className="text-red-500 text-xs">{String(errors[name]?.message)}</p>
      )}
    </>
  );
}
