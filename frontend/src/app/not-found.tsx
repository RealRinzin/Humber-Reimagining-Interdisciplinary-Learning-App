
import Link from "next/link";

export default function NotFound() {
  return (
    <>

      <main className="h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center gap-y-4">
            <h1 className="text-9xl font-bold text-gray-400">404</h1>
            <p className="text-gray-500 text-center">Page not found</p>
            <Link href="/" className="bg-gray-600 text-white rounded-xl py-2 px-2 text-center w-fit ">Go Home</Link>
          </div>
      </main>
    </>
  );
}
