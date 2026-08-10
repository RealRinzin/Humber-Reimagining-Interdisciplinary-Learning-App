import dynamic from "next/dynamic";
import {
  Controller,
  useFormContext,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

const CkEditor = dynamic(() => import("@/components/ui/ckeditor/CkEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface MyCKEditorDataType<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
}

export default function MyCKEditor<T extends FieldValues>({
  name,
  label,
  required,
}: MyCKEditorDataType<T>) {
  const { control } = useFormContext();
  return (
    <div className="border-b-2 border-gray-200 my-6 py-2">
      <p className="flex text-gray-700 gap-2 font-extrabold">
        <FontAwesomeIcon
          icon={faFileLines}
          className="cursor-pointer text-2xl text-gray-500"
        />
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      <Controller
        name={name}
        control={control}
        rules={
          required
            ? { required: `${label ?? "This field"} is required` }
            : undefined
        }
        render={({ field, fieldState: { error } }) => (
          <>
            <CkEditor
              data={field.value ?? ""}
              onChange={(event: any, editor: any) => {
                field.onChange(editor.getData());
              }}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
