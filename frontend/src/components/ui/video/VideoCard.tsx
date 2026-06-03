"use client";
import RingProgressBar from "@/components/ui/progress/Ring";
import { clientFetch, clientPost } from "@/lib/clientFetch";
import { VideoType } from "@/types/video";
import { calculateRingProgress } from "@/utils/RingProgressPerCalculator";
import { useEffect, useState } from "react";
async function postUserTopic(topic_id: number) {
  // Post method
  const res = await clientPost("/user-topics/users/me/topics", {
    topic_id: topic_id,
    started: true,
  });
}
export default function VideoCard({ video }: { video: VideoType }) {
  const [userContentSetting, setUserContentSetting] = useState<any>(null);
  const [userVideoSetting, setUserVideoSetting] = useState<any>(null);
  async function getUserSetting() {
    const res = await clientFetch("/user-content-settings/users/me");
    const { data: user_setting } = await res.json();
    setUserContentSetting(user_setting);
  }
  async function getUserVideoSetting() {
    const res = await clientFetch(
      `/user-video-setting/users/me/videos/${video?.id}`,
    );
    const { data: video_setting } = await res.json();
    setUserVideoSetting(video_setting);
  }
  // Calculate the ring percentage
  // assign the start to the vidoe
  const is_started = video?.is_following;
  const progressTotal = calculateRingProgress(
    video?.videos[0],
    userContentSetting,
    userVideoSetting,
  );
  useEffect(() => {
    // destructure the content
    getUserSetting();
    getUserVideoSetting();
  }, []);
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-400 bg-slate-100 p-3 text-sm">
        <div className="flex gap-2 items-center-safe">
          <RingProgressBar
            id={video.id}
            color={video.node_color}
            borderColor={video.node_color}
            progress={progressTotal}
            total={
              (video?.videos[0] as any)?.interactive ? userContentSetting?.total_checked :
              userContentSetting?.total_checked - 1
            }
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
