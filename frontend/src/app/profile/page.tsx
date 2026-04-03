import VideoCard from "@/components/features/course/VideoCard";
import ContentSetting from "@/components/ui/profile/ContentSetting";
import ProfileCirleRing from "@/components/ui/progress/ProfileRing";
import RingProgressBar from "@/components/ui/progress/Ring";
import TabProgressBar from "@/components/ui/progress/Tab";
import React from "react";
export default function ProfilePage() {
  return (
    <div className="m-10">
      {/* Progress Session */}
      <div className="flex flex-row gap-10 bg-gray-200 rounded-lg p-6">
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
        <ContentSetting/>

      </div>
    </div>
  );
}
