"use client";
import LoginPage from "@/components/ui/LoginPage";
import dynamic from "next/dynamic";
const PivotScene = dynamic(() => import("@/components/ui/PivotScene"), {
  ssr: false,
});
export default function CoursePage() {
  return (
    <>
        <LoginPage />
    </>
  );
}
