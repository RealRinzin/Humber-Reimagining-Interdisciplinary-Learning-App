"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { AddNewTopic } from "@/types/topic.type";
import FormInput from "@/components/ui/form/FormInput";
import FormSelect from "@/components/ui/form/FormSelect";
import FormCheckbox from "@/components/ui/form/FormCheckbox";
import MyCKEditor from "@/components/ui/cards/content/MyCKEditor";
import { usePost } from "@/hooks/client/useHTTP";
import FormFileInput from "@/components/ui/form/file/HtmlType";
import Select from "@/components/ui/form/Select";
import TopicConnectionDropdown from "@/components/topics/TopicConnectionDropdown";
import { useState } from "react";
export default function TopicPage() {
  const { postData, loading, error } = usePost("/topics");
  const [topicId, setTopicId] = useState<number | null>(null);
  const router = useRouter();
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
      student_visible: "1",
    },
    
  });

  const addNewTopic = async (data: AddNewTopic) => {
    try {
      const res = await postData(data);
      toast.success("New Topic Successfully Created");
      if (res) {
        setTopicId(res.id);
        router.push(`/dashboard/topics/${res.id}`);
         methods.reset();
      }
    } catch (err) {
      console.log(err);
      toast.error("Error", {
        description: "Fill all the mandatory fields",
      });
    }
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(addNewTopic)}>
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
                        placeholder="Topic Title"
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
                  placeholder="Select the group"
                  endpoint="node_groups/list"
                  required
                />
              </li>
            </ul>
            <div className="flex gap-4 text-gray-600 text-md">
              <h2>Topic Connections</h2>
              <TopicConnectionDropdown topicId={topicId} />
            </div>
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
                {/* <div className="my-4">
                  <p className="text-gray-600 py-3 text-sm">Interactive File</p>
                  <FormFileInput
                    type="file"
                    name="interactive_path"
                    label="interactive path"
                  />
                </div> */}
              </div>
            </div>
            {/* Content */}
            <MyCKEditor
              name="description"
              label="Topic Description"
              required={true}
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
