"use client";
import Home from "@/components/layout/Home";
import LoginPage from "@/components/ui/LoginPage";
import OnBoardingPersonalDetail from "@/components/ui/onboarding/PersonalDetail";
import dynamic from "next/dynamic";
const PivotScene = dynamic(() => import("@/components/ui/PivotScene"), {
  ssr: false,
});
export default function CoursePage() {
  return (
    <>
      {/* <main className="px-1 md:px-20 py-5"> */}
        <LoginPage />
        {/* <OnBoardingPersonalDetail/> */}
        {/* <Home/> */}
        {/* <PivotScene /> */}
      {/* </main> */}
    </>
  );
}
