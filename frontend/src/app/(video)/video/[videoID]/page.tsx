import CourseNodeLink from '@/components/features/course/CourseNodeLinks'
import CourseProgressUI from '@/components/features/course/CourseProgressUI'
import CourseTabs from '@/components/features/course/CourseTabs'
import CourseTitle from '@/components/features/course/CourseTitle'
import CourseVideo from '@/components/features/course/CourseVideo'
import MoreCourses from '@/components/features/course/MoreCourses'
import { faAlignLeft, faHexagonNodes, faClipboardQuestion, faCode, faBook } from '@fortawesome/free-solid-svg-icons'

async function getVideos() {
    const res = await fetch(`${process.env.API_BASE_URL}/videos/intro-to-space`, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
    })
    if (!res.ok) {
        throw new Error("Failed to fetch videos")
    }
    return res.json()
}
export default async function Page() {
    const { data } = await getVideos()
    return (
        <main className='px-1 md:px-40 py-5'>
            <section className="flex flex-col md:flex-row gap-4">
                <div className="md:flex-[4]">
                    <CourseTitle title={data.title} />
                    {/* Video section */}
                    <section className='flex flex-col md:flex-row gap-3 py-3'>
                        <CourseProgressUI />
                        <CourseVideo videoLink={data.video_url} />
                    </section>
                    {/* Tabs */}
                    <CourseTabs type="tldnw" title={"Too Long Did Not watch"} icon={faAlignLeft} content={data.title} />
                    {/* Knowledge */}
                    <CourseTabs type="tyk" title={"Test Your Knowledge"} icon={faClipboardQuestion} content={data.title} />
                    {/* Tabs */}
                    <CourseTabs type="rambling" title={"Umer's Rambling"} icon={faHexagonNodes} content={data.title} />
                    {/* Tabs */}
                    <CourseTabs type="code" title={"Code"} icon={faCode} content={data.codes.code} />
                    {/* Tabs */}
                    <CourseTabs type="resources" title={"Resources"} icon={faBook} content={data.title} />
                    <section className='my-10'>
                        <MoreCourses />
                    </section>
                </div>
                <aside className="md:flex-[2] bg-slate-900" style={{ 'backgroundColor': "#000033" }}>
                    {/* <TopicProgressTracking/> */}
                    <CourseNodeLink />
                </aside>

            </section >

        </main>

    )
}
