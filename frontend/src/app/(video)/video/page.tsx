
import VideoPage from '@/components/layout/course/page'
import { serverPost } from '@/lib/fetch'
export default async function CoursePage() {
  const userVideo = await serverPost(`/user-videos/users/3/videos`,{
    video_id:1,
    last_paused:2,
    completed:false
  });
  console.log(await userVideo.json())
  return (
    <>
    <main className="px-1 md:px-40 py-5">
      {/* <VideoPage/> */}
      here
    </main>
    </>
  )
}

