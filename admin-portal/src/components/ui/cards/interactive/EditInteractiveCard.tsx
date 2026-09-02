import { usePatch } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { InteractiveDType } from "@/types/interactive.type";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";

export default function EditInteractiveCard({
  interactive,
}: {
  interactive: InteractiveDType;
}) {
  const { patchData, loading, error } = usePatch(
    `/interactives/${interactive?.id}`,
  );

  const router = useRouter();
  const { isOn: isOpen, toggle } = useToggle(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InteractiveDType>();
  const openModal = () => {
    reset(interactive);
    toggle();
  };
  if (loading)
    return <p className="bg-gray-100 px-2 text-xs py-1 rounded">Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-10">
          <div className="bg-white mx-auto my-auto w-full  md:w-1/2 relative p-10 rounded-lg ">
            <button
              onClick={() => {
                toggle();
              }}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            <p>{interactive?.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
