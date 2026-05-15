import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import VideoCard from "@/components/ui/video/VideoCard";
import ContentSetting from "@/components/ui/profile/ContentSetting";
import ProfileCirleRing from "@/components/ui/profile/ProfileRing";
import TabProgressBar from "@/components/ui/progress/Tab";
// import HeaderCookie from "@/lib/httpHeaderCookie";
import { serverFetch } from "@/lib/fetch";
import { VideoType } from "@/types/video";

interface CheckedMarkCount {
  code: number;
  quiz: number;
  rambling: number;
  interactive: number;
}

/**
 *
 * @returns
 */
export default async function ProfilePage() {
  const res = await serverFetch(`/topics`);
  const { data: topics } = await res.json();

  // Get the User Record for the tables
  const getUserRecords = await serverFetch("/users/me/profile");
  const { data: userData } = await getUserRecords.json();

  const checkedMarkCount =
    userData?.user_video_settings.reduce<CheckedMarkCount>(
      (acc, data) => ({
        code: acc.code + (data?.pivot?.code ? 1 : 0),
        quiz: acc.quiz + (data?.pivot?.quiz ? 1 : 0),
        rambling: acc.rambling + (data?.pivot?.rambling ? 1 : 0),
        interactive: acc.interactive + (data?.pivot?.interactive ? 1 : 0),
      }),
      { code: 0, quiz: 0, rambling: 0, interactive: 0 },
    );
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
                completed={userData?.topics?.length ?? 0}
                total={topics?.length}
              />
              <TabProgressBar
                name={"Code Tested"}
                completed={checkedMarkCount?.code ?? 0}
                total={topics?.length}
              />
              <TabProgressBar
                name={"Flashcards Completed"}
                completed={checkedMarkCount?.quiz ?? 0}

                total={topics.length}
              />
            </ul>
          </div>
          <div>
            <ul>
              {/* <TabProgressBar
                name={"Demos Completed"}
                completed={1}
                total={topics.length}
              /> */}
              <TabProgressBar
                name={"Ramblings Read"}
                completed={checkedMarkCount?.ramblng ?? 0}

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
      <div className="bg-blue-950 rounded-lg">{/* <CourseNodeLink /> */}</div>
    </div>
  );
}
