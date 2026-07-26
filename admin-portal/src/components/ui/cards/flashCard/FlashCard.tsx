import React from 'react'

export default function FlashCard() {
  return (
    <div className='flex flex-col gap-6 items-center px-4 py-6 rounded-md bg-gray-200 border border-gray-300'>
        <p className='text-sm text-gray-600'>Question</p>
        <p className='text-gray-700 text-lg border-y-2 border-gray-300 py-6'>Write yoasdfadsfasdfasdfadsfsur question here</p>
        <p className='text-sm text-gray-600'>Click to Flip!</p>
    </div>
  )
}
