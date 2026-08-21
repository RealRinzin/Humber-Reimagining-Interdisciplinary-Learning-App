import { useFetch } from "@/hooks/client/useHTTP";
import { serverFetch } from "@/hooks/server/useServer";
import { Suspense } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ topicID: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopicPage params={params} />
    </Suspense>
  );
}
async function TopicPage({ params }: { params: Promise<{ topicID: string }> }) {
  
  const { topicID } = await params;
  const res = await serverFetch(`/topics/${topicID}`)

  return <div>{res?.data?.id}</div>;
}
