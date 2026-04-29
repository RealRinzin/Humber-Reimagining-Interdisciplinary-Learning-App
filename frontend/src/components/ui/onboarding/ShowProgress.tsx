import { OnboardShowProgressType } from "@/types/onboard/onboard-types";
import Input from "../form/Input";
type Props = {
  onSuccess: (data: OnboardShowProgressType) => void;
  values: OnboardShowProgressType;
};
const OnBoardingShowProgress = ({ onSuccess }: { onSuccess: () => void }) => {

  return (
    <>
      <form action="">
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
        <Input type="checkbox" name="show progress" />
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

export default OnBoardingShowProgress;
