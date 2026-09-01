import { usePatch } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { codeDType } from "@/types/code.type";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export default function EditCodeCard({ code }: { code: codeDType }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { patchData, loading, error } = usePatch(`/codes/${code?.id}`);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<codeDType>();

  const openModal = () => {
    reset(code);
    toggle();
  };
  const onSubmit = async (data: codeDType) => {
    try {
      const res = await patchData(data);
      if(res) return toast.success("Quiz Updated Successfully");
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
      <Toaster position="top-center" richColors />
      <li className="bg-blue-200 rounded-lg h-5 w-5 flex items-center justify-center">
        <FontAwesomeIcon
          icon={faEdit}
          className="cursor-pointer text-xs text-blue-500"
          onClick={openModal}
        />
      </li>
      {code && isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4">
          <div className="bg-white mx-auto my-auto w-full  md:w-1/2 relative p-10 rounded-lg ">
            <button
              onClick={() => {
                toggle();
              }}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="font-medium text-lg">
                    Description
                  </label>
                  {errors.description && (
                    <p className="text-red-500 text-xs">
                      {errors.description.message}
                    </p>
                  )}
                  <textarea
                    {...register("description", {
                      required: "description field is required",
                    })}
                    className="border border-gray-200 bg-gray-100 p-4 rounded-md"
                    placeholder="Write Code description "
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="code" className="font-medium text-lg">
                    Code
                  </label>
                  {errors.code && (
                    <p className="text-red-500 text-xs">
                      {errors.code.message}
                    </p>
                  )}

                  <textarea
                    {...register("code", {
                      required: " Code is required",
                    })}
                    className="border border-gray-200 bg-gray-100 p-4 rounded-md"
                    placeholder="Paste the code"
                    rows={10}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-gray-400 py-2 rounded-md font-bold cursor-pointer"
                >
                  Update Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
