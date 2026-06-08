import CourseRelatedVideo from "@/components/features/course/CourseRelatedVideo";
import CourseTabs from "@/components/features/course/CourseTabs";
import CourseTitle from "@/components/features/course/CourseTitle";
import MoreCourses from "@/components/features/course/MoreCourses";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import { serverFetch, serverPatch, serverPost } from "@/lib/fetch";
import Image from "next/image";

export default async function ServerPage({ videoSlug }: { videoSlug: string }) {
  const res = await serverFetch(`/videos/${videoSlug}`); // call the video details
  //   // destructure the return into video for better understand of data while assigining
  const { data: video } = await res.json(); // destructure the data
  // Get me the the current logged user
  // so that we can pass the user id in api
  /**
   * Fetch the detail of the Logged User
   * helpful while passing the user ID for the user video detail rows in the user_videos table
   */
  const user = await serverFetch(`/me`);
  const me = await user.json();
  // variable to hold the dynamic variables
  let lastPaused = 0; // This will hold the value of the last watch time of the video
  let userVideoID; // This will hold the ID of the user_video (id) once we created the row on page load
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
        // new user_video for this video with the logged in user
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
        video: true,
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
  // User Video Setting
  const user_content_setting = await serverFetch(
    "/user-content-settings/users/me",
  );
  const { data: user_setting } = await user_content_setting.json();
  return (
    
    <>
      <CourseTitle
        title={video.title}
        videoID={video.id}
        status={completeStatus}
        length={user_setting?.total_checked}
      />
      <div className="px-1 py-8">
        {/* Code Tabe */}
        <CourseTabs
          type="video"
          title="Video"
          icon="NextIcon.png"
          content=""
          videoID={video?.id}
          status={completeStatus?.video}
          all_complete={completeStatus?.all_checked}
          available={user_setting?.video}
        />
        <p className="py-2 px-1 text-gray-800 text-md">{video.description}</p>
      </div>
      {/* Video section */}
      <section className="flex flex-col md:flex-row gap-3 py-3">
        <MyPlayer
          src={video?.video_url}
          last_stop={lastPaused}
          videoID={video?.id}
          userVideoID={userVideoID}
          subtitle={video?.subtitle?.subtitle_url}
        />
      </section>
      {!!video?.video_sections?.length && (
        <div>
          <CourseRelatedVideo video_sections={video?.video_sections} />
        </div>
      )}

      {/* Code Snippet */}
      {video?.code && (
        <CourseTabs
          type="code"
          title={"Code Snippets"}
          icon="CodeIcon.png"
          content={video?.codes}
          videoID={video?.id}
          status={completeStatus?.code}
          all_complete={completeStatus?.all_checked}
          available={user_setting?.code}
        />
      )}
      {/* Quiz Tab */}
      {video?.quiz && (
        <CourseTabs
          type="quiz"
          title={"Test Your Knowledge"}
          icon="QuizIcon.png"
          content={video.title}
          status={completeStatus?.quiz}
          videoID={video?.id}
          all_complete={completeStatus?.all_checked}
          quizzes={video.quizzes}
          available={user_setting?.quiz}
        />
      )}

      {/* Interactive */}
      {video?.interactive_path && (
        <CourseTabs
          type="interactive"
          title={"Dina's Interactive Demos"}
          icon="QuizIcon.png"
          content={video.title}
          status={completeStatus?.interactive}
          videoID={video?.id}
          all_complete={completeStatus?.all_checked}
          quizzes={video?.quizzes}
          interactive_path={video?.interactive_path}
          available={user_setting?.interactive}
        />
      )}
      {/* Rambling Tab */}
      {video?.rambling && (
        <CourseTabs
          type="rambling"
          title={"Umer's Ramblings"}
          icon="RamblingsIcon.png"
          content={video?.ramblings}
          videoID={video?.id}
          status={completeStatus?.rambling}
          all_complete={completeStatus?.all_checked}
          ramblings={video?.ramblings}
          available={user_setting?.rambling}
        />
      )}
      {/* <section className="my-10">
        <MoreCourses status={completeStatus} />
      </section> */}
    </>
  );
}
