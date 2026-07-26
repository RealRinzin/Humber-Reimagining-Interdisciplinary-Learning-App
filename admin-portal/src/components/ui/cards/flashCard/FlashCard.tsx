import React from 'react'

export default function FlashCard() {
  return (
    <div className='flex flex-col gap-4 items-center px-6 py-6 rounded-md bg-gray-200 border border-gray-300 text-sm'>
        <p className='text-sm text-gray-600'>Question</p>
        <p className='text-gray-700 border-y-2 border-gray-300 py-6'>Write yoasdfadsfasdfasdfadsfsur question here</p>
        <p className='text-sm text-gray-600'>Click to Flip!</p>
    </div>
  )
}
