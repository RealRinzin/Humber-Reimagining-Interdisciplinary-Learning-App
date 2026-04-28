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
        {data.map((video: VideoType, index: number) => (
          <div className="my-2" key={index}>
            {/* <div className='relative'>
                  <Link href={`/video/${video.slug}`}>
                    <Image
                      src={video.thumbnail}
                      alt="Description"
                      width={1200}
                      height={600}
                      sizes="100vw"
                      className="w-full h-[200px] object-cover rounded-2xl"
                    />
                  </Link>
                  <span className="absolute right-2 bottom-2 bg-gray-800 px-2 py-1 opacity-80  rounded-xl"><FontAwesomeIcon icon={faPlay} size="1x" className='text-white' /></span>
              </div>
              <h3 className='py-2 text-lg text-slate-600 font-bold'>{video.title}</h3> */}
            <VideoCard  video={video}/>
          </div>
        ))}
      </div>
    </>
  );
}
