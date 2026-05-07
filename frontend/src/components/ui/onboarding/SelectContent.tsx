
import {OnboardSelectContentType,} from "@/types/onboard/onboard-types";
import { useForm } from "react-hook-form";
import ToggleCheckBox from "../form/ToggleCheckbox";

type Props = {
  onSuccess: (data: OnboardSelectContentType) => void;
  values: OnboardSelectContentType;
};
const OnBoardingSelectContent = ({ onSuccess, values }: Props) => {
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
            {/* Video Checkbox */}
            <ToggleCheckBox<OnboardSelectContentType>
              name="video"
              label="video"
              register={register}
              required={false}
              error={errors.video?.message}
            />
            {/* Interactive Checkbox */}
            <ToggleCheckBox<OnboardSelectContentType>
              name="interactive"
              label="interactive"
              register={register}
              required={false}
              error={errors.interactive?.message}
            />
            {/* Code Checkbox */}
            <ToggleCheckBox<OnboardSelectContentType>
              name="code"
              label="Code"
              register={register}
              required={false}
              error={errors.code?.message}
            />
            {/* Quiz Checkbox */}
            <ToggleCheckBox<OnboardSelectContentType>
              name="quiz"
              label="Quiz"
              register={register}
              required={false}
              error={errors.quiz?.message}
            />
            {/* Rambling Checkbox */}

            <ToggleCheckBox<OnboardSelectContentType>
              name="rambling"
              label="Rambling"
              register={register}
              required={false}
              error={errors.rambling?.message}
            />
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
