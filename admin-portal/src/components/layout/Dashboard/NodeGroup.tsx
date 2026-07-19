import NodeCard from '@/components/ui/cards/nodes/NodeCard'
import React from 'react'

function NodeGroup({link}:any) {
  return (
    <div>
        <h2>{link}</h2>
        <div className='grid grid-cols-3 gap-4'>
            {Array.from({ length: 3 }).map((_, index) => (
            <NodeCard key={index}/>
            ))}
        </div>
    </div>
  )
}

export default NodeGroup