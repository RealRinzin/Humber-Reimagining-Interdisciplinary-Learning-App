
'use client'
import VideoPage from '@/components/layout/course/page'
import LoginPage from '@/components/ui/loginPage';
import dynamic from 'next/dynamic';
const PivotScene = dynamic(() => import('@/components/ui/PivotScene'), { ssr: false });
export default function CoursePage() {
  return (
    <>
      <main className="px-1 md:px-20 py-5">
        <LoginPage />
        {/* <PivotScene /> */}
      </main>
    </>
  )
}

