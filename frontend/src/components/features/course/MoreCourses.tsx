'use client'
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoCard from "../../ui/video/VideoCard";
import { serverFetch } from "@/lib/fetch";
import { VideoType } from "@/types/video";
import Image from "next/image";
import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/clientFetch";
export default  function MoreCourses({status}:any) {
const [topics, setTopics] = useState<VideoType[]>([]);
  useEffect(()=>{
    async function getTopics(){
      const res = await clientFetch(`/topics`);
      const { data:topics } = await res.json();
      setTopics(topics)
    }
    getTopics();

  },[status])
  return (
    <>
      <div className="flex items-center gap-2">
        {/* <Image
          src="/img/NextIcon.png"
          height={20}
          width={20}
          alt="Course Next Information"
          className="h-5 w-5"
        /> */}
        {/* <h2 className="text-xl font-bold text-gray-600 ">What is next ?</h2> */}
      </div>
      {/* <p className="py-4 text-slate-500">
        Ready to learn more? Check out these suggested modules
      </p> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.slice(0, 3).map((video: VideoType, index: number) => (
          <div className="my-2" key={index}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </>
  );
}
