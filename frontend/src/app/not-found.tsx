import Footer from "@/components/layout/Footer";
import DesktopNavigation from "@/components/ui/navigation/Desktop";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <DesktopNavigation/>
      <main className="h-screen">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-9xl font-bold text-gray-400">404</h1>
            <p className="text-gray-500">The page you are looking is not found:</p>
            <Link href="/" className="bg-gray-600 text-white rounded-2xl py-2 text-center">Click to Return Home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
