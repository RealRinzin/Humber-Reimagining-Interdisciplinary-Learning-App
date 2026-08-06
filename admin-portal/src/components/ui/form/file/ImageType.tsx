// Only Image upload feature
"use client";
import InputFile from "./Input";
const imageFormats = [".jpg", ".png", ".jpeg",".webp"];
export default function ImageType() {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("test")
    console.log(e.target.files);
  };
  return (
    <div
      className="w-fit p-4 rounded-md border transition 
        bg-gray-200 border-gray-300 hover:shadow"
    >
        <InputFile format={imageFormats.join(",")} label="Images | png, jpeg, jpg, webp" handlerFunction={handleImageUpload} />
    </div>
  );
}
