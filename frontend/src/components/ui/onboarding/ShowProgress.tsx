import { OnboardShowProgressType } from "@/types/onboard/onboard-types";
import Input from "../form/Input";
import { useForm } from "react-hook-form";
type Props = {
  onSuccess: (data: OnboardShowProgressType) => void;
  values: OnboardShowProgressType;
};
const OnBoardingShowProgress = ({ onSuccess, values }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardShowProgressType>({ values });

  const onSubmit = (data: OnboardShowProgressType) => {
    console.log(data);
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
          Choose whether you'd like to see your progress as you learn. You can
          turn this on or off anytime.
        </p>
        <label htmlFor="status">
          <input
            type="checkbox"
            {...register("status")}
            className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
          />
          <span className="px-3">Guided Path</span>
        </label>
        <div className="flex items-center justify-end gap-4 mt-8">
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default OnBoardingShowProgress;
