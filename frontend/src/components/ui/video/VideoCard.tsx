import RingProgressBar from "@/components/ui/progress/Ring";
import { VideoType } from "@/types/video";

export default function VideoCard({ video }: { video: VideoType }) {
  console.log(video)
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-400 bg-slate-100 p-3 text-sm">
        <div className="flex gap-2 items-center-safe">
          <RingProgressBar
            id={video.id}
            // color={"#f6339a"}
            // borderColor={"#D3D1C7"}
            color={video.node_color}
            borderColor={video.node_color}

            percentage={video.id + 2}
          />
          <h5 className="pb-3 text-lg font-medium items-center-safe">
            {video.title}
          </h5>
        </div>
        <p className="py-3">{video.description}</p>
        <div className="flex justify-end">
          <a
            href={`/video/${video.slug}`}
            className="rounded-md bg-slate-950 px-2 py-0.5 text-sm font-medium text-white"
          >
            {video.is_following ? "Continue" : "Start"}
          </a>
        </div>
      </div>
    </>
  );
}
