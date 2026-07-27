"use client";
import { useState, useEffect, Suspense } from "react";
export default function Footer() {
  // Get the current year
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="py-6 px-20 text-white text-center">
      <ul className="flex justify-center gap-4 font-light text-xs ">
        <Suspense fallback={<span>...</span>}>
          <li>&copy; Copyright Humber Polytechnic - {year ?? ""}</li>
        </Suspense>
        {/* <li className="hover:text-gray-300">
          <a href="/">Privacy & Policies</a>
        </li>
        <li className="hover:text-gray-300">
          <a href="">Terms & Conditions</a>
        </li>
        <li className="hover:text-gray-300">
          <a href="">DMCA</a>
        </li> */}
      </ul>
    </footer>
  );
}
