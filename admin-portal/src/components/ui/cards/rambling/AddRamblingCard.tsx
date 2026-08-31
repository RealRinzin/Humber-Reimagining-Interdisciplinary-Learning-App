import { usePost } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { RamblingDType } from "@/types/rambling.type";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import MyCKEditor from "../content/MyCKEditor";

export default function AddRamblingCard({ videoID }: { videoID: number }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { postData, loading, error } = usePost("/ramblings");
  const methods = useForm<RamblingDType>();
  const { handleSubmit, reset } = methods;
  const onSubmit = async (data: RamblingDType) => {
    // append these two
    data["topic_id"] = videoID;
    data["video_id"] = videoID;
    try {
      const res = await postData(data);
      toast.success("Add Rambling Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button
        className="bg-gray-200 py-2 px-4 rounded-md text-gray-600 font-bold cursor-pointer"
        onClick={toggle}
      >
        Add Rambling
      </button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-50">
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
            <FormProvider {...methods}>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <MyCKEditor name="content" label="content" required={true} />
                </div>
                <button
                  type="submit"
                  className="bg-gray-400 py-2 rounded-md font-bold cursor-pointer"
                >
                  Add Code
                </button>
              </div>
            </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
}
