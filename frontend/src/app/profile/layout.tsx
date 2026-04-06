import Footer from "@/components/layout/Footer";
import DesktopNavigation from "@/components/ui/navigation/Desktop";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // optional
});
export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DesktopNavigation />
      {children}
      <Footer />
    </>
  );
}
