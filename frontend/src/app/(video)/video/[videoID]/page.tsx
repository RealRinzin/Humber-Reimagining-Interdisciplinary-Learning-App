
import CourseNodeLink from '@/components/features/course/CourseNodeLinks'
import CourseProgressUI from '@/components/features/course/CourseProgressUI'
import CourseTabs from '@/components/features/course/CourseTabs'
import CourseTitle from '@/components/features/course/CourseTitle'
import CourseVideo from '@/components/features/course/CourseVideo'
import MoreCourses from '@/components/features/course/MoreCourses'
import { MyPlayer } from '@/components/ui/video/videoPlayer'
import timeToDigit from '@/utils/timeToDigit'
import { faAlignLeft, faHexagonNodes, faClipboardQuestion, faCode, faBook } from '@fortawesome/free-solid-svg-icons'
import { notFound } from 'next/navigation'

// Get the Video
async function getVideos({ videoID }: { videoID: string }) {
    // const res = await fetch(`${process.env.API_BASE_URL}/videos/intro-to-space`, {
    const res = await fetch(`${process.env.API_BASE_URL}/videos/${videoID}`, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
    })
    if (!res.ok) {
        if (res.status === 404) notFound();
        throw new Error("Failed to fetch videos")
    }
    return res.json()
}

// lastWatchRecord
async function lastWatchRecord({ id }: { id: number }) {
    const res = await fetch(`${process.env.API_BASE_URL}/user_videos/${id}`, {
        // method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
        },
    })
    if (!res.ok) {
        if (res.status === 404) notFound();
        throw new Error("Failed to fetch videos")
    }
    return res.json();
}

// Page Export here
export default async function Page({ params }: { params: Promise<{ videoID: string }> }) {
    const { videoID } = await params;

    const { data } = await getVideos({ videoID })
    const id = data.id;
    // console.log(id)
    const watch = await lastWatchRecord({ id });
    // const result = timeToDigit({ time: watch.data.watch_minute });
    // console.log(watch.data.watch_minute)
    return (
        <main className='px-1 md:px-20 py-5'>
            <section className="flex flex-col md:flex-row gap-4">
                <div className="md:flex-[4]">
                    {/* {result} */}
                    <CourseTitle title={data.title} />
                    {/* Video section */}
                    <section className='flex flex-col md:flex-row gap-3 py-3'>
                        {/* <CourseProgressUI /> */}
                        {/* <MyPlayer src={`${data.video_url}/#t=4`}  /> */}
                        <MyPlayer src={data.video_url} last_stop={!watch.data ? 0 : timeToDigit({ time: watch.data.watch_minute })} />
                        {/* <MyPlayer src={data.video_url} last_stop={9} /> */}
                        {/* <CourseVideo videoLink={data.video_url} last_watch="00:00:02" /> */}
                    </section>
                    {/* Tabs */}
                    <CourseTabs type="tldnw" title={"Too Long Did Not watch"} icon={faAlignLeft} content={data.title} />
                    {/* Knowledge */}
                    <CourseTabs type="tyk" title={"Test Your Knowledge"} icon={faClipboardQuestion} content={data.title} />
                    {/* Tabs */}
                    <CourseTabs type="rambling" title={"Umer's Rambling"} icon={faHexagonNodes} content={data.title} />
                    {/* Tabs */}
                    <CourseTabs type="code" title={"Code"} icon={faCode} content={data?.codes?.code} />
                    {/* Tabs */}
                    <CourseTabs type="resources" title={"Resources"} icon={faBook} content={data.title} />
                    <iframe
                        src="http://localhost:3001"
                        className="w-full h-screen border-0"
                        allow="accelerometer; gyroscope"
                    />
                    <section className='my-10'>
                        <MoreCourses />
                    </section>
                </div>
                <aside className="md:flex-[2] bg-slate-900 rounded-xl" style={{ 'backgroundColor': "#000033" }}>
                    {/* <TopicProgressTracking/> */}
                    <CourseNodeLink />
                </aside>

            </section >

        </main>

    )
}
