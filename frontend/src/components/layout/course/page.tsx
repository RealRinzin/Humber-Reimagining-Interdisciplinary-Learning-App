import CourseNodeLink from "@/components/features/course/CourseNodeLinks";
import CourseProgressUI from "@/components/features/course/CourseProgressUI";
import CourseTabs from "@/components/features/course/CourseTabs";
import CourseTitle from "@/components/features/course/CourseTitle";
import CourseVideo from "@/components/features/course/CourseVideo";
import TopicProgressTracking from "@/components/features/course/TopicProgressTracking";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function VideoPage() {
  return (
    <section className="flex flex-col md:flex-row gap-4">
      <div className="md:flex-[4]"></div>
      <aside
        className="md:flex-[2] bg-slate-900"
        style={{ backgroundColor: "#000033" }}
      >
        {/* <TopicProgressTracking/> */}
      </aside>
    </section>
  );
}
