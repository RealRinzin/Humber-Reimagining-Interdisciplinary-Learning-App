import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoCard from "../../ui/video/VideoCard";
import { serverFetch } from "@/lib/fetch";
import { VideoType } from "@/types/video";

export default async function MoreCourses() {
  const res = await serverFetch(`/videos`);
  const { data } = await res.json();
  return (
    <>
      <h2 className="text-xl font-bold text-gray-600 ">
        <FontAwesomeIcon icon={faCircleArrowRight} size="1x" className="pr-2" />
        What is next ?
      </h2>
      <p className="py-4 text-slate-500">
        Ready to learn more? Check out these suggested modules
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.slice(0, 4).map((video: VideoType, index: number) => (
          <div className="my-2" key={index}>
            <VideoCard  video={video}/>
          </div>
        ))}
      </div>
    </>
  );
}
