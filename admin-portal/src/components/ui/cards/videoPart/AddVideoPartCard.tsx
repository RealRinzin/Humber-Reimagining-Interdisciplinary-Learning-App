import { usePostForm } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
type FormValues = {
  description: string;
  video_url: FileList;
  title: string;
};
export default function AddVideoPartCard({ videoID }: { videoID: number }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { postData, loading, error } = usePostForm("/video_sections");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("video_id", String(videoID));
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video_url", data.video_url[0]);
    const res = await postData(formData);
    toast.success("Subtitle Added Successfully");
    router.refresh();
    toggle();
    reset();
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      <button
        onClick={toggle}
        className="bg-gray-200 py-2 px-4 rounded-md text-gray-600 font-bold cursor-pointer my-4"
      >
        Upload New Video
      </button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-10">
          <div className="bg-white mx-auto my-auto w-fit relative p-10 rounded-lg ">
            <button
              onClick={toggle}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex  flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input
                  className="bg-gray-100 p-1 rounded-md"
                  id="title"
                  type="text"
                  {...register("title", { required: true })}
                />
                {errors.title && <span>File is required</span>}
              </div>
              <div className="flex  flex-col gap-2">
                <label htmlFor="video_url">Video</label>
                <input
                  className="bg-gray-100 p-1 rounded-md"
                  id="video_url"
                  type="file"
                  accept=".mp4,.wav"
                  {...register("video_url", { required: true })}
                />
                {errors.video_url && <span>File is required</span>}
                <div className="flex  flex-col gap-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="bg-gray-100 p-1 rounded-md"
                    id="description"
                    {...register("description", { required: true })}
                  />
                  {errors.title && <span>File is required</span>}
                </div>
              </div>

              <button
                type="submit"
                className="bg-gray-200 py-2 px-3 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload subtitle"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* <VideoFileUpload
        videoID={video?.id}
        saveVideoFun={updateVideo}
        successStatus={addSuccess}
      /> */}
    </>
  );
}
