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
    formData.append("language", data.language);
    formData.append("subtitle", data.subtitle[0]);
    const res = await postData(formData);
    toast.success("Successfully Added New Code");
    router.refresh();
    toggle();
    reset();
  };
  return (
    <>
      <Toaster position="top-center" richColors />

      <button onClick={toggle}>Add Subtitle</button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-10">
          <div className="bg-white mx-auto my-auto w-full  md:w-1/2 relative p-10 rounded-lg ">
            <button
              onClick={toggle}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="language">Language</label>
                <input
                  id="language"
                  {...register("language", { required: true })}
                  placeholder="en"
                />
                {errors.language && <span>Language is required</span>}
              </div>

              <div>
                <label htmlFor="subtitle">Subtitle file (.vtt, .srt)</label>
                <input
                  id="subtitle"
                  type="file"
                  accept=".vtt,.srt"
                  {...register("subtitle", { required: true })}
                />
                {errors.subtitle && <span>File is required</span>}
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload subtitle"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
