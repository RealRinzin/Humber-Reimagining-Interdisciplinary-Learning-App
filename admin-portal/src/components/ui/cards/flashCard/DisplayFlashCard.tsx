import { useDelete } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import EditFlashCard from "./EditFlashCard";
import { FlashCardDType } from "@/types/flashcard.type";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

export default function DisplayFlashCard({
  flashcards,
}: {
  flashcards: FlashCardDType[];
}) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { deleteData, loading, error } = useDelete();
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [updateFlashCard, SetUpdateFlashCard] = useState<any | null>(null);
  // Update
  const updateQuiz = async (flashcard: any) => {
    SetUpdateFlashCard(flashcard);
    setEditModalOpen(true);
  };
  // Delete
  const deleteQuiz = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      const res = await deleteData(`/quizzes/${id}`);
      toast.error("Successfully Deleted");
      router.refresh();
    }
  };
  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
        {flashcards?.map((flashcard: any, index: number) => (
          <div key={index}>
            <ul className="top-2 -right-1 flex justify-end gap-1">
              <li
                className="bg-red-200 rounded-md h-5 w-5 flex items-center justify-center"
                onClick={() => deleteQuiz(flashcard?.id)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer text-xs text-red-500"
                />
              </li>
              <EditFlashCard flashcard={flashcard} />
            </ul>
            <div className="w-78 h-50 cursor-pointer group bg-gray-300 rounded-2xl relative">
              <div
                className={`
                  relative w-full h-full transition-transform duration-500
                  transform-3d
                  ${isOpen && " group-hover:transform-[rotateY(180deg)]"}
                  `}
                onClick={toggle}
              >
                <div
                  className="absolute inset-0 rounded-xl 
                    backface-hidden
                    flex flex-col items-center justify-center gap-2 p-6"
                >
                  <p className="m-0 py-1 uppercase">{flashcard?.difficulty}</p>

                  <p className="py-2 border-y border-gray-400">
                    {flashcard?.question}
                  </p>
                  <p className="m-0 p-0">Click to Flip!</p>
                </div>
                <div
                  className={`
            absolute inset-0 
                    backface-hidden bg-gray-400 text-white rounded-2xl
                    transform-[rotateY(180deg)]
                    flex flex-col items-center justify-center gap-2 p-6
                    `}
                >
                  <p className="m-0 py-1 uppercase">{flashcard?.difficulty}</p>

                  <p className="py-2 border-y border-gray-200">
                    {flashcard?.answer}
                  </p>
                  <p className="m-0 py-1">Click to Flip!</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
