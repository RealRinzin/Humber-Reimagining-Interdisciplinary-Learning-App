import CourseProgressUI from '@/components/features/course/CourseProgressUI'
import CourseTabs from '@/components/features/course/CourseTabs'
import CourseTitle from '@/components/features/course/CourseTitle'
import CourseVideo from '@/components/features/course/CourseVideo'
import TopicProgressTracking from '@/components/features/course/TopicProgressTracking'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function VideoPage() {
    return (
        <section className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-[4]">
                <CourseTitle />
                {/* Video section */}
                <section className='flex gap-3 py-3'>
                    <CourseProgressUI />
                    <CourseVideo />
                </section>
                {/* Tabs */}
                <CourseTabs title={"Too Long Did Not watch"} status={true}/>
                {/* Tabs */}
                <CourseTabs title={"Apply Your Knowledge"} status={false}/>
                {/* Tabs */}
                <CourseTabs title={"Test Your knowledge"} status={true}/>
                {/* Tabs */}
                <CourseTabs title={"Umer's Ramblings"}  status={false}/>
                {/* Tabs */}
                <CourseTabs title={"Code"} status={true} />
                {/* Tabs */}
                <CourseTabs title={"Resources"}  status={false}/>
                {/* Tabs */}
                <CourseTabs title={"Whats next?"} status={true}/>
            </div>
            <aside className="md:flex-[2] bg-slate-900">
                <TopicProgressTracking/>
            </aside>

        </section>
    )
}
