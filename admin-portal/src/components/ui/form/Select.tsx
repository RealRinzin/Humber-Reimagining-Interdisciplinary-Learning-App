import React from 'react'

export default function Select({title}:any) {
  return (
    <select className='border border-gray-300 bg-gray-200 text-gray-500 px-4 py-1  rounded-md w-50 text-xs'>
        <option value=""> {title}</option>
        <option value=""> Translation</option>
        <option value=""> Metric</option>
    </select>
  )
}
