"use client";
import FormInput from "@/components/ui/form/FormInput";
import { usePatch } from "@/hooks/client/useHTTP";
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
import VideoCard from "../ui/cards/video/VideoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faInfo } from "@fortawesome/free-solid-svg-icons";
import SubVideoCard from "../ui/cards/video/SubVideoCard";
import DisplayFlashCard from "../ui/cards/flashCard/DisplayFlashCard";
import AddFlashCard from "../ui/cards/flashCard/AddFlashCard";
import AddCode from "../ui/cards/ code/AddCodeCard";
import DisplayCode from "../ui/cards/ code/DisplayCodeCard";
import EditFlashCard from "../ui/cards/flashCard/EditFlashCard";
import DisplayRamblingCard from "../ui/cards/rambling/DisplayRamblingCard";

export default function EditVideo({ video }: { video: any }) {
  const { patchData, loading, error } = usePatch(`/videos/${video?.id}`);
  const [videoID, setVideoID] = useState<number | null>(null);
  const [addSuccess, setAddSuccess] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<VideoType>({
    mode: "onBlur",
    values: video,
  });
  // Add Function
  const updateVideo = async (data: VideoType) => {
    const res = await patchData(data);
    if (res) {
      setVideoID(res.id);
      setAddSuccess(true);
      toast.success("Updated Video Successfully");
      router.push(`/dashboard/videos/${res?.id}`);
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(updateVideo)}>
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
                        {loading ? "Updating..." : "Update"}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Node Setting */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-6">
            <h1 className="border-b-2 border-gray-400 pb-2 font-bold text-gray-700 uppercase">
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
                <ul className="grid grid-cols-3 md:grid-cols-10">
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
            <div className="my-4">
              <h2 className="uppercase font-bold text-gray-700">Contents</h2>
            </div>
            <div className="flex text-gray-700 gap-1 font-extrabold border-t-2 pt-4 border-gray-400 my-6">
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="cursor-pointer text-2xl text-gray-500"
              />
              Videos
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6  bg-gray-50 border border-gray-100 rounded-md p-6">
              <MyCKEditor
                name="description"
                label="Video Description"
                required={true}
              />
              <MyCKEditor
                name="tldw"
                label="Tldw Description"
                required={true}
              />
            </div>
            <div className="my-4">
              <div className="flex flex-col md:flex-row justify-between bg-gray-50 border border-gray-200/80  p-10  rounded-md">
                <VideoCard
                  id={video?.id}
                  title={video?.title}
                  slug={video?.slug}
                />
                <VideoFileUpload
                  videoID={videoID}
                  saveVideoFun={updateVideo}
                  successStatus={addSuccess}
                />
              </div>
              {/* <div className="my-6">
              <div className="flex my-4 text-gray-700 gap-1 font-extrabold">
                <FontAwesomeIcon
                  icon={faCirclePlay}
                  className="cursor-pointer text-2xl text-gray-500"
                />
                VIDEO PARTS
              </div>
              <div className="flex flex-col md:flex-row justify-between bg-gray-50 border border-gray-200/80  p-10  rounded-md">
                <SubVideoCard videos={video?.video_sections} />
                <VideoFileUpload
                  videoID={video?.id}
                  saveVideoFun={updateVideo}
                  successStatus={addSuccess}
                />
              </div>
            </div> */}
            </div>
          </div>
        </form>
      </FormProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FlashCard */}
        <div className="flex text-gray-700 gap-1 font-extrabold border-t-2 pt-4 border-gray-400 my-6">
          <FontAwesomeIcon
            icon={faInfo}
            className="cursor-pointer text-2xl text-gray-500"
          />
          Flashcards
        </div>
        <div className="my-4">
          {video?.quizzes.length > 0 && (
            <DisplayFlashCard flashcards={video?.quizzes} />
          )}
        </div>
        <AddFlashCard videoID={video?.id} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FlashCard */}
        <div className="flex text-gray-700 gap-1 font-extrabold border-t-2 pt-4 border-gray-400 my-6">
          <FontAwesomeIcon
            icon={faInfo}
            className="cursor-pointer text-2xl text-gray-500"
          />
          Codes
        </div>
        <div className="my-4">
          {video?.codes.length > 0 && (
            <DisplayCode codes={video?.codes} />
          )}
        </div>
        <AddCode videoID={video?.id} />
      </div>
      {/* Rambling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FlashCard */}
        <div className="flex text-gray-700 gap-1 font-extrabold border-t-2 pt-4 border-gray-400 my-6">
          <FontAwesomeIcon
            icon={faInfo}
            className="cursor-pointer text-2xl text-gray-500"
          />
          Ramblings
        </div>
        <div className="my-4">
          {video?.ramblings.length > 0 && (
            <DisplayRamblingCard ramblings={video?.ramblings} />
          )}
        </div>
        <AddCode videoID={video?.id} />
      </div>
    </>
  );
}
