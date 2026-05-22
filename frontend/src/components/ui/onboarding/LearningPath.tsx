import { OnboardLearningPathType } from "@/types/onboard/onboard-types";
import { useForm } from "react-hook-form";
import ToggleRadio from "../form/Radio";

type Props = {
  onSuccess: (data: OnboardLearningPathType) => void;
  values: OnboardLearningPathType;
};

const OnBoardingLearningPath = ({ onSuccess, values }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardLearningPathType>({ values });

  const onSubmit = (data: OnboardLearningPathType) => {
  const selected = data.explore_mode; // "explore_mode" | "guide_path"



  let user: any = [];
  const payload = {
    explore_mode: data.learning_path === "explore_mode",
    guide_path: data.learning_path === "guide_path",
  };
  user["user"] = payload;
  onSuccess(payload as any);
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
          <ToggleRadio<OnboardLearningPathType>
            name="learning_path"
            value="explore_mode"
            label="Explore Mode"
            register={register}
            required={false}
            error={errors.explore_mode?.message}
          />
          <ToggleRadio<OnboardLearningPathType>
            name="learning_path"
            value="guide_path"
            label="Guide Path"
            register={register}
            required={false}
            error={errors.explore_mode?.message}
          />
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