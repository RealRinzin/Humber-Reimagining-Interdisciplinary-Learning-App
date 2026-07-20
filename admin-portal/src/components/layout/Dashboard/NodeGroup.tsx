import NodeCard from '@/components/ui/cards/nodes/NodeCard'
import React from 'react'

function NodeGroup({color}:any) {
  return (
    <div className='my-6'>
        <h2 className='text-lg font-extrabold my-2 text-gray-600'>Group 1</h2>
        <div className='grid grid-cols-3 gap-6'>
            {Array.from({ length: 3 }).map((_, index) => (
            <NodeCard key={index} color={color}/>
            ))}
        </div>
    </div>
  )
}

export default NodeGroup