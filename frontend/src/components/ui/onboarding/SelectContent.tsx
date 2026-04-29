import Input from "../form/Input";
import { OnboardPersonalDetailType, OnboardSelectContentType } from "@/types/onboard/onboard-types";
import { useForm } from "react-hook-form";

type Props = {
  onSuccess: (data: OnboardSelectContentType) => void;
  values: OnboardSelectContentType;
  personalDetail: OnboardPersonalDetailType  // ← add this
};
const OnBoardingSelectContent = ({ onSuccess, values,personalDetail }: Props) => {
  console.log(personalDetail);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardSelectContentType>({ values });

  const onSubmit = (data: OnboardSelectContentType) => {
    onSuccess(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 text-center">
            Select Content
          </h2>
          <div className="mt-2 border-t border-gray-600/50" />
        </div>
        <p className="text-gray-700">
          Select the content you're almost interested in. We'll use this to
          prioritize your learning and track your progress
        </p>
        <div className="flex justify-start mt-6">
          <div className="flex flex-col gap-5">
            <label htmlFor="videos">
              <input
                type="checkbox"
                {...register("video")}
                className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
              />
              <span className="px-3">Videos</span>
            </label>
            <label htmlFor="interactive">
              <input
                type="checkbox"
                {...register("interactive")}
                className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
              />
              <span className="px-3">Interactive Demos</span>
            </label>
            <label htmlFor="code">
              <input
                type="checkbox"
                {...register("code")}

                className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
              />
              <span className="px-3">Code</span>
            </label>
            <label htmlFor="quizes">
              <input
                type="checkbox"
                {...register("quiz")}
                className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
              />
              <span className="px-3">Quizes</span>
            </label>
            <label htmlFor="ramblings">
              <input
                type="checkbox"
                {...register("rambling")}
                className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
              />
              <span className="px-3">Ramblings</span>
            </label>
          </div>
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

export default OnBoardingSelectContent;
