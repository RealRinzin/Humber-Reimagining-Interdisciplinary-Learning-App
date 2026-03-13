import { faArrowRight, faCircleArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function MoreCourses() {
  return (
    <>
      <h2 className='text-xl font-bold text-gray-600 '><FontAwesomeIcon icon={faCircleArrowRight} size="1x" className='pr-2' />What is next ?</h2>
      <p className='py-4 text-slate-500'>Ready to learn more? Check out these suggested modules</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...Array(4)].map((_, i) => (
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
        ))}

      </div>
    </>
  )
}
