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
  const { data } = await res.json(); // destructure the data

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
      `/user-videos/users/${me.id}/videos/${data.id}`,
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
            video_id: data.id,
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

  // Register User Topics Too
  const userTopic = await serverFetch(`/user-topics/users/${me.id}/topics`);
  const topics = await userTopic.json();
  // console.log(topics)
  return (
    <main className="px-1 md:px-20 py-5">
      <section className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-4">
          <CourseTitle title={data.title} />
          <div className="px-1 py-8">
            <h1 className="text-2xl font-semibold">
              {" "}
              <FontAwesomeIcon icon={faCirclePlay} size="1x" /> Video
            </h1>
            <p className="py-2 px-10 text-gray-800 text-md">{data.tldw}</p>
          </div>
          {/* Video section */}
          <section className="flex flex-col md:flex-row gap-3 py-3">
            <MyPlayer
              src={data.video_url}
              last_stop={lastPaused}
              videoID={data.id}
              userVideoID={userVideoID}
            />
          </section>
          {/* Code Tabe */}
          {data?.codes ? (
            <CourseTabs
              type="code"
              title={"Code"}
              icon={faCode}
              content={data?.codes[0]?.code}
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
          />
          {/* Quiz Tab */}
          <CourseTabs
            type="tyk"
            title={"Test Your Knowledge"}
            icon={faClipboardQuestion}
            content={data.title}
          />
          {/* Rambling Tab */}
          <CourseTabs
            type="rambling"
            title={"Umer's Rambling"}
            icon={faHexagonNodes}
            content={data.title}
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
          {/* <TopicProgressTracking/> */}
          <CourseNodeLink />
        </aside>
      </section>
    </main>
  );
}
