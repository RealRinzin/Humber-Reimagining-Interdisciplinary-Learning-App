import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import CourseProgressUI from "@/components/features/course/CourseProgressUI";
import CourseTabs from "@/components/features/course/CourseTabs";
import CourseTitle from "@/components/features/course/CourseTitle";
import CourseVideo from "@/components/features/course/CourseVideo";
import MoreCourses from "@/components/features/course/MoreCourses";
import { MyPlayer } from "@/components/ui/video/VideoPlayer";
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/fetch";
import {
  faAlignLeft,
  faHexagonNodes,
  faClipboardQuestion,
  faCode,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

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
  const { data } = await res.json();
  const last_pause = await serverFetch(`/user-videos/users/4/videos/${data.id}`);
  const content = await last_pause.json();
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
              last_stop={content.data ? content.data.last_paused : 0}
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
