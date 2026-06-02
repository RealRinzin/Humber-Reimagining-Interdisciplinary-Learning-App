"use client";
import { useRouter } from "next/navigation";
// We are using this tab basically for the Knowledge Map
// Horizontal Tab Progress bar
import { HorizontalTabTypes } from "@/types/progress/horizontalTab.types";
import { useToggle } from "@/hooks/common/useToggle";
import { clientFetch, clientPost } from "@/lib/clientFetch";
import RingProgressBar from "@/components/ui/progress/Ring";
import { useEffect, useState } from "react";
import { calculateRingProgress } from "@/utils/RingProgressPerCalculator";

/**
 *
 * @param topic_id
 * Async Function to post or create new record for the user topic
 */

/**
 *
 *  MAIN PAGE RETURN
 */
export default function ExploreHorizontalTab({
  id, // Topic Id
  name,
  color,
  slug,
  description,
  is_started,
  ringInformation,
  video,
  total_started,
  onHover,
  onLeave,
}: HorizontalTabTypes) {
  // Calling the state and toggle function for the hook
  const { isOn: isOpen, toggle } = useToggle(false);
  // Update the topic
  async function postUserTopic(topic_id: number) {
    // Post method
    const res = await clientPost("/user-topics/users/me/topics", {
      topic_id: topic_id,
      started: true,
    });
    window.location.reload();
  }
  // Calculate the Ring circle detail from the incoming information

  const fields = ["video","code", "rambling", "quiz", "interactive"] as const;
  const total = ringInformation[0]?.user_video_setting?.all_checked
    ? fields.length
    : fields.filter((field) => ringInformation[0]?.user_video_setting?.[field])
        .length;
  const [userContentSetting, setUserContentSetting] = useState<any>(null);
  const [userVideoSetting, setUserVideoSetting] = useState<any>(null);
  async function getUserSetting() {
    const res = await clientFetch("/user-content-settings/users/me");
    const { data: user_setting } = await res.json();
    setUserContentSetting(user_setting);
  }
  async function getUserVideoSetting() {
    const res = await clientFetch(`/user-video-setting/users/me/videos/${id}`);
    const { data: video_setting } = await res.json();

    setUserVideoSetting(video_setting);
  }

  const progressTotal = calculateRingProgress(
    video,
    userContentSetting,
    userVideoSetting,
  );
  useEffect(() => {
    // destructure the content
    getUserSetting();
    getUserVideoSetting();
  }, []);
  return (
    <div
      className={`flex items-center border-2 rounded-2xl border-gray-500/80 my-4  ${is_started ? "bg-white" : "bg-gray-400 "}`}
      // onMouseEnter={toggle}
      // onMouseLeave={toggle}
      onMouseEnter={() => {
        toggle();
        onHover?.();
      }}
      onMouseLeave={() => {
        toggle();
        onLeave?.();
      }}
    >
      <div className="flex flex-col items-center justify-center border-r-2 border-gray-500/80 p-3">
        <RingProgressBar
          id={id}
          color={color}
          borderColor={color}
          progress={total}
          // total={0}
          total={(userContentSetting as any)?.total_checked}
          onClick={
            total_started !== 18 ? () => postUserTopic(id + 1) : undefined
          }
        />
        {isOpen && (
          <div className="pt-2 transition-all delay-300 ease-in-out">
            {/* <p className="text-center text-xs font-semibold">{total}/4</p>
             */}
            <p className="text-center text-xs font-semibold">
              {progressTotal}/{userContentSetting?.total_checked}
            </p>

            <p className="text-gray-600 text-xs font-semibold">Complete</p>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 px-3 py-2">
        <div className="flex flex-1 justify-between items-center">
          <h2 className="text-gray-600 font-bold">{name}</h2>

          <a
            href={`/video/${slug}`}
            className={`rounded-xl px-3 py-1 text-slate-400 text-sm bg-gray-500`}
            onClick={is_started ? undefined : () => postUserTopic(id)}
          >
            {is_started ? "Continue" : "Start"}
          </a>
        </div>

        <p
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-40 opacity-100 pt-2" : "max-h-0 opacity-0"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
