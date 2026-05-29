'use client'
import React, { useState } from 'react'

export default function Test() {
  const [onBoardState ,setOnBoardState] = useState(
    {
      userRegister:{
        username:'',
        password:'',
        component:"",
        status:true,
      },

    }
  )
  return (
    <div>page</div>
  )
}
