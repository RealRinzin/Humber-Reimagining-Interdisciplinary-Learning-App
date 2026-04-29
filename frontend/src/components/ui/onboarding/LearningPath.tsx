import Input from "../form/Input";
import { OnboardLearningPathType } from "@/types/onboard/onboard-types";
import { useForm } from "react-hook-form";

type Props = {
  onSuccess: (data: OnboardLearningPathType) => void;
  values: OnboardLearningPathType;
};
// const OnBoardingLearningPath = ({ onSuccess }: { onSuccess: () => void }) => {
const OnBoardingLearningPath = ({ onSuccess, values }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardLearningPathType>({ values });

  const onSubmit = (data: OnboardLearningPathType) => {
    let user: any = [];
    user["user"] = data;
    console.log(data)
    onSuccess(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 text-center">
            Learning Path
          </h2>
          <div className="mt-2 border-t border-gray-600/50" />
        </div>
        <p className="text-gray-700">
          Choose how you'd like to navigate your learning. You can change this
          at any time
        </p>
        <div className="flex flex-col gap-5">
          <label htmlFor="explore_mode">
            <input
              type="checkbox"
              {...register("explore_mode")}
              className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
            />
            <span className="px-3">Explore Mode</span>
          </label>
          <label htmlFor="guided_path">
            <input
              type="checkbox"
              {...register("guided_path")}
              className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
            />
            <span className="px-3">Guided Path</span>
          </label>
        </div>
        <div className="flex items-center justify-end gap-4 mt-8">
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default OnBoardingLearningPath;
