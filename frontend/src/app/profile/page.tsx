import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import VideoCard from "@/components/ui/video/VideoCard";
import ContentSetting from "@/components/ui/profile/ContentSetting";
import ProfileCirleRing from "@/components/ui/profile/ProfileRing";
import TabProgressBar from "@/components/ui/progress/Tab";
// import HeaderCookie from "@/lib/httpHeaderCookie";
import { serverFetch } from "@/lib/fetch";
import { VideoType } from "@/types/video";
/**
 *
 * @returns
 */
export default async function ProfilePage() {
  const res = await serverFetch(`/topics`);
  const { data: topics } = await res.json();

  // Get the User Record for the tables

  const getUserRecords = await serverFetch('/users/2')
  const {data:userData} = await getUserRecords.json()
  console.log(userData);
  // Return page
  return (
    <div className="grid grid-cols-3 gap-4 m-10">
      <div className="col-span-2">
        {/* Progress Session */}
        <div className="flex flex-row justify-around gap-10 bg-gray-200 rounded-lg p-6 ">
          <ProfileCirleRing />
          {/* Tab Progress UI */}
          <div>
            <ul>
              <TabProgressBar
                name={"Lectures Watched"}
                completed={userData?.user_video_settings.length??0}
                total={topics.length}
              />
              <TabProgressBar
                name={"Code Tested"}
                completed={userData?.topics.lenght??0}
                total={topics.length}
              />
              <TabProgressBar
                name={"Flashcards Completed"}
                completed={userData?.user_videos.length??0}
                total={topics.length}
              />
            </ul>
          </div>
          <div>
            <ul>
              <TabProgressBar
                name={"Demos Completed"}
                completed={1}
                total={topics.length}
              />
              <TabProgressBar
                name={"Ramblings Read"}
                completed={5}
                total={topics.length}
              />
              <TabProgressBar
                name={"Resources Reviewed"}
                completed={6}
                total={topics.length}
              />
            </ul>
          </div>
        </div>
        {/* Continue Learning section */}

        <div className="flex gap-10 my-10">
          {topics.slice(0, 3).map((video: VideoType, index: number) => (
            <div key={index}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
        {/* Content Setting */}
        <div>
          <ContentSetting />
        </div>
      </div>
      {/* Node Links */}
      <div className="bg-blue-950 rounded-lg">
        <CourseNodeLink />
        </div>
    </div>
  );
}
