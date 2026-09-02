import { usePostForm } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { InteractiveDType } from "@/types/interactive.type";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export default function AddInteractiveCard({ videoID }: { videoID: number }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { postData, loading, error } = usePostForm("/interactives");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InteractiveDType>();

  const onSubmit = async (data: InteractiveDType) => {
    const formData = new FormData();
    formData.append("topic_id", String(videoID));
    formData.append("video_id", String(videoID));
    formData.append("description", data.description);
    formData.append("path", data.path[0]);
    try {
      console.log(formData);
      const res = await postData(formData);
      if (res) {
        toast.success("Successfully Added");
        router.refresh();
        toggle();
      }
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
        Add Interactive File
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
                {error && <p className="text-xs text-red-400">{error}</p>}
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
                  <label htmlFor="path" className="font-medium text-lg">
                    Interactive File
                  </label>
                  {errors.path && (
                    <p className="text-red-500 text-xs">
                      {errors.path.message}
                    </p>
                  )}
                  <input
                    type="file"
                    accept=".html,.htm"
                    {...register("path", {
                      required: "File field is required",
                    })}
                    className="border border-gray-200 bg-gray-100 p-4 rounded-md"
                    placeholder="Write Code description "
                  ></input>
                </div>
                <button
                  type="submit"
                  className="bg-gray-400 py-2 rounded-md font-bold cursor-pointer"
                >
                  Add File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
