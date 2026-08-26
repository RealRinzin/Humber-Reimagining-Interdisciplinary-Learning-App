"use client";
import FormInput from "@/components/ui/form/FormInput";
import { usePost } from "@/hooks/client/useHTTP";
import { VideoType } from "@/types/video.type";
import { FormProvider, useForm } from "react-hook-form";
import Select from "@/components/ui/form/Select";

export default function VideoPage() {
  const { postData, loading, error } = usePost("/videos");

  const methods = useForm<VideoType>({
    mode: "onBlur",
  });

  // Add Function
  const addNewVideo = async (data: VideoType) => {};
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(addNewVideo)}>
        <div className="bg-gray-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 justify-between p-6 ">
              <div className="basis-4/6">
                <ul className="flex gap-2">
                  <li className="basis-1/3">
                    <FormInput
                      type="text"
                      name="title"
                      label="Title"
                      placeholder="Video Title"
                      required
                    />
                  </li>
                  <li className="flex basis-1/3 gap-2 items-center justify-start w-fit border border-slate-100 rounded-md px-2 text-white text-sm ">
                    <Select
                      name="student_visible"
                      label="Student Visible"
                      placeholder="Select Option"
                      required
                    />
                  </li>
                </ul>
              </div>
              {/* End Side */}
              <div className="basis-2/6">
                <ul className="flex justify-end gap-2">
                  <li>
                    <button className="bg-slate-500 text-xs rounded-md px-2 py-1 text-white cursor-pointer">
                      Cancel
                    </button>
                  </li>
                  <li>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-slate-200 text-xs rounded-md px-2 py-1 cursor-pointer"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
