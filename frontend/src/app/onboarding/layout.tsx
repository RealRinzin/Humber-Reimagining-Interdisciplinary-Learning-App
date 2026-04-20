import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // optional
});
// This is the layout for the onboarding pages. It will be used to wrap the onboarding pages and provide a consistent layout for them.
/**
 * 
 * @param param0 
 * @returns 
 */

export default function OnBoardingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
