
// 'use client'
import VideoPage from '@/components/layout/course/page'
import LoginPage from '@/components/ui/loginPage'
import useUsers from '@/hooks/user/useUsers'
export default function CoursePage() {
  // const data = await useUsers();
  // console.log(data);
  return (
    <>
      <main className="px-1 md:px-20 py-5">

        <LoginPage />
      </main>
    </>
  )
}

