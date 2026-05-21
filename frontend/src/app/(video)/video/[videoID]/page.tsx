import AnimatedCourseNode from "@/components/features/course/AnimatedCourseNode";
import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import CourseTabs from "@/components/features/course/CourseTabs";
import CourseTitle from "@/components/features/course/CourseTitle";
import MoreCourses from "@/components/features/course/MoreCourses";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import { serverFetch, serverPatch, serverPost } from "@/lib/fetch";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoID: string }>;
}){
  const { videoID:videoSlug } = await params;
  const res = await serverFetch(`/videos/${videoSlug}`);
  const { data: video } = await res.json();
  return {
    title: `${video.title} - ${video.description}`,
    description: video.description,
  };
}

/**
 * The Main Page Return 
 */
export default async function Page({
  params,
}: {
  params: Promise<{ videoID: string }>;
}) {
  // Get the Current Video Slug or ID to make api call
  const { videoID:videoSlug } = await params; // Get the video params
  /**
   * Fetch the detail records for this video
   * codes,quiz,documents etc
   */
  const res = await serverFetch(`/videos/${videoSlug}`); // call the video details
  // destructure the return into video for better understand of data while assigining
  const { data: video } = await res.json(); // destructure the data
  // Get me the the current logged user
  // so that we can pass the user id in api
  /**
   * Fetch the detail of the Logged User 
   * helpful while passing the user ID 
   */
  const user = await serverFetch(`/me`);
  const me = await user.json();
  // 
  let lastPaused = 0;
  let userVideoID;
  /**
   * Fetch the last pause record for this video
   * Return NULL if record does not exits
   */
  try {
    const last_pause = await serverFetch(
      `/user-videos/users/${me.id}/videos/${video.id}`,
    );
    // if the response is OK or 200 but the record is NULl
    // Then create a new record for this video 
    if (last_pause.ok) {
      // Read the await responst
      const content = await last_pause.json();
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
  /**
   * Fetch the checkbox status of this video  - User Video Setting Model
   * Return NULL if the record doesn't exist for this video 
   */
  const completeStatusRes = await serverFetch(
    `/user-video-setting/users/me/videos/${video.id}`,
  );
  // destructure the return data into completeStatus for better understanding and assigning
  const { data: completeStatus } = await completeStatusRes.json();
  // Check if the response is NULL
  // if so then create and new row for this video with all checkbox true
  if (completeStatus === null || completeStatus === undefined) {
    const res = await serverPatch(
      `/user-video-setting/users/me/videos/${video.id}`,
      {
        code: false,
        interactive: false,
        rambling: false,
        quiz: false,
        quiz_checked_with_all: false,
        code_checked_with_all: false,
        interactive_checked_with_all: false,
        rambling_checked_with_all: false,
        all_checked: false,
      },
    );
  }
  return (
    <main className="px-1 md:px-20 py-5">
      <section className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-4">
          <CourseTitle
            title={video.title}
            videoID={video.id}
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
            <p className="py-2 px-1 text-gray-800 text-md">{video.tldw}</p>
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
              title={"Code Snippet"}
              icon="CodeIcon.png"
              content={video?.codes[0]?.code}
              videoID={video?.id}
              status={completeStatus?.code}
              all_complete={completeStatus?.all_checked}
            />
          ) : (
            ""
          )}
          {/* Interactive */}
          {/* <CourseTabs
            type="interactive"
            title={"Interactive Mode"}
            icon="ramblingsIcon.png"
            content={"demo"}
            videoID={video?.id}
            status={completeStatus?.interactive}
            all_complete={completeStatus?.all_checked}
          /> */}
          {/* Quiz Tab */}
          <CourseTabs
            type="quiz"
            title={"Test Your Knowledge"}
            icon="QuizIcon.png"
            content={video.title}
            status={completeStatus?.quiz}
            videoID={video?.id}
            all_complete={completeStatus?.all_checked}
            quizzes={video.quizzes}
          />
          <CourseTabs
            type="interactive"
            title={"Interactive Simulation"}
            icon="QuizIcon.png"
            content={video.title}
            status={completeStatus?.quiz}
            videoID={video?.id}
            all_complete={completeStatus?.all_checked}
            quizzes={video.quizzes}
          />
          {/* Rambling Tab */}
          <CourseTabs
            type="rambling"
            title={"Umer's Rampling"}
            icon="RamblingsIcon.png"
            content={video.title}
            videoID={video?.id}
            status={completeStatus?.rambling}
            all_complete={completeStatus?.all_checked}
          />
          {/* Rambling Tab */}
          {/* <CourseTabs
            type="faq"
            title={"Frequently Asked Questions"}
            icon="FAQIcon.png"
            content={video.title}
            videoID={video?.id}
            status={completeStatus?.nan}
            all_complete={completeStatus?.nan}
          /> */}
          <section className="my-10">
            <MoreCourses />
          </section>
        </div>
        <aside
          className="md:flex-2 bg-slate-900 rounded-xl"
          style={{ backgroundColor: "#000033" }}
        >
          <AnimatedCourseNode/>
          {/* <CourseNodeLink /> */}
        </aside>
      </section>
    </main>
  );
}
