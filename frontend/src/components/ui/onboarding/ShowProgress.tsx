import Input from "../form/Input";

export default function OnBoardingShowProgress()
{
    return(
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 text-center">
            Learning Path
        </h2>
        <div className="mt-2 border-t border-gray-600/50" />
      </div>
      <p className="text-gray-700">
        Choose whether you'd like to see your progress as you learn.
        You can turn this on or off anytime.
      </p>
      <Input type="checkbox" name="show progress"/>
    </>
    )
}