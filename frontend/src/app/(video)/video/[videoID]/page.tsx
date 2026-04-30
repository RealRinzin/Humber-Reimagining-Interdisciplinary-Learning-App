import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import CourseTabs from "@/components/features/course/CourseTabs";
import CourseTitle from "@/components/features/course/CourseTitle";
import MoreCourses from "@/components/features/course/MoreCourses";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import { serverFetch } from "@/lib/fetch";
import {
  faHexagonNodes,
  faClipboardQuestion,
  faCode,
  faBook,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse all courses",
};
// Main Page
export default async function Page({
  params,
}: {
  params: Promise<{ videoID: string }>;
}) {
  // Get the Vide Id
  const { videoID } = await params; // Get the video params
  const res = await serverFetch(`/videos/${videoID}`); // call the video details
  const { data } = await res.json(); // destructure the data
  const last_pause = await serverFetch(
    `/user-videos/users/3/videos/${data.id}`,
  );
  const content = await last_pause.json();
  console.log(content)
  return (
    <main className="px-1 md:px-20 py-5">
      <section className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-4">
          <CourseTitle title={data.title} />
          <div className="px-1 py-8">
            <h1 className="text-2xl font-semibold">
              {" "}
              <FontAwesomeIcon icon={faCirclePlay} size="1x" /> Video
            </h1>
            <p className="py-2 px-10 text-gray-800 text-md">{data.tldw}</p>
          </div>
          {/* Video section */}
          <section className="flex flex-col md:flex-row gap-3 py-3">
            {/* <CourseProgressUI /> */}
            <MyPlayer
              src={data.video_url}
              // last_stop={4}
              // last_stop={content.data.last_paused}
              last_stop={content.data ? content.data.last_paused : 0}
              // last_stop={content.data ? Number(content.data.last_paused) : 0}
            />
          </section>
          {/* Code Tabe */}
          {data?.codes ? (
            <CourseTabs
              type="code"
              title={"Code"}
              icon={faCode}
              content={data?.codes?.code}
            />
          ) : (
            ""
          )}
          {/* Interactive */}
          <CourseTabs
            type="interactive"
            title={"Interactive Mode"}
            icon={faBook}
            content={"demo"}
          />
          {/* Quiz Tab */}
          <CourseTabs
            type="tyk"
            title={"Test Your Knowledge"}
            icon={faClipboardQuestion}
            content={data.title}
          />
          {/* Rambling Tab */}
          <CourseTabs
            type="rambling"
            title={"Umer's Rambling"}
            icon={faHexagonNodes}
            content={data.title}
          />

          {/* <iframe
                        src="http://localhost:3001"
                        className="w-full h-screen border-0"
                        allow="accelerometer; gyroscope"
                    /> */}
          <section className="my-10">
            <MoreCourses />
          </section>
        </div>
        <aside
          className="md:flex-2 bg-slate-900 rounded-xl"
          style={{ backgroundColor: "#000033" }}
        >
          {/* <TopicProgressTracking/> */}
          <CourseNodeLink />
        </aside>
      </section>
    </main>
  );
}
