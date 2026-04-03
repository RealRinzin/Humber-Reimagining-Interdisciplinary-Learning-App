import OnBoardingRegistration from "@/components/ui/onboarding/Register";

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="flex justify-center-safe my-4">
        {children}
        {/* <OnBoardingRegistration/> */}
      </div>
    </>
  );
}
