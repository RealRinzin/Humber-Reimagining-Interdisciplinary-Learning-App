import { usePatch } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { FlashCardDType } from "@/types/flashcard.type";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";


export default function EditFlashCard({
  flashcard,
}: {
  flashcard: FlashCardDType;
}) {
  const router = useRouter();

  const { isOn: isOpen, toggle } = useToggle(false);
  const { patchData, loading, error } = usePatch(`/quizzes/${flashcard?.id}`);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FlashCardDType>();
  const openModal = () => {
    reset(flashcard);
    toggle();
  };

  const onSubmit = async (data: FlashCardDType) => {
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
      {flashcard && isOpen && (
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="font-medium text-lg">
                    Question
                  </label>
                  {errors.question && (
                    <p className="text-red-500 text-xs">
                      {errors.question.message}
                    </p>
                  )}
                  <textarea
                    {...register("question", {
                      required: "Question field is required",
                    })}
                    className="border border-gray-200 bg-gray-100 p-4 rounded-md"
                    placeholder="What question you want to ask"
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="answer" className="font-medium text-lg">
                    Answer
                  </label>
                  {errors.answer && (
                    <p className="text-red-500 text-xs">
                      {errors.answer.message}
                    </p>
                  )}

                  <textarea
                    {...register("answer", {
                      required: "Answer is required",
                    })}
                    className="border border-gray-200 bg-gray-100 p-4 rounded-md"
                    placeholder="Type the answer"
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="difficulty"
                    className="font-medium text-medium"
                  >
                    Difficulty
                  </label>
                  {errors.difficulty && (
                    <p className="text-red-500 text-xs">
                      {errors.difficulty.message}
                    </p>
                  )}

                  <select
                    {...register("difficulty", {
                      required: "Difficulty Level is required",
                    })}
                    className="border-gray-200 bg-gray-100 p-2 text-sm"
                  >
                    <option value="" className="text-gray-200">
                      Select the level
                    </option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-gray-400 py-2 rounded-md font-bold cursor-pointer"
                >
                  Update Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
