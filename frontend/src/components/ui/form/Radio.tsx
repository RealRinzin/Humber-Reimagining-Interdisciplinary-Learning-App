import { FieldValues, Path, PathValue, UseFormRegister, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  value: string;
  label: string;
  register: UseFormRegister<T>;
  required?: boolean;
  error?: string;
};

const ToggleRadio = <T extends FieldValues>({
  name,
  value,
  label,
  register,
  required = false,
  error,
}: Props<T>) => {
  const id = `${name}-${value}`;

  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer mt-4" htmlFor={id}>
        <div className="relative">
          <input
            id={id}
            type="radio"
            value={value}
            {...register(name, { required })}
            className="sr-only peer"
          />
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-green-500 bg-white transition-colors duration-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-green-500 scale-0 peer-checked:scale-100 opacity-0 peer-checked:opacity-100 transition-all duration-300" />
        </div>
        <span className="text-sm font-medium text-gray-900 first-letter:uppercase">
          {label}
        </span>
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ToggleRadio;