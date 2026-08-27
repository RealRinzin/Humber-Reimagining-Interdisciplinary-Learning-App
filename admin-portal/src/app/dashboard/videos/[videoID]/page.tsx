import EditTopic from "@/components/topics/Edit";
import EditVideo from "@/components/videos/Edit";
import { serverFetch } from "@/hooks/server/useServer";
import { Suspense } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ videoID: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoPage params={params} />
    </Suspense>
  );
}

async function VideoPage({ params }: { params: Promise<{ videoID: string }> }) {
  const { videoID } = await params;
  const res = await serverFetch(`/videos/${videoID}`);
  const video = res.data;
  console.log(video)
  return (
    <EditVideo video={video}/>
  );
}

