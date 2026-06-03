import ContentSetting from "@/components/ui/profile/ContentSetting";
import ProfileCirleRing from "@/components/ui/profile/ProfileRing";
import TabProgressBar from "@/components/ui/progress/Tab";
import VideoCard from "@/components/ui/video/VideoCard";
import { serverFetch } from "@/lib/fetch";
import { VideoType } from "@/types/video";

export default async function ServerPage() {
  const res = await serverFetch(`/topics`);
  const { data: topics } = await res.json();

  // Get the User Record for the tables
  const getUserRecords = await serverFetch("/users/me/profile");
  const { data: userData } = await getUserRecords.json();
  const checkedMarkCount = (userData?.user_video_settings as any[]).reduce(
    (acc, data) => ({
      video: acc.video + (data?.pivot?.vodep ? 1 : 0),
      code: acc.code + (data?.pivot?.code ? 1 : 0),
      quiz: acc.quiz + (data?.pivot?.quiz ? 1 : 0),
      rambling: acc.rambling + (data?.pivot?.rambling ? 1 : 0),
      interactive: acc.interactive + (data?.pivot?.interactive ? 1 : 0),
    }),
    { video:0,code: 0, quiz: 0, rambling: 0, interactive: 0 },
  );
  return (
    <div className="col-span-3 md:col-span-2 h-full">
      <div className="grid grid-cols-1 md:grid-cols-7 col-span-2 bg-gray-200  gap-10 p-6 rounded-lg">
        <div className="col-span-1">
          <ProfileCirleRing />
        </div>
        <div className="col-span-3">
          <TabProgressBar
            name={"Lectures Started"}
            completed={userData?.topics?.length ?? 0}
            total={topics?.length}
          />
          <TabProgressBar
            name={"Code Tested"}
            completed={checkedMarkCount?.code ?? 0}
            total={topics?.length}
          />
          <TabProgressBar
            name={"Quiz Completed"}
            completed={checkedMarkCount?.quiz ?? 0}
            total={topics.length}
          />
        </div>
        <div className="col-span-3">
          <TabProgressBar
            name={"Ramblings Read"}
            completed={checkedMarkCount?.rambling ?? 0}
            total={topics.length}
          />
          <TabProgressBar
            name={"Interactive"}
            completed={checkedMarkCount?.interactive ?? 0}
            total={topics.length}
          />
        </div>
      </div>
      {/* Continue Learning section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
        {topics.slice(0, 3).map((video: VideoType, index: number) => (
          <div className="flex" key={index}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
      {/* Content Setting */}
      <div>
        <ContentSetting />
      </div>
    </div>
  );
}
