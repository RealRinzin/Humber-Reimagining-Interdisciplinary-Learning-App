import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface fileType {
  format: string;
  label:string;
  handlerFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
}
export default function InputFile({ format,label, handlerFunction }: fileType) {
  return (
    <>
      <label className="cursor-pointer flex flex-col items-center justify-center p-6">
        <FontAwesomeIcon
          icon={faCloudUpload}
          size="3x"
          className="text-4xl text-gray-400/80"
        />
        <span className="text-sm text-gray-500 mt-3">
          Upload {label}
        </span>
        <input
          type="file"
          className="hidden"
          accept={format}
          multiple
          onChange={handlerFunction}
        />
      </label>
    </>
  );
}
