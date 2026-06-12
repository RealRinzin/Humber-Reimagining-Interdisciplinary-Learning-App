"use client";
import LearningPath from "@/components/ui/onboardTest/LearningPath";
import PersonalDetail from "@/components/ui/onboardTest/PersonalDetail";
import SelectContent from "@/components/ui/onboardTest/SelectContent";
import ShowProgress from "@/components/ui/onboardTest/ShowProgress";
import { OnboardPersonalDetailType } from "@/types/onboard/onboard-types";
import React, { ComponentType, useEffect, useState } from "react";

interface OnBoardingDtypes {
  id: number;
  name: string;
  data: object;
  completed: boolean;
  status: boolean;
  next:boolean,
  component: ComponentType<{ onComplete: (data: any) => void }>;
}
export default function page() {
  const [personalDetail, setPersonalDetail] = useState({
    username: "",
    password: "",
  });
  const [selectContent, setSelectContent] = useState({
    learning: false,
    path: false,
  });
  const [onBoarding, setOnBoarding] = useState<OnBoardingDtypes[]>([
    {
      id: 1,
      name: "Personal \n Details",
      data: personalDetail,
      component: PersonalDetail,
      status: false,
      completed: false,
      next:true
    },
    // {
    //   id: 2,
    //   name: "Select \n Content",
    //   data: selectContent,
    //   completed: false,
    //   status:false,
    //   component: SelectContent,
    // },
  ]);
  // Pass this down so the child can update parent state
  const handleComplete = (data: OnboardPersonalDetailType, id: number) => {
    setOnBoarding((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, completed: true, status: true } : step,
      ),
    );
    setPersonalDetail({ username: data.username, password: data.password });

    // console.log("saved", data);
    // console.log(personalDetail);
  };
  useEffect(() => {
    console.log(personalDetail);
  }, [personalDetail,onBoarding]);
  return (
    <div className="min-h-screen bg-gray-300 w-2/4">
      <ul className="flex py-3 justify-evenly">
        {onBoarding.map((onboarding, index) => (
          <li
            key={index}
            className={`flex h-10 w-10 items-center justify-center rounded-full ${onboarding?.completed ? "bg-gray-500 " : "bg-gray-200 "} after:content-['']`}
          >
            {onboarding.id}
          </li>
        ))}
      </ul>

      {/* <PersonalDetail onComplete={handleComplete} /> */}
      {onBoarding.map((item, index) => (
        <div key={index}>
          <item.component
            onComplete={(data) => handleComplete(data, item.id)}
          />
        </div>
      ))}
    </div>
  );
}
