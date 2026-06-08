"use client";
import React, { useState } from "react";

interface OnBoardingDtypes {
  id: number;
  name: string;
  completed: boolean;
  component: string;
}
export default function page() {
  const [onBoarding, setOnBoarding] = useState<OnBoardingDtypes[]>([
    {
      id: 1,
      name: "personalDetail",
      completed: true,
      component: "PersonalDetail",
    },
    {
      id: 2,
      name: "selectContent",
      completed: false,
      component: "SeleceContent",
    },
    {
      id: 3,
      name: "learningPath",
      completed: false,
      component: "LearningPath",
    },
    {
      id: 4,
      name: "showProgress",
      completed: false,
      component: "showProgress",
    },
  ]);
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
    </div>
  );
}
