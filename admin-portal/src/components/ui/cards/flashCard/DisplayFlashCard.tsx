import { useToggle } from "@/hooks/common/useToggle";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DisplayFlashCard({ flashcards }: { flashcards: any }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const deleteVideo = async () => {
    if (window.confirm("Are you sure?")) {
      console.log("delete");
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      {flashcards?.map((flashcard: any, index: number) => (
        <div
          className="w-78 h-50 cursor-pointer group bg-slate-300 rounded-2xl relative"
          onClick={toggle}
          key={index}
        >
          <ul className="absolute -top-1 -right-1 flex gap-1 z-10">
            <li
              className="bg-red-200 rounded-md h-5 w-5 flex items-center justify-center"
              onClick={() => deleteVideo()}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer text-xs text-red-500"
              />
            </li>
            <li className="bg-blue-200 rounded-lg h-5 w-5 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer text-xs text-blue-500"
              />
            </li>
          </ul>
          <div
            className={`
                  relative w-full h-full transition-transform duration-500
                  transform-3d
                  ${isOpen && " group-hover:transform-[rotateY(180deg)]"}
                 
                  `}
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
                    backface-hidden bg-slate-900 text-white rounded-2xl
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
      ))}
    </div>
  );
}
