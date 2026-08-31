import { useToggle } from "@/hooks/common/useToggle";
import { RamblingDType } from "@/types/rambling.type";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import MyCKEditor from "../content/MyCKEditor";
import { usePatch } from "@/hooks/client/useHTTP";
import { toast } from "sonner";

export default function EditRamblingCard({ rambling }: { rambling: any }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { patchData, loading, error } = usePatch(`/ramblings/${rambling?.id}`);

  const methods = useForm<RamblingDType>();
  const { handleSubmit, reset } = methods;
  const openModal = () => {
    reset(rambling);
    toggle();
  };

  const onSubmit = async (data: RamblingDType) => {
    try {
      const res = await patchData(data);
      if (res) return toast.success("Quiz Updated Successfully");
      // router.refresh();
      // toggle();
    } catch (err: any) {
      console.log(err);
    }
  };
  if (loading)
    return <p className="bg-gray-100 px-2 text-xs py-1 rounded">Loading...</p>;
  if (error) return <p className="text-red-600 text-xs">Error: {error}</p>;
  return (
    <>
      <li className="bg-blue-200 rounded-lg h-5 w-5 flex items-center justify-center">
        <FontAwesomeIcon
          icon={faEdit}
          className="cursor-pointer text-xs text-blue-500"
          onClick={openModal}
        />
      </li>
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
                    <MyCKEditor
                      name="content"
                      label="content"
                      required={true}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-400 py-2 rounded-md font-bold cursor-pointer"
                  >
                    Update Rambling
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
