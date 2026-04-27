import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import CourseProgressUI from "@/components/features/course/CourseProgressUI";
import CourseTabs from "@/components/features/course/CourseTabs";
import CourseTitle from "@/components/features/course/CourseTitle";
import CourseVideo from "@/components/features/course/CourseVideo";
import MoreCourses from "@/components/features/course/MoreCourses";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import timeToDigit from "@/utils/timeToDigit";
import { notFound } from "next/navigation";
import {
  faAlignLeft,
  faHexagonNodes,
  faClipboardQuestion,
  faCode,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { serverFetch } from "@/lib/fetch";
// Get the Video
async function getVideos({ videoID }: { videoID: string }) {
  // const res = await fetch(`${process.env.API_BASE_URL}/videos/intro-to-space`, {
  const res = await fetch(`${process.env.API_BASE_URL}/videos/${videoID}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Failed to fetch videos");
  }
  return res.json();
}
// lastWatchRecord
/**
 * 
 * @param param0 
 * @returns 
 * 
 */
async function lastWatchRecord({ id }: { id: number }) {
  const res = await fetch(`${process.env.API_BASE_URL}/user-videos/users/{me}/videos/`, {
    // method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Failed to fetch videos");
  }
  return res.json();
}

// Main Page
export default async function Page({
params,
}: {
  params: Promise<{ videoID: string }>;
}) {
  // Get the Vide Id
  const { videoID } = await params;
  // console.log(params)
    const res = await serverFetch(`/videos/${videoID}`);
    const {data} = await res.json();
    console.log(data)
  // console.log(check);
  // const { data } = await getVideos({ videoID });

  // The 
  const id = data.id;
//   const watch = await lastWatchRecord({ id });
  return (
    <main className="px-1 md:px-20 py-5">
      <section className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-4">
          {/* {result} */}
          <CourseTitle title={data.title} />
          {/* Video section */}
          <section className="flex flex-col md:flex-row gap-3 py-3">
            {/* <CourseProgressUI /> */}
            <MyPlayer
              src={data.video_url}
            //   last_stop={
            //     !watch.data ? 0 : timeToDigit({ time: watch.data.watch_minute })
            //   }
            last_stop={1}
            />
          </section>
          {/* Tabs */}
          <CourseTabs
            type="tldnw"
            title={"Too Long Did Not watch"}
            icon={faAlignLeft}
            content={data.title}
          />
          {/* Knowledge */}
          <CourseTabs
            type="tyk"
            title={"Test Your Knowledge"}
            icon={faClipboardQuestion}
            content={data.title}
          />
          {/* Tabs */}
          <CourseTabs
            type="rambling"
            title={"Umer's Rambling"}
            icon={faHexagonNodes}
            content={data.title}
          />
          {/* Tabs */}
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
          {/* Tabs */}

          <CourseTabs
            type="interactive"
            title={"Interactive Mode"}
            icon={faBook}
            content={"demo"}
          />
          {/* Tabs */}
          <CourseTabs
            type="resources"
            title={"Resources"}
            icon={faBook}
            content={data.title}
          />
          {/* <iframe
                        src="http://localhost:3001"
                        className="w-full h-screen border-0"
                        allow="accelerometer; gyroscope"
                    /> */}
          <section className="my-10">
            {/* <MoreCourses /> */}
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
