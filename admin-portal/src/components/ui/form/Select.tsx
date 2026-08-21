"use client";
import { useToggle } from "@/hooks/common/useToggle";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

interface FormSelectType<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function SelectType<T extends FieldValues>({
  name,
  label,
  placeholder = "Select an option",

  required,
}: FormSelectType<T>) {
  const { isOn: isOpen, toggle } = useToggle(true);

  const studentOptions = [
    { id: 0, name: "Not Visible to Student", status: false },
    { id: 1, name: "Visible to Student", status: true },
  ];
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  return (
    <>
      {required && <span className="text-red-500">*</span>}
      {isOpen ? (
        <FontAwesomeIcon icon={faEye} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} />
      )}

      <select
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className="outline-none"
        onChange={toggle}
      >
        <option value="" disabled className="text-red-400">
          {placeholder}
        </option>
        {studentOptions?.map((student: any, index: number) => (
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
