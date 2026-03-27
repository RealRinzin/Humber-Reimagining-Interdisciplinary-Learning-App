
import dynamic from 'next/dynamic';

// const PivotScene = dynamic(() => import('@/components/ui/interactive'), { ssr: false });
// const PivotScene = dynamic(() => import('@/components/ui/PivotScene'), { ssr: false });


// Must be dynamically imported (no SSR) — Three.js needs the browser
import VideoPage from '@/components/layout/course/page'
// import PivotScene from '@/components/ui/interactive'
// import InteractivePlayer from '@/components/ui/interactive'
import LoginPage from '@/components/ui/loginPage'
import useUsers from '@/hooks/user/useUsers'
import { cookies } from 'next/headers';
export default async function CoursePage() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('cookie')
  console.log(theme);
  // const data = await useUsers();
  // console.log(data);
  return (
    <>
      <main className="px-1 md:px-20 py-5">
        <LoginPage />
        {/* <iframe
          src="http://localhost:3001"
          className="w-full h-screen border-0"
          allow="accelerometer; gyroscope"
        /> */}
      </main>
    </>
  )
}

