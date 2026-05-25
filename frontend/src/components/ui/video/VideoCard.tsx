"use client";
import RingProgressBar from "@/components/ui/progress/Ring";
import { clientPost } from "@/lib/clientFetch";
import { VideoType } from "@/types/video";
async function postUserTopic(topic_id: number) {
  // Post method
  const res = await clientPost("/user-topics/users/me/topics", {
    topic_id: topic_id,
    started: true,
  });
}
export default function VideoCard({ video }: { video: VideoType }) {
  // Calculate the ring percentage
  const fields = ["code", "rambling", "quiz", "interactive"] as const;

  const total = video?.videos[0]?.user_video_setting?.all_checked
    ? fields.length
    : fields.filter((field) => video?.videos[0]?.user_video_setting?.[field])
        .length;
  total;
  // assign the start to the vidoe
  const is_started = video?.is_following;
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-400 bg-slate-100 p-3 text-sm">
        <div className="flex gap-2 items-center-safe">
          <RingProgressBar
            id={video.id}
            color={video.node_color}
            borderColor={video.node_color}
            progress={total}
          />
          <h5 className="pb-3 text-lg font-medium items-center-safe">
            {video.title}
          </h5>
        </div>
        <p className="py-3">{video.description}</p>
        <div className="flex justify-end">
          <a
            href={`/video/${video.slug}`}
            className="rounded-md bg-slate-950 px-2 py-0.5 text-sm font-medium text-white cursor-pointer"
            onClick={is_started ? undefined : () => postUserTopic(video.id)}
          >
            {video.is_following ? "Continue" : "Start"}
          </a>
        </div>
      </div>
    </>
  );
}
