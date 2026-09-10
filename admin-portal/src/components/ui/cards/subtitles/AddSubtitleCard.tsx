"use client";
import { usePostForm } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
type FormValues = {
  language: string;
  subtitle: FileList;
};

export default function AddSubtitleCard({ videoID }: { videoID: number }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { postData, loading, error } = usePostForm("/subtitles");
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
    formData.append("language", "english");
    formData.append("subtitle", data.subtitle[0]);
    const res = await postData(formData);
    toast.success("Subtitle Added Successfully");
    router.refresh();
    toggle();
    reset();
  };
  return (
    <>
      <Toaster position="top-center" richColors />

      <button onClick={toggle}  className="bg-gray-200 py-2 px-4 rounded-md text-gray-600 font-bold cursor-pointer my-4">Add Subtitle</button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-10">
          <div className="bg-white mx-auto my-auto w-fit relative p-10 rounded-lg ">
            <button
              onClick={toggle}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex  gap-2">
                <label htmlFor="subtitle">Subtitle file (.vtt, .srt)</label>
                <input
                className="bg-gray-200 p-1 rounded-md"
                  id="subtitle"
                  type="file"
                  accept=".vtt,.srt"
                  {...register("subtitle", { required: true })}
                />
                {errors.subtitle && <span>File is required</span>}
              </div>

              <button type="submit" className="bg-gray-300 py-2 px-3 rounded-md" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload subtitle"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
