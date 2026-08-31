import { usePost } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type codeDataType = {
  topic_id: number;
  video_id: number;
  code: string;
  description: string;
};
export default function AddCode({ videoID }: { videoID: number }) {
  const { isOn: isOpen, toggle } = useToggle(false);
    const { postData, loading, error } = usePost("/codes");
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<codeDataType>();

  const onSubmit = async (data: codeDataType) => {
    // append these two
    data["topic_id"] = videoID;
    data["video_id"] = videoID;
    try {
      const res = await postData(data);
      toast.success("Updated Video Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button
        className="bg-gray-200 py-2 px-4 rounded-md text-gray-600 font-bold cursor-pointer"
        onClick={toggle}
      >
        Add Code
      </button>
      {!isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-50">
          <div className="bg-white mx-auto my-auto w-full  md:w-1/2 relative p-10 rounded-lg ">
            <button
              onClick={() => {
                toggle();
                reset();
              }}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}></form>
          </div>
        </div>
      )}
    </>
  );
}
