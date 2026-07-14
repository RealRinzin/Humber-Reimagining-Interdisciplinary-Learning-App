import React from 'react'

export default function TextInput() {
  return (
    <>
    <input type='text' value="test" onChange={()=>{console.log("this is file")}}/>
    </>
  )
}
