import { useToggle } from "@/hooks/common/useToggle";
import { useForm } from "react-hook-form";
type FormData = {
  difficulty: number;
  question: string;
  answer: string;
};

export default function AddFlashCard({videoID}:{videoID:number}) {
  const { isOn: isOpen, toggle } = useToggle(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
  };
  return (
    <div className="">
      <button
        className="bg-gray-200 py-2 px-4 rounded-md text-gray-600 font-bold cursor-pointer"
        onClick={toggle}
      >
        Add Flashcard
      </button>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("question")} placeholder="Question" />

              <input {...register("answer")} placeholder="Answer" />

              <button type="submit" onClick={toggle}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
