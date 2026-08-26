"use client";
import { AddNewTopic } from "@/types/topic.type";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../ui/form/FormInput";
import FormSelect from "../ui/form/FormSelect";
import { useRouter } from "next/navigation";
// import TopicConnectionDropdown from "./TopicConnectionDropdown";
import MyCKEditor from "../ui/cards/content/MyCKEditor";
import FormCheckbox from "../ui/form/FormCheckbox";
import Select from "@/components/ui/form/Select";
import { usePatch } from "@/hooks/client/useHTTP";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import TopicEditConnectionDropdown from "../ui/topics/edit/TopicEditConnectionDropdown";
import Videos from "./videos/Videos";

export default function EditTopic({ topic }: { topic: any }) {
  const router = useRouter();
  const { patchData, loading, error } = usePatch(`/topics/${topic?.id}`);
  const methods = useForm<AddNewTopic>({
    mode: "onBlur",
    values: topic,
  });

  const updateTopic = async (data: AddNewTopic) => {
    try {
      const res = await patchData(data);
      toast.success("Successfully Updated");
      router.refresh();
    } catch (err: any) {}
  };
  useEffect(() => {
    if (topic) {
      methods.reset({
        title: topic.title,
        student_visible: topic.student_visible,
        node_group_id: topic.node_group_id,
        x_axis: topic.x_axis,
        y_axis: topic.y_axis,
        node_color: topic.node_color,
        video: topic.video,
        code: topic.code,
        rambling: topic.rambling,
        quiz: topic.quiz,
        interactive: topic.interactive,
        description: topic.description,
      });
    }
  }, [topic]);
  return (
    <>
      <FormProvider {...methods}>
        <Toaster position="top-center" richColors />
        <form onSubmit={methods.handleSubmit(updateTopic)}>
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
                        required
                      />
                    </li>
                    {topic?.student_visible}
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
                        className="bg-slate-200 text-xs rounded-md px-2 py-1 cursor-pointer"
                      >
                        Update
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
            <div className=" text-gray-600 text-md">
              <div className="flex gap-4">
                <h2>Topic Connections</h2>
                <TopicEditConnectionDropdown
                  topicId={topic?.id}
                  connections={topic?.connections}
                  updateFun={updateTopic}
                />
              </div>
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
              </div>
            </div>
            {/* Content */}
            {topic && (
              <MyCKEditor
                name="description"
                label="Topic Description"
                required={true}
              />
            )}
          </div>
        </form>
      </FormProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg text-gray-800 border-b-2 border-gray-300 my-4">Contents</h2>
        <Videos videos={topic?.videos} />
        <h2>Interactive</h2>
        <h2>Flashcard</h2>
        <h2>Rambling</h2>
      </div>
    </>
  );
}
