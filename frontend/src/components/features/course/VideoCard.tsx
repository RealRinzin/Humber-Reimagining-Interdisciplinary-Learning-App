import RingProgressBar from "@/components/ui/progress/Ring";

export default function VideoCard({ id }: { id: number }) {
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-400 bg-slate-100 p-3 text-sm">
        <div className="flex gap-10 items-center-safe">
          <RingProgressBar id={id} color={'#378ADD'} borderColor={'#D3D1C7'} percentage={23} />
          {/* <div className="h-10 w-10 rounded-full ring-6 ring-slate-400 relative">
            <div
              className={`absolute top-1/2 left-1/2 
            ${id === 1 ? "bg-cyan-400" : id === 2 ? "bg-purple-700" : "bg-pink-600"}
              -translate-x-1/2 -translate-y-1/2 rounded-full h-8 w-8`}
            ></div>
          </div> */}
          <div>
            <h5 className="pb-3 text-lg font-medium">Camera Space</h5>
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
            href="#"
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
