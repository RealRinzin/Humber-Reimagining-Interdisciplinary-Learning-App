import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import CourseTabs from "@/components/features/course/CourseTabs";
import CourseTitle from "@/components/features/course/CourseTitle";
import MoreCourses from "@/components/features/course/MoreCourses";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import { serverFetch, serverPost } from "@/lib/fetch";
import {
  faHexagonNodes,
  faClipboardQuestion,
  faCode,
  faBook,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse all courses",
};
// Main Page
export default async function Page({
  params,
}: {
  params: Promise<{ videoID: string }>;
}) {
  // Get the Current Video Slug or ID to make api call
  const { videoID } = await params; // Get the video params
  const res = await serverFetch(`/videos/${videoID}`); // call the video details
  const { data: video } = await res.json(); // destructure the data
  // Get me the the current logged user
  // so that we can pass the user id in api
  const user = await serverFetch(`/me`);
  const me = await user.json();

  // With this:
  let lastPaused = 0;
  let userVideoID;
  // Try to read the user_video record for the current user on this video
  try {
    const last_pause = await serverFetch(
      `/user-videos/users/${me.id}/videos/${video.id}`,
    );
    // Check if response is ok
    if (last_pause.ok) {
      // Read the await responst
      const content = await last_pause.json();
      // console.log(content);
      // Check if the user already have user_video records for this video
      // if no then register on right when the page loads
      // if the record is empty or if already exist but the complete status is true
      if (content.data === null || content.data.completed) {
        // Here we are going to post
        console.log("First register on user_video with 0 index");
        const post_user_video_record = await serverPost(
          `/user-videos/users/${me.id}/videos`,
          {
            user_id: me.id,
            video_id: video.id,
            last_paused: 0,
            completed: false,
          },
        );
        const newUserVideo = await post_user_video_record.json();
        userVideoID = newUserVideo.id;
        // other wise read the exist for the time stame
      } else {
        console.log("We already have one and read the timestampe");
        userVideoID = content.data.id;
        // Here we will only read the record
        lastPaused = content?.data?.last_paused ?? 0; // assign the timestampe either from the existing record or 0
      }
    }
  } catch (e) {
    // No record yet, default to 0
  }
  // Complete Mark status check
  const completeStatusRes = await serverFetch(
    `/user-video-setting/users/me/videos/${video.id}`,
  );
  const { data: completeStatus } = await completeStatusRes.json();
  return (
    <main className="px-1 md:px-20 py-5">
      <section className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-4">
          <CourseTitle
            title={video.title}
            videoID={video.id}
            status={completeStatus}
          />
          {/* <div className="flex justify-between items-center-safe bg-gray-200 p-8 rounded-xl">
            <h1 className="text-3xl font-bold">{video.title}</h1>
            <button className="rounded-2xl  p-3 text-white cursor-pointer">
              "Mark All Content Complete
            </button>
          </div> */}
          <div className="px-1 py-8">
            <h1 className="text-2xl font-semibold">
              {" "}
              <FontAwesomeIcon icon={faCirclePlay} size="1x" /> Video
            </h1>
            <p className="py-2 px-10 text-gray-800 text-md">{video.tldw}</p>
          </div>
          {/* Video section */}
          <section className="flex flex-col md:flex-row gap-3 py-3">
            <MyPlayer
              src={video.video_url}
              last_stop={lastPaused}
              videoID={video.id}
              userVideoID={userVideoID}
            />
          </section>
          {/* Code Tabe */}
          {video?.codes ? (
            <CourseTabs
              type="code"
              title={"Code"}
              icon={faCode}
              content={video?.codes[0]?.code}
              videoID={video?.id}
              status={completeStatus?.code}
              all_complete={completeStatus?.all_checked}
            />
          ) : (
            ""
          )}
          {/* Interactive */}
          <CourseTabs
            type="interactive"
            title={"Interactive Mode"}
            icon={faBook}
            content={"demo"}
            videoID={video?.id}
            status={completeStatus?.interactive}
            all_complete={completeStatus?.all_checked}
          />
          {/* Quiz Tab */}
          <CourseTabs
            type="tyk"
            title={"Test Your Knowledge"}
            icon={faClipboardQuestion}
            content={video.title}
            status={completeStatus?.quiz}
            videoID={video?.id}
            all_complete={completeStatus?.all_checked}
          />
          {/* Rambling Tab */}
          <CourseTabs
            type="rambling"
            title={"Umer's Rambling"}
            icon={faHexagonNodes}
            content={video.title}
            videoID={video?.id}
            status={completeStatus?.rambling}
            all_complete={completeStatus?.all_checked}
          />

          {/* <iframe
                        src="http://localhost:3001"
                        className="w-full h-screen border-0"
                        allow="accelerometer; gyroscope"
                    /> */}
          <section className="my-10">
            <MoreCourses />
          </section>
        </div>
        <aside
          className="md:flex-2 bg-slate-900 rounded-xl"
          style={{ backgroundColor: "#000033" }}
        >
          <CourseNodeLink />
        </aside>
      </section>
    </main>
  );
}
