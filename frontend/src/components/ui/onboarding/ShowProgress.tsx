"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  OnboardPersonalDetailType,
  OnboardSelectContentType,
  OnboardLearningPathType,
  OnboardShowProgressType,
} from "@/types/onboard/onboard-types";
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
  const router = useRouter();


  // GET CSRF TOKEN
  async function fetchCsrfToken(): Promise<string> {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_END_POINT}/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    if (!token) throw new Error("XSRF-TOKEN cookie not found");

    return decodeURIComponent(token);
  }
console.log(`${process.env.BASE_END_POINT}`)
  async function onBoardCall(): Promise<void> {
    const xsrfToken = await fetchCsrfToken(); // ← get cookie first, THEN read it
    // // return ;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_END_POINT}/api/register`, {
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
    // const data = await res.json(); // return new user detail

    // if the registeratio is successed
    // Then login with the current user to create fresh cookies session
    const freshXsrfToken = await fetchCsrfToken();
    const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": freshXsrfToken,
      },
      body: JSON.stringify({
        username: userData.personalDetail.username,
        password: userData.personalDetail.password,
      }),
    });

    // Content settings post
    const settingXsrfToken = await fetchCsrfToken();
    const settingRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-content-settings`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": settingXsrfToken,
        },
        //  Post body
        body: JSON.stringify({
          ...userData.selectContent,
          ...userData.learningPath,
          ...userData.progress,
        }),
      },
    );
    if (!settingRes.ok) {
      console.log("error");
    }
  }

  const onSubmit = async (data: OnboardShowProgressType) => {
    try {
      await onBoardCall();
      onSuccess(data);
      router.push("/profile");
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
