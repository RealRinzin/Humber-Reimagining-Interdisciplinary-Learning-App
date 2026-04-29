import Input from "../form/Input";
import { OnboardLearningPathType } from "@/types/onboard/onboard-types";

type Props = {
  onSuccess: (data: OnboardLearningPathType) => void;
  values: OnboardLearningPathType;
};
// const OnBoardingLearningPath = ({ onSuccess }: { onSuccess: () => void }) => {
  const OnBoardingLearningPath = ({ onSuccess, values }: Props)=> {

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 text-center">
          Learning Path
        </h2>
        <div className="mt-2 border-t border-gray-600/50" />
      </div>
      <p className="text-gray-700">
        Choose how you'd like to navigate your learning. You can change this at
        any time
      </p>
      <div className="flex flex-col gap-5">
        <div>
          <Input type="radio" name="explore_mode" />
          <span>-Jump between topics and explore the map your way. </span>
        </div>
        <div>
          <Input type="radio" name="guided path" />
          <span>
            Guided Path - Follow a structured path. Choose from a set of
            learning routes.
          </span>
        </div>
      </div>
    </>
  );
};

export default OnBoardingLearningPath;
