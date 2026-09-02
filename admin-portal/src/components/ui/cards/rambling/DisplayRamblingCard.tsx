import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import EditRamblingCard from "./EditRamblingCard";
import { useDelete } from "@/hooks/client/useHTTP";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { RamblingDType } from "@/types/rambling.type";

export default function DisplayRamblingCard({ ramblings }: { ramblings: RamblingDType[] }) {
  const { deleteData, loading, error } = useDelete();
  const router = useRouter();
  const deleteQuiz = async (id: number) => {
    if (window.confirm("Are you sure? You want to delete.")) {
      toast.error("Successfully Deleted");
      const res = await deleteData(`/ramblings/${id}`);
      router.refresh();
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4">
      <Toaster position="top-center" richColors />
      {ramblings.map((rambling: any, index: number) => (
        <div key={index} className="rounded relative bg-gray-200 p-6  ">
          <ul className="absolute -top-1 -right-1 flex gap-1">
            <li className="bg-red-200 rounded-md h-5 w-5 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer text-xs text-red-500"
                onClick={() => deleteQuiz(rambling?.id)}
              />
            </li>
            <EditRamblingCard rambling={rambling} />
            <li className="bg-gray-200 rounded-md h-5 w-5 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCopy}
                className="cursor-pointer text-xs text-gray-500"
              />
            </li>
          </ul>
          <div dangerouslySetInnerHTML={{ __html: rambling?.content }} />
        </div>
      ))}
    </div>
  );
}
