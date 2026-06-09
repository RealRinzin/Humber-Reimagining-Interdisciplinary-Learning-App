"use client";
import LearningPath from "@/components/ui/onboardTest/LearningPath";
import PersonalDetail from "@/components/ui/onboardTest/PersonalDetail";
import SelectContent from "@/components/ui/onboardTest/SelectContent";
import ShowProgress from "@/components/ui/onboardTest/ShowProgress";
import React, { ComponentType, useState } from "react";

interface OnBoardingDtypes {
  id: number;
  name: string;
  component: ComponentType;
  data: object;
  completed: boolean;
}
export default function page() {
  const [personalDetail, setPersonalDetail] = useState({
    username: "",
    password: "",
  });
  const [onBoarding, setOnBoarding] = useState<OnBoardingDtypes[]>([
    {
      id: 1,
      name: "Personal \n Details",
      data: personalDetail,
      component: PersonalDetail,
      completed: true,
    },
    // {
    //   id: 2,
    //   name: "Select \n Content",
    //   data: "personalDetail",
    //   completed: false,
    //   component: SelectContent,
    // },
    // {
    //   id: 3,
    //   name: "Learning \n Path",
    //   data: personalDetail,

    //   completed: false,
    //   component: LearningPath,
    // },
    // {
    //   id: 4,
    //   name: "Show \n Progress",
    //   data: personalDetail,
    //   completed: false,
    //   component: ShowProgress,
    // },
  ]);
  // Pass this down so the child can update parent state
  const handleComplete = (id:number,data: any) => {
    console.log(data);
  };
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
      {onBoarding.map((component, index) => (
        <div key={index}>
        </div>
      ))}
    </div>
  );
}
