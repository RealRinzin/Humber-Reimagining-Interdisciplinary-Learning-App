import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import VideoCard from "@/components/features/course/VideoCard";
import ContentSetting from "@/components/ui/profile/ContentSetting";
import ProfileCirleRing from "@/components/ui/profile/ProfileRing";
import TabProgressBar from "@/components/ui/progress/Tab";
import HeaderCookie from "@/lib/httpHeaderCookie";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  return (
    <div className="grid grid-cols-3 gap-4 m-10">
      <div className="col-span-2">
        {/* Progress Session */}
        <div className="flex flex-row justify-around gap-10 bg-gray-200 rounded-lg p-6">
          <ProfileCirleRing />
          {/* Tab Progress UI */}
          <div>
            <ul>
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <TabProgressBar />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <TabProgressBar />
                </li>
              ))}
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
