import { InteractiveDType } from "@/types/interactive.type";
import React from "react";
import ViewInteractiveCard from "./ViewInteractiveCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditInteractiveCard from "./EditInteractiveCard";
import { useDelete } from "@/hooks/client/useHTTP";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DisplayInteractiveCard({
  interactives,
}: {
  interactives: InteractiveDType[];
}) {
  const { deleteData, loading, error } = useDelete();
  const router = useRouter();
  const deleteQuiz = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      const res = await deleteData(`/interactives/${id}`);
      toast.error("Successfully Deleted");
      router.refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {interactives?.map((interactive: InteractiveDType, index: number) => (
        <div className="bg-gray-200 py-2 px-4 rounded-md relative z-0" key={index}>
          <ul className="absolute bg-red-100 w-fit flex -top-1 -right-1">
            <li
              className="bg-red-200 rounded-md h-5 w-5 flex items-center justify-center"
              onClick={() => deleteQuiz(interactive?.id)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer text-xs text-red-500"
              />
            </li>
            <EditInteractiveCard interactive={interactive} />
          </ul>
          <div className="flex flex-col gap-4">
            <p>{interactive?.description}</p>
            <ViewInteractiveCard interactive={interactive} />
          </div>
        </div>
      ))}
    </div>
  );
}
