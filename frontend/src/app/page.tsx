
import VideoPage from '@/components/layout/course/page'
import useUsers from '@/hooks/user/useUsers'
export default  async function CoursePage() {
  const data = await useUsers();
  console.log(data);
  return (
    <>
    <main className="px-1 md:px-20 py-5">

<h1>Home Page</h1>
    </main>
    </>
  )
}

