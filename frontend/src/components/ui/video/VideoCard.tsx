import RingProgressBar from "@/components/ui/progress/Ring";
import { VideoType } from "@/types/video";

export default function VideoCard({ video }: { video: VideoType }) {
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-400 bg-slate-100 p-3 text-sm">
        <div className="flex gap-10 items-center-safe">
          <RingProgressBar id={video.id} color={'#f6339a'} borderColor={'#D3D1C7'} percentage={video.id+2} />
          <div>
            <h5 className="pb-3 text-lg font-medium">{video.title}</h5>
            <div className="font-extralight text-gray-500 flex gap-2">
              <span className="rounded-md bg-slate-300 p-1"> 5 Min</span>
              <span className="rounded-md bg-slate-300 p-1"> Professor</span>
            </div>
          </div>
        </div>
        <p className="py-3">
          Quick Little Overview of the lecture content. Maybe 3 sentences
        </p>
        <div className="flex justify-end">
          
          <a
            href={`/video/${video.slug}`}
            className="rounded-md bg-slate-950 px-2 py-0.5 text-sm font-medium text-white"
          >
            {" "}
            Start
          </a>
        </div>
      </div>
    </>
  );
}
