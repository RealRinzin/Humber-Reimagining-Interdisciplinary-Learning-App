import CourseProgressUI from '@/components/features/course/CourseProgressUI'
import CourseTitle from '@/components/features/course/CourseTitle'
import CourseVideo from '@/components/features/course/CourseVideo'
import React from 'react'

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
                {/* Tabs */}
                {/* Tabs */}
                {/* Tabs */}
                {/* Tabs */}
            </div>
            <aside className="md:flex-[2]">
                Progress links
            </aside>

        </section>
    )
}
