import { faArrowRight, faCircleArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
async function getAllVideos() {
  const res = await fetch(`${process.env.API_BASE_URL}/videos`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch videos")
  }
  return res.json()
}
export default async function MoreCourses() {
  const videos = await getAllVideos();
  return (

    <>
      <h2 className='text-xl font-bold text-gray-600 '><FontAwesomeIcon icon={faCircleArrowRight} size="1x" className='pr-2' />What is next ?</h2>
      <p className='py-4 text-slate-500'>Ready to learn more? Check out these suggested modules</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          videos.map((video: any, index: number) => (
            <div className='my-2' key={index}>
              <div className='relative'>
                <Link href={`/video/${video.slug}`}>
                  <Image
                    src={video.thumbnail}
                    alt="Description"
                    width={1200}
                    height={600}
                    sizes="100vw"
                    className="w-full h-[200px] object-cover rounded-2xl"
                  />
                  {/* <img
                    src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                    alt=""
                    className='rounded-md'
                  /> */}
                </Link>
                <span className="absolute right-2 bottom-2 bg-gray-800 px-2 py-1 opacity-80  rounded-xl"><FontAwesomeIcon icon={faPlay} size="1x" className='text-white' /></span>
              </div>
              <h3 className='py-2 text-lg text-slate-600 font-bold'>{video.title}</h3>
            </div>
          ))
        }
        {/* {[...Array(4)].map((_, i) => (
          <div className='' key={i}>
            <div className='relative'>
              <img
                src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt=""
                className='rounded-md'
              />
              <span className="absolute right-2 bottom-2 bg-gray-800 px-2 py-1 opacity-80  rounded-xl"><FontAwesomeIcon icon={faPlay} size="1x" className='text-white' /></span>
            </div>
            <h3 className='py-2 text-lg text-slate-600 font-bold'>Translation</h3>
          </div>
        ))} */}

      </div>
    </>
  )
}
