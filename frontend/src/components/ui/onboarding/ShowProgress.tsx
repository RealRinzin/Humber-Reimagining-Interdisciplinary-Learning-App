import {
  OnboardPersonalDetailType,
  OnboardSelectContentType,
  OnboardLearningPathType,
  OnboardShowProgressType,
} from "@/types/onboard/onboard-types";
import Input from "../form/Input";
import { useForm } from "react-hook-form";
type Props = {
  onSuccess: (data: OnboardShowProgressType) => void;
  values: OnboardShowProgressType;
  personalDetail: OnboardPersonalDetailType;
  selectContent: OnboardSelectContentType;
  learningPath: OnboardLearningPathType;
};
// Page Return
const OnBoardingShowProgress = ({
  onSuccess,
  values,
  personalDetail,
  selectContent,
  learningPath,
}: Props) => {
  const userData = {
    personalDetail,
    selectContent,
    learningPath,
    progress: values,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardShowProgressType>({ values });

  // GET CSRF TOKEN
  async function fetchCsrfToken(): Promise<string> {
    await fetch(`http://localhost:8000/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    if (!token) throw new Error("XSRF-TOKEN cookie not found");

    return decodeURIComponent(token);
  }

  async function onBoardCall(): Promise<void> {
    const xsrfToken = await fetchCsrfToken(); // ← get cookie first, THEN read it
    // // return ;
    const res = await fetch(`http://localhost:8000/api/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": xsrfToken,
      },
      body: JSON.stringify({ ...userData.personalDetail, role_id: 1 }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    const data = await res.json(); // return new user detail
  
    // Content settings post
    const setting = await fetch(
      `http://localhost:8000/api/v1/user-content-settings`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
        //  Post body
        body: JSON.stringify({
          ...userData.selectContent,
          ...userData.learningPath,
          ...userData.progress,
          user_id: data.user.id,
        }),
      },
    );
    // console.log(user);
  }

  const onSubmit = async (data: OnboardShowProgressType) => {
    try {
      await onBoardCall();
      onSuccess(data);
    } catch (err) {
      console.error("error", err);
    }
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
        <label htmlFor="progress">
          <input
            type="checkbox"
            {...register("progress")}
            className="h-4 w-4 rounded border-4 border-gray-600 bg-white checked:border-amber-500 checked:bg--500 "
          />
          <span className="px-3">Show Progress</span>
        </label>
        <div className="flex items-center justify-end gap-4 mt-8">
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Start Learning
          </button>
        </div>
      </form>
    </>
  );
};

export default OnBoardingShowProgress;
