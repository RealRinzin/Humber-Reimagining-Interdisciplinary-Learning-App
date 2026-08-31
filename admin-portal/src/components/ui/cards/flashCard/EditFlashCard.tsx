import { useToggle } from "@/hooks/common/useToggle";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function EditFlashCard({ flashcard }: { flashcard: any }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  return (
    <>
      <li className="bg-blue-200 rounded-lg h-5 w-5 flex items-center justify-center">
        <FontAwesomeIcon
          icon={faEdit}
          // onClick={() => updateQuiz(flashcard)}
          className="cursor-pointer text-xs text-blue-500"
          onClick={toggle}
        />
      </li>
      {flashcard && isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-50">
          <div className="bg-white mx-auto my-auto w-full  md:w-1/2 relative p-10 rounded-lg ">
            <button
              onClick={() => {
                toggle();
              }}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            {flashcard?.question}
          </div>
        </div>
      )}
    </>
  );
}
