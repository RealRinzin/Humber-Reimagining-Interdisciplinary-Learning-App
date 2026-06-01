"use client";
import { useEffect, useState } from "react";
import { use } from "react";

import CommonSideBarNode from "@/components/ui/nodeAnimation/CommonSideBarNode";
import { clientFetch } from "@/lib/clientFetch";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams } from "next/navigation";
import CourseTitle from "@/components/features/course/CourseTitle";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
// Page
export default function Page() {
  const params = useParams();
  const sectionID = params.sectionID as string;
  const [video, setVideo] = useState([]);
  const [open, setOpen] = useState(true);

  async function getTheVideo(slug: string) {
    const res = await clientFetch(`/video-parts/${slug}`);
    const data = await res.json();
    setVideo(data);
  }
  // UseEffect
  useEffect(() => {
    getTheVideo(sectionID);
  }, [sectionID]);
  return (
    <main className="px-1 md:px-20 py-5">
      <div className="grid grid-cols-6 gap-8">
        <div
          className={` relative col-span-6 ${open ? "md:col-span-4" : "md:col-span-6"}`}
        >
          <div
            className="absolute top-1/3 -translate-y-1/2 -right-4 z-10 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <FontAwesomeIcon
                icon={faChevronRight}
                size="2x"
                className="text-white bg-slate-400 rounded-lg py-2"
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="2x"
                className="text-white bg-slate-400 rounded-lg py-2"
              />
            )}
          </div>
          <div className="flex flex-col md:flex-row  justify-start md:justify-between items-center-safe bg-gray-200 p-8 rounded-xl">
            <h1 className="text-3xl font-bold">{video?.title}</h1>
          </div>
          {/* Video section */}
          <section className="flex flex-col md:flex-row gap-3 py-3">
            <MyPlayer
              src={video?.video_url}
              // videoID={video?.id}
              subtitle={video?.subtitle}
            />
          </section>

        </div>
        {open && (
          <div className={`col-span-6 md:col-span-2 bg-slate-900 rounded-xl`}>
            <CommonSideBarNode />
          </div>
        )}
      </div>
    </main>
  );
}
