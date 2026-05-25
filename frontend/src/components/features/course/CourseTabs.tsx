"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedDarkAtom } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/clientFetch";
import { useToggle } from "@/hooks/common/useToggle";
import QuizWrapper from "@/components/ui/quiz/QuizWrapper";
import RamblingCard from "@/components/ui/rambling/RamblingCard";
import { copyToClipboard } from "@/lib/common";
//
export default function CourseTabs({
  title,
  content,
  videoID,
  icon,
  type,
  status,
  all_complete,
  quizzes,
  ramblings,
}: courseTabsTypes) {
  const { isOn: isOpen, toggle } = useToggle(status);
  const router = useRouter();

  const [drop, setDrop] = useState(false);
  const [isChecked, setIsChecked] = useState(status);
  const [allChecked, setAllChecked] = useState(false);
  // Async function to update individual status
  async function updateTheStatus() {
    router.refresh();
    // Get the all status of this video
    const completeStatusRes = await clientFetch(
      `/user-video-setting/users/me/videos/${videoID}`,
    );
    const { data } = await completeStatusRes.json();
    // reverse the status
    status = !status;
    data.all_checked = false;
    // Update the latest status of this tab
    data[type] = !isOpen;
    // Update individual checkbox
    const res = await clientFetch(
      `/user-video-setting/users/me/videos/${videoID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
  }

  useEffect(() => {
    setIsChecked(status);
  }, [status]);
  return (
    <section className="my-5">
      <div className="flex justify-between bg-slate-100 p-3 rounded-md">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-600">
          <Image
            src={`/img/${icon}`}
            height={20}
            width={20}
            alt="Home Icon"
            className="h-5 w-5"
          />
          {title}
          <FontAwesomeIcon
            icon={drop ? faAngleUp : faAngleDown}
            size="1x"
            onClick={() => {
              setDrop((prev) => !prev);
            }}
            className="cursor-pointer text-gray-600 px-2"
          />
        </h2>
        {type !== "faq" && (
          <div
            className={`h-8 w-8 rounded-full border-6  ${
              all_complete || isOpen || status
                ? "bg-green-600 border-green-600 hover:cursor-pointer"
                : "bg-slate-400 border-slate-600 hover:border-green-600 hover:cursor-pointer hover:bg-white transition duration-300 ease-in-out"
            } hover:shadow-[0_0_10px_3px_rgba(34,197,94,0.6)]`}
            onClick={() => {
              setIsChecked((prev) => !prev);
              toggle();
              updateTheStatus();
            }}
          >
            {(all_complete || isOpen || status) && (
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                className="text-white"
              />
            )}
          </div>
        )}
      </div>
      <div className={`relative p-3 ${drop ? "block" : "hidden"}`}>
        {/* <div className={`relative p-3`}> */}

        {/* Check the Type for the format */}
        {type === "code" ? (
          <>
            <p className="absolute right-10 my-4">
              <FontAwesomeIcon
                icon={faCopy}
                size="1x"
                className="text-white hover:cursor-pointer"
                onClick={() => copyToClipboard(content)}
              />
            </p>
            <SyntaxHighlighter language="cpp" style={solarizedDarkAtom}>
              {content}
            </SyntaxHighlighter>
          </>
        ) : type === "rambling" ? (
          <RamblingCard ramblings={ramblings} />
        ) : type === "quiz" ? (
          <QuizWrapper quizzes={quizzes} />
        ) : type === "tldnw" ? (
          "Later watch"
        ) : type === "interactive" ? (
          <iframe
            src="/interactive/space.html"
            className="w-full h-screen border-0"
          />
        ) : type === "resources" ? (
          "Documents"
        ) : (
          content
        )}
      </div>
    </section>
  );
}
