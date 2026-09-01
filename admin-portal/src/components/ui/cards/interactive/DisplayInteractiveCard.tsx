import { InteractiveDType } from '@/types/interactive.type'
import React from 'react'

export default function DisplayInteractiveCard<InteractiveDType>({interactives}:{interactives:InteractiveDType}) {
  console.log(interactives)
  return (
    <div>DisplayInteractiveCard</div>
  )
}
