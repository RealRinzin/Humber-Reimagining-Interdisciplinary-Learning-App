"use client";

import { useEffect } from "react";

export default function Home() {
  async function getEndpoint() {
    try {
      const res = await fetch("http://localhost:8000/api/test");
      console.log(res.status);
      console.log("adsfasd");
      if (!res.ok)
        throw new Error(`Currently there is a server issue. Come back later.`);
      const data = await res.json();
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      console.log("Inside Finally");
    }
  }
  useEffect(() => {
    getEndpoint();
  });
  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-gray-200 via-yellow-50 to-yellow-100 rounded-2xl shadow-md"
      >
        <div className="flex flex-col justify-evenly md:flex-row items-center-safe">
          <div className="w-1/3">Photo</div>
          <div className="mt-50 w-1/4">
            <h1 className="text-gray-600 text-center text-xl font-extralight">
              Admin Login Portal 
            </h1>
            <p className="text-sm py-2 text-gray-500 text-center">
              Only Instructor can login here...
            </p>
            <div className="flex flex-col my-5">
              <label htmlFor="Username" className="text-gray-600 py-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                autoComplete="off"
                className="bg-white rounded-3xl py-3 px-4 border border-gray-300/50"
              />
            </div>
            <div className="flex flex-col my-5">
              <label htmlFor="Password" className="text-gray-600 py-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="off"
                id="password"
                placeholder="Password"
                className="bg-white rounded-3xl py-3 px-4 border border-gray-300/50"
              />
            </div>
            <div className="my-5">
              <button className="bg-amber-300 rounded-2xl w-full py-2 font-bold cursor-pointer">
                Login
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
