"use client";
import CourseTabs from "@/components/features/course/CourseTabs";
import CourseTitle from "@/components/features/course/CourseTitle";
import MoreCourses from "@/components/features/course/MoreCourses";
import CommonSideBarNode from "@/components/ui/nodeAnimation/CommonSideBarNode";
import VideoPageSkeleton from "@/components/ui/skeleton/VideoPage";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import { useToggle } from "@/hooks/common/useToggle";
import { clientFetch, clientPatch, clientPost } from "@/lib/clientFetch";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { isOn: isOpen, toggle } = useToggle(false);
  const [video, setVideo] = useState<any>(null);
  const [completeStatus, setCompleteStatus] = useState<any>(null);
  const [lastPaused, setLastPaused] = useState(0);
  const [userVideoID, setUserVideoID] = useState<any>(null);
  const { videoID: videoSlug } = useParams();

  // UseEffect for the page
  async function getTheVideoDetails() {
    const res = await clientFetch(`/videos/${videoSlug}`);
    const { data: videoData } = await res.json();
    setCompleteStatus(videoData);
    setVideo(videoData);
    //  Current User Detail Fetch
    const user = await clientFetch(`/me`);
    const me = await user.json();
    try {
      const last_pause = await clientFetch(
        `/user-videos/users/${me.id}/videos/${videoData.id}`,
      );
      if (last_pause.ok) {
        const content = await last_pause.json();
        if (content.data === null || content.data.completed) {
          const addNewUserVideo = await clientPost(
            `/user-videos/users/${me.id}/videos`,
            {
              user_id: me.id,
              video_id: videoData.id,
              last_paused: 0,
              completed: false,
            },
          );
          if (!addNewUserVideo) return;
          const newUserVideo = await addNewUserVideo.json();
          setUserVideoID(newUserVideo.id);
        } else {
          setUserVideoID(content.data.id);
          setLastPaused(content?.data?.last_paused ?? 0);
        }
      }
    } catch (e) {
      // No record yet, default to 0
    }

    const completeStatusRes = await clientFetch(
      `/user-video-setting/users/me/videos/${videoData.id}`,
    );
    const { data: fetchedCompleteStatus } = await completeStatusRes.json();
    setCompleteStatus(fetchedCompleteStatus);

    if (fetchedCompleteStatus === null || fetchedCompleteStatus === undefined) {
      await clientPatch(`/user-video-setting/users/me/videos/${videoData.id}`, {
        code: false,
        interactive: false,
        rambling: false,
        quiz: false,
        quiz_checked_with_all: false,
        code_checked_with_all: false,
        interactive_checked_with_all: false,
        rambling_checked_with_all: false,
        all_checked: false,
      });
    }
  }
  // Use Effect
  useEffect(() => {
    if (videoSlug) getTheVideoDetails();
    // Reload the page after markAllComplete Click from the Title Child component
  }, [videoSlug]);

  if (!video) return <VideoPageSkeleton />;
  return (
    <div className="px-1 md:px-20 py-5">
      <div className="grid grid-cols-6 gap-4">
        <div className={`relative ${isOpen ? "col-span-4" : "col-span-6"}`}>
          <CourseTitle
            title={video?.title}
            videoID={video?.id}
            status={completeStatus}
          />
          <div className="px-1 py-8">
            <div className="flex items-center gap-2">
              <Image
                src={`/img/NextIcon.png`}
                height={20}
                width={20}
                alt="Course Next Information"
                className="h-5 w-5"
              />
              <h1 className="text-2xl font-semibold">Video</h1>
            </div>
            <p className="py-2 px-1 text-gray-800 text-md">{video?.tldw}</p>
          </div>

          <section className="flex flex-col md:flex-row gap-3 py-3">
            <MyPlayer
              src={video?.video_url}
              last_stop={lastPaused}
              videoID={video?.id}
              userVideoID={userVideoID}
            />
          </section>

          {video?.codes && (
            <CourseTabs
              type="code"
              title="Code Snippet"
              icon="CodeIcon.png"
              content={video?.codes[0]?.code}
              videoID={video?.id}
              status={completeStatus?.code}
              all_complete={completeStatus?.all_checked}
              onStatusUpdate={getTheVideoDetails}
            />
          )}

          <CourseTabs
            type="quiz"
            title="Test Your Knowledge"
            icon="QuizIcon.png"
            content={video?.title}
            status={completeStatus?.quiz}
            videoID={video?.id}
            all_complete={completeStatus?.all_checked}
            onStatusUpdate={getTheVideoDetails}
          />

          <CourseTabs
            type="interactive"
            title="Interactive Simulation"
            icon="QuizIcon.png"
            content={video?.title}
            status={completeStatus?.quiz}
            videoID={video?.id}
            all_complete={completeStatus?.all_checked}
            interactive_path={video?.interactive_path}
            onStatusUpdate={getTheVideoDetails}
          />

          <CourseTabs
            type="rambling"
            title="Umer's Rambling"
            icon="RamblingsIcon.png"
            content={video?.ramblings}
            videoID={video?.id}
            status={completeStatus?.rambling}
            all_complete={completeStatus?.all_checked}
            ramblings={video?.ramblings}
            onStatusUpdate={getTheVideoDetails}
          />
          {!isOpen && (
            <div
              className="fixed top-3/4 -translate-y-1/2 right-2 z-50 cursor-pointer"
              onClick={toggle}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="2x"
                className="text-white bg-gray-400 rounded-xs py-2"
              />
            </div>
          )}
          <section className="my-10">
            <MoreCourses />
          </section>
        </div>
        {isOpen && (
          <div className=" col-span-2 bg-slate-900 relative items-center">
            <div
              className="relative w-20 rounded-md -left-4 top-1/4 z-50 cursor-pointer"
              onClick={toggle}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                size="2x"
                className="text-white bg-gray-400 rounded-xs py-2"
              />
            </div>
            <CommonSideBarNode />
          </div>
        )}
      </div>

      {/* <button
        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-gray-500 rounded cursor-pointer"
        onClick={toggle}
      >
        {isOpen ? (
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            size="2x"
            className="text-white"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            size="2x"
            className="text-white"
          />
        )}
      </button> */}
    </div>
  );
}
