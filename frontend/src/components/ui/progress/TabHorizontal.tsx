"use client";
// We are using this tab basically for the Knowledge Map
// Horizontal Tab Progress bar
import { HorizontalTabTypes } from "@/types/progress/horizontalTab.types";
import RingProgressBar from "./Ring";
import { useToggle } from "@/hooks/common/useToggle";
import { clientFetch, clientPost } from "@/lib/clientFetch";

interface CheckedMarkCount {
  code: number;
  quiz: number;
  rambling: number;
  interactive: number;
}

/**
 *
 * @param topic_id
 * Async Function to post or create new record for the user topic
 */
async function postUserTopic(topic_id: number) {
  // Post method
  const res = await clientPost("/user-topics/users/me/topics", {
    topic_id: topic_id,
    started: true,
  });
}
/**
 *
 *  MAIN PAGE RETURN
 */
export default function TabHorizontal({
  id, // Topic Id
  name,
  color,
  slug,
  description,
  is_started,
  ringInformation,
}: HorizontalTabTypes) {
  // Calling the state and toggle function for the hook
  const { isOn: isOpen, toggle } = useToggle(false);
  // Calculate the Ring circle detail from the incoming information

  const fields = ["code", "rambling", "quiz", "interactive"] as const;
  const total = ringInformation[0]?.user_video_setting?.all_checked
    ? fields.length
    : fields.filter((field) => ringInformation[0]?.user_video_setting?.[field])
        .length;

  return (
    <div
      className={`flex items-center border-2 rounded-2xl border-gray-500/80 my-4 cursor-pointer ${is_started ? "bg-white" : "bg-gray-400 "}`}
      onMouseEnter={toggle}
      onMouseLeave={toggle}
    >
      <div className="flex flex-col items-center justify-center border-r-2 border-gray-500/80 p-3">
        <RingProgressBar
          id={2}
          color={color}
          borderColor={color}
          progress={total}
        />
        {isOpen && (
          <div className="pt-2 transition-all delay-300 ease-in-out">
            <p className="text-center text-xs font-semibold">{total}/4</p>
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
