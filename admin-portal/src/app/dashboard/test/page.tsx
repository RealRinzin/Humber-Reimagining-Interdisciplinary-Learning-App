"use client";
import SkeletonCard from "@/components/ui/skeletons/Cards";
import LoadingPath from "@/components/ui/skeletons/Paths";
import TextInput from "@/components/ui/form/Text";
import Ring from "@/components/ui/ring/Ring";
import { useFetch } from "@/hooks/client/useHTTP";
import { useState } from "react";

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: codes,
    loading,
    error,
  } = useFetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/codes`,"GET");
  if (loading) return <><SkeletonCard/> <LoadingPath/></>;
  if (error) return <p>Error: {error}</p>;
  const title = "This is the title";
  // Double Click funciton
  const doubleClick = () => {
    setIsEditing(true);
    console.log("test");
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Helo")
    // Optionally: trim whitespace, prevent empty titles, call an API here
    // if (title.trim() === "") setTitle("Untitled");
  };
  return (
    <>
      <ul>
        {isEditing ? (
          <>
          <TextInput value={title} />
          <Ring/>
          </>
        ) : (
          <h1
            onDoubleClick={doubleClick}
            style={{ cursor: "text" }}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setIsEditing(false);
            }}
          >
            {title}
          </h1>
        )}

        {codes?.map((code: any) => (
          <li key={code.id}>{code.description}</li>
        ))}
      </ul>
    </>
  );
}
