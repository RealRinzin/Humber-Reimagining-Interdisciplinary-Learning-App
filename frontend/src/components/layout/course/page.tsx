import CourseProgressUI from '@/components/features/course/CourseProgressUI'
import CourseTabs from '@/components/features/course/CourseTabs'
import CourseTitle from '@/components/features/course/CourseTitle'
import CourseVideo from '@/components/features/course/CourseVideo'

export default function VideoPage() {
    return (
        <section className="flex flex-col md:flex-row">
            <div className="md:flex-[4]">
                <CourseTitle />
                {/* Video section */}
                <section className='flex gap-3 p-2'>
                    <CourseProgressUI />
                    <CourseVideo />
                </section>
                {/* Tabs */}
                <CourseTabs title={"Too Long Did Not watch"}/>
                {/* Tabs */}
                <CourseTabs title={"Apply Your Knowledge"}/>
                {/* Tabs */}
                <CourseTabs title={"Test Your knowledge"}/>
                {/* Tabs */}
                <CourseTabs title={"Umer's Ramblings"} />
                {/* Tabs */}
                <CourseTabs title={"Code"} />
                {/* Tabs */}
                <CourseTabs title={"Resources"} />
                {/* Tabs */}
                <CourseTabs title={"Whats next?"} />
            </div>
            <aside className="md:flex-[2]">
                Progress links
            </aside>

        </section>
    )
}
