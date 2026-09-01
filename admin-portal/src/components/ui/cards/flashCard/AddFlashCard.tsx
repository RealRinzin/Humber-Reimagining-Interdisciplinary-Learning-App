import { usePost } from "@/hooks/client/useHTTP";
import { useToggle } from "@/hooks/common/useToggle";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
type FormData = {
  difficulty: string;
  question: string;
  answer: string;
  topic_id: number;
  video_id: number;
};

export default function AddFlashCard({ videoID }: { videoID: number }) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const { postData, loading, error } = usePost("/quizzes");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
// append these two 
    data['topic_id'] = videoID;
    data['video_id'] = videoID;
    try {
      const res = await postData(data);
      toast.success("Updated Video Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="">
      <Toaster position="top-center" richColors />
      <button
        className="bg-gray-200 py-2 px-4 rounded-md text-gray-600 font-bold cursor-pointer"
        onClick={toggle}
      >
        Add Flashcard
      </button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-20">
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
                  Add Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
