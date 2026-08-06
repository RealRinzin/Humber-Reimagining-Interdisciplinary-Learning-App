interface fileType {
  format: string;
  handlerFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputFile({ format, handlerFunction }: fileType) {
  return (
    <>
      <input
        type="file"
        className="hidden"
        accept={format}
        multiple
        onChange={handlerFunction}
      />
    </>
  );
}
