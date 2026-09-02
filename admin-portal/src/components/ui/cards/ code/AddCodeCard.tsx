import { usePost } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { codeDType } from "@/types/code.type";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export default function AddCode({ videoID }: { videoID: number }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { postData, loading, error } = usePost("/codes");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<codeDType>();

  const onSubmit = async (data: codeDType) => {
    // append these two
    data["topic_id"] = videoID;
    data["video_id"] = videoID;
    try {
      toast.success("Successfully Added New Code");
      const res = await postData(data);
      router.refresh();
      toggle();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      <button
        className="bg-gray-200 py-2 px-4 rounded-md text-gray-600 font-bold cursor-pointer"
        onClick={toggle}
      >
        Add Code
        {videoID}
      </button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="font-medium text-lg">
                    Description
                  </label>
                  {errors.description && (
                    <p className="text-red-500 text-xs">
                      {errors.description.message}
                    </p>
                  )}
                  <textarea
                    {...register("description", {
                      required: "description field is required",
                    })}
                    className="border border-gray-200 bg-gray-100 p-4 rounded-md"
                    placeholder="Write Code description "
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="code" className="font-medium text-lg">
                    Code
                  </label>
                  {errors.code && (
                    <p className="text-red-500 text-xs">
                      {errors.code.message}
                    </p>
                  )}

                  <textarea
                    {...register("code", {
                      required: " Code is required",
                    })}
                    className="border border-gray-200 bg-gray-100 p-4 rounded-md"
                    placeholder="Paste the code"
                    rows={10}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-gray-400 py-2 rounded-md font-bold cursor-pointer"
                >
                  Add Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
