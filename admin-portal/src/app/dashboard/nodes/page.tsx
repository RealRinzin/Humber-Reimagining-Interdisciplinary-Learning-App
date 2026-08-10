"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import CodeCard from "@/components/ui/cards/ code/CodeCard";
import FlashCard from "@/components/ui/cards/flashCard/FlashCard";
import RamblingCard from "@/components/ui/cards/rambling/RamblingCard";
import VideoCard from "@/components/ui/cards/video/VideoCard";
import HtmlType from "@/components/ui/form/file/HtmlType";
import { AddNewTopic } from "@/types/topic.type";
import {
  faBook,
  faCirclePlay,
  faCircleQuestion,
  faCode,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormInput from "@/components/ui/form/FormInput";
import FormSelect from "@/components/ui/form/FormSelect";
import FormCheckbox from "@/components/ui/form/FormCheckbox";
import MyCKEditor from "@/components/ui/cards/content/MyCKEditor";
import { usePost } from "@/hooks/client/useHTTP";
import FormFileInput from "@/components/ui/form/file/HtmlType";
export default function NewNodePage() {
  const { postData, loading, error } = usePost("/topics");
  const methods = useForm<AddNewTopic>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      node_color: "#ffffff",
      x_axis: 0,
      y_axis: 0,
      video: false,
      code: false,
      quiz: false,
      interactive: false,
      rambling: false,
      interactive_path: "",
      student_visible: true,
    },
  });

  const addNewTopic = async (data: AddNewTopic) => {
    console.log("FORM DATA:", data);
    try {
      const result = await postData(data);
      toast.success("New Topic Successfully Created");
      console.log("Success:", result);
    } catch (err) {
      console.log(err);
      toast.error("Error. Filled all the fields", {
        description: "Monday, January 3rd at 6:00pm",
      });

      // console.error("POST failed:", err);
    }
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(addNewTopic)}>
          <div className="bg-gray-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-4 justify-between  p-6 ">
                <div className="basis-4/6">
                  <ul className="flex gap-2">
                    <li className="basis-1/3">
                      <FormInput
                        type="text"
                        name="title"
                        label="Title"
                        required
                      />
                    </li>
                    <li className="flex basis-1/3 gap-2 items-center justify-start w-fit border border-slate-100 rounded-md px-2 text-white text-sm ">
                      <p>
                        <FontAwesomeIcon
                          icon={faEye}
                          size="1x"
                          className="cursor-pointer"
                        />
                      </p>
                      <p className="text-gray-100 text-xs">
                        <select className="outline-none  focus:ring-0 cursor-pointer" name="student_visible">
                          <option value="1">Visible to Students</option>
                          <option value="0">Hidden from Students</option>
                        </select>
                      </p>
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
          {/* Node Setting */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-6">
            <h1 className="border-b-2 border-gray-400 pb-2 font-bold text-gray-700">
              Topic Setting
            </h1>
            <ul className="flex gap-4 my-6 text-gray-600 text-md">
              <li>Group</li>
              <li>
                <FormSelect
                  name="node_group_id"
                  label="Group"
                  required={true}
                  placeholder="Select the group"
                  endpoint="node_groups/list"
                />
              </li>
            </ul>
            <ul className="flex gap-4  text-gray-600 text-md">
              <li>Topic Connections</li>
              <li>
                <FormSelect
                  name="topic_id"
                  label="Topic"
                  required={true}
                  placeholder="Select Connection Topics"
                  endpoint="topics"
                />
              </li>
            </ul>
            <ul className="flex gap-4 my-4">
              <li className="text-xs px-2 py-1 bg-gray-500 rounded-md text-white font-medium relative cursor-pointer">
                Intro to spac{" "}
                <span className="absolute -top-1 -right-1 bg-red-600 h-3 w-3 flex justify-center items-center rounded">
                  x
                </span>
              </li>
              <li className="text-xs px-2 py-1 bg-gray-500 rounded-md text-white font-medium relative cursor-pointer">
                Normal
                <span className="absolute -top-1 -right-1 bg-red-600 h-3 w-3 flex justify-center items-center rounded">
                  x
                </span>
              </li>
              <li className="text-xs px-2 py-1 bg-gray-500 rounded-md text-white font-medium relative cursor-pointer">
                Metric
                <span className="absolute -top-1 -right-1 bg-red-600 h-3 w-3 flex justify-center items-center rounded">
                  x
                </span>
              </li>
            </ul>
            {/* Content */}
            <div className="mt-10">
              <h1 className="border-b-2 border-gray-400 pb-2 font-bold text-gray-700">
                Content
              </h1>
              <p className="py-4 text-sm text-gray-500">
                Select type of content or create you own.
              </p>
              <div>
                <ul className="flex gap-10 items-center">
                  <li>
                    <FormInput
                      type="number"
                      name="x_axis"
                      label="x axis"
                      required
                    />
                  </li>
                  <li>
                    <FormInput
                      type="number"
                      name="y_axis"
                      label="y axis"
                      required
                    />
                  </li>
                  <li>
                    <FormInput
                      type="color"
                      name="node_color"
                      label="Node Color"
                      required
                    />
                  </li>
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
                <div className="my-4">
                  <p className="text-gray-700 py-3 text-sm">
                    Upload Interactive File
                  </p>
                  <FormInput
                    type="text"
                    name="interactive_path"
                    label="Interactive Path"
                    required
                  />
                  {/* <FormFileInput
                    type="file"
                    name="interactive_path"
                    label="interactive path"
                  /> */}
                </div>
              </div>
            </div>
            {/* Content */}
            <MyCKEditor
              name="description"
              label="Topic Description"
              required={true}
            />
            {/* <CkEditor */}
            {/* <VideoCard /> */}
            {/* <AddContent /> */}
            {/* <FlashCard /> */}
            {/* <CodeCard /> */}
            {/* <RamblingCard /> */}
            {/* Cards */}
            {/* <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-gray-500 my-4">
            <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
              <span>
                <FontAwesomeIcon
                  icon={faCirclePlay}
                  className="cursor-pointer text-2xl"
                />
              </span>
              <span className="text-sm">Videos</span>
            </li>
            <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
              <span>
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  className="cursor-pointer text-2xl"
                />
              </span>
              <span className="text-sm">Flashcards</span>
            </li>
            <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
              <span>
                <FontAwesomeIcon
                  icon={faBook}
                  className="cursor-pointer text-2xl"
                />
              </span>
              <span className="text-sm">Resources</span>
            </li>
            <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
              <span>
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  className="cursor-pointer text-2xl"
                />
              </span>
              <span className="text-sm">FAQ</span>
            </li>
            <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
              <span>
                <FontAwesomeIcon
                  icon={faCode}
                  className="cursor-pointer text-2xl"
                />
              </span>
              <span className="text-sm">Codes</span>
            </li>
            <li className="flex flex-col gap-2 justify-center items-center px-12 py-5 border border-gray-300 bg-gray-200 rounded-md">
              <span>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="cursor-pointer text-2xl"
                />
              </span>
              <span className="text-sm">Custom</span>
            </li>
          </ul> */}
          </div>
          {/*  */}
        </form>
      </FormProvider>
    </>
  );
}
