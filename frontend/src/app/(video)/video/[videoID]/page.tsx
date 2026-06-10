import React from "react";
import ClientPage from "./ClientPage";
import ServerPage from "./ServerPage";
import { serverFetch } from "@/lib/fetch";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoID: string }>;
}) {
  const { videoID: videoSlug } = await params;
  const res = await serverFetch(`/videos/${videoSlug}`);
  const { data: video } = await res.json();
  
  return {
    title: `${video.title} - ${video.description}`,
    description: video.description,
  };
}
export default async function page({
  params,
}: {
  params: Promise<{ videoID: string }>;
}) {
  const { videoID } = await params;
  return (
    <ClientPage videoSlug={videoID}>
      <ServerPage videoSlug={videoID} />
    </ClientPage>
  );
}
