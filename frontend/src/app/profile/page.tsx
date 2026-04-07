import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import VideoCard from "@/components/ui/video/VideoCard";
import ContentSetting from "@/components/ui/profile/ContentSetting";
import ProfileCirleRing from "@/components/ui/profile/ProfileRing";
import TabProgressBar from "@/components/ui/progress/Tab";
// import HeaderCookie from "@/lib/httpHeaderCookie";
import { cookies } from "next/headers";

export default async function ProfilePage() {
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
                completed={10}
                incomplete={2}
              />
              <TabProgressBar
                name={"Code Tested"}
                completed={1}
                incomplete={11}
              />
              <TabProgressBar
                name={"Flashcards Completed"}
                completed={2}
                incomplete={10}
              />
            </ul>
          </div>
          <div>
            <ul>
              <TabProgressBar
                name={"Demos Completed"}
                completed={1}
                incomplete={11}
              />
              <TabProgressBar
                name={"Ramblings Read"}
                completed={5}
                incomplete={7}
              />
              <TabProgressBar
                name={"Resources Reviewed"}
                completed={6}
                incomplete={6}
              />
            </ul>
          </div>
        </div>
        {/* Continue Learning section */}

        <div className="flex gap-10 my-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <VideoCard id={3} key={index} />
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
