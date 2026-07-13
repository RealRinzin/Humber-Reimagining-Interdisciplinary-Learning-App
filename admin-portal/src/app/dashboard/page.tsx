"use client";
import { useFetch } from "@/hooks/client/useFetch";
export default function Dash() {
  const {data: codes,loading,error,} = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/codes`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
        <ul>
          {codes?.map((code: any) => (
            <li  key={code.id}>{code.description}</li>
          ))}
        </ul>
    </>
  );
}
