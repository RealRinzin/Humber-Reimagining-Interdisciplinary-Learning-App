'use client'
import { usePost } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { useRouter } from "next/navigation";
export default function AddSubtitleCard({ videoID }: { videoID: number }) {
  const { isOn: isOpen, toggle } = useToggle(false);
//   const { postData, loading, error } = usePost("/codes");
  const router = useRouter();

  return (
    <>
      <button onClick={toggle}>Add Subtitle</button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4">
          <div className="bg-white mx-auto my-auto w-full  md:w-1/2 relative p-10 rounded-lg ">
            <button
              onClick={toggle}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
