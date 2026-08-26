"use client";
import FormInput from "@/components/ui/form/FormInput";
import { usePost } from "@/hooks/client/useHTTP";
import { VideoType } from "@/types/video.type";
import { FormProvider, useForm } from "react-hook-form";
import Select from "@/components/ui/form/Select";
import FormCheckbox from "@/components/ui/form/FormCheckbox";
import FormSelect from "@/components/ui/form/FormSelect";
import MyCKEditor from "@/components/ui/cards/content/MyCKEditor";
import VideoFileUpload from "@/components/ui/form/file/VideoType";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VideoCreate() {
  const { postData, loading, error } = usePost("/videos");
  const [videoID,setVideoID] =  useState<number | null>(null);
  const router = useRouter();
  const methods = useForm<VideoType>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      topic_id: 0,
      video_url: "url",
      thumbnail: "thumb",
      description: "",
      duration: 34,
      tldw: "",
      video: false,
      code: false,
      quiz: false,
      interactive: false,
      rambling: false,
      interactive_path: "",
      student_visible: true,
    },
  });

  // Add Function
  const addNewVideo = async (data: VideoType) => {
    const res = await postData(data);
    if (res) {
      setVideoID(res.id)
      toast.success("New Topic Successfully Created");
      console.log(res);
      // router.push(`/dashboard/topics/`);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(addNewVideo)}>
        <div className="bg-gray-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between p-6 ">
              <div className="basis-4/6">
                <ul className="flex flex-col md:flex-row gap-2">
                  <li className="basis-1/3">
                    <FormInput
                      type="text"
                      name="title"
                      label="Title"
                      placeholder="Video Title"
                      required
                    />
                  </li>
                  <li className="flex basis-1/3 gap-2 items-center justify-start w-full md:w-fit border border-slate-100 rounded-md px-2 text-white text-sm ">
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
                <ul className="flex md:justify-end justify-around  gap-2">
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
        {/* Node Setting */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-6">
          <h1 className="border-b-2 border-gray-400 pb-2 font-bold text-gray-700">
            Video Setting
          </h1>
          <ul className="flex gap-4 my-6 text-gray-600 text-md">
            <li>Topic</li>
            <li>
              <FormSelect
                name="topic_id"
                label="Topic"
                placeholder="Select the topic"
                endpoint="topics"
                required
              />
            </li>
          </ul>
          <div className="mt-10">
            <p className="py-4 text-md text-gray-500 font-medium">
              Content resources options
            </p>
            <div>
              {/* <ul className="flex flex-col md:flex-row gap-10 items-center"> */}
              <ul className="grid grid-cols-3 md:grid-cols-12">
                <li>
                  <FormCheckbox name="video" label="Video" />
                </li>
                <li>
                  <FormCheckbox name="code" label="Codes" />
                </li>
                <li>
                  <FormCheckbox name="rambling" label="Ramblings" />
                </li>
                <li>
                  <FormCheckbox name="quiz" label="Quiz" />
                </li>
                <li>
                  <FormCheckbox name="interactive" label="Interactive" />
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <MyCKEditor
              name="description"
              label="Video Description"
              required={true}
            />
            <MyCKEditor name="tldw" label="Tldw Description" required={true} />
          </div>
          <div className="bg-gray-50 border border-gray-200/80  py-10 flex flex-col md:flex-row justify-center items-center rounded-md">
            <VideoFileUpload videoID={videoID} saveVideoFun={addNewVideo} />
          </div>
          {/* Other Contents */}
        </div>
      </form>
    </FormProvider>
  );
}
