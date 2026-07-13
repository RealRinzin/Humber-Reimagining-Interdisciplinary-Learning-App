"use client";


import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import { useFetch } from "@/hooks/client/useFetch";
export default function UserList() {
  // const {data:users,loading,error} = useFetch('https://jsonplaceholder.typicode.com/users')
  const {data:codes,loading,error} = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/codes`)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
    <Navigation/>
    <ul>
      {codes?.map((code: any) => (
        <li key={code.id}>{code.description}</li>
      ))}
    </ul>
    <Footer/>
    </>
  );
}
