"use client";
// We are using this tab basically for the Knowledge Map
// Horizontal Tab Progress bar
import { HorizontalTabTypes } from "@/types/progress/horizontalTab.types";
import RingProgressBar from "./Ring";
import { useToggle } from "@/hooks/common/useToggle";
import { clientFetch, clientPost } from "@/lib/clientFetch";

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
}: HorizontalTabTypes) {
  // Calling the state and toggle function for the hook
  const { isOn: isOpen, toggle } = useToggle(false);
  /**
   * POST Method to create new User Topic
   */

  return (
    <div
      className="flex bg-white items-center border-3 rounded-2xl border-gray-400/80 my-2 cursor-pointer "
      onMouseEnter={toggle}
      onMouseLeave={toggle}
    >
      <div
        className="flex flex-col items-center justify-center border-r-3 border-gray-400/80 p-3"
        onClick={() => postUserTopic(id)}
      >
        <RingProgressBar
          id={2}
          color={color}
          borderColor={color}
          percentage={90}
        />
        {isOpen && (
          <div className="pt-2 transition-all delay-300 ease-in-out">
            <p className="text-center text-xs font-semibold">4/8</p>
            <p className="text-gray-600 text-xs font-semibold">Complete</p>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 px-3 py-2">
        <div className="flex flex-1 justify-between items-center">
          <h2 className="text-gray-600 font-bold">{name}</h2>
          <a
            href={`/video/${slug}`}
            className="bg-gray-400 rounded-xl px-3 py-1 text-gray-600 text-sm"
            onClick={() => postUserTopic(id)}
          >
            Start
          </a>
        </div>

        {/* {isOpen && ( */}
        <p
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-40 opacity-100 pt-2" : "max-h-0 opacity-0"
          }`}
        >
          {description}
        </p>
        {/* )} */}
      </div>
    </div>
  );
}
