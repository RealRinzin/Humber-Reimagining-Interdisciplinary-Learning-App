import React from 'react'
interface inputType {
  value:string
}
export default function TextInput({value}:inputType) {
  console.log(value)
  return (
    <>
    <input type='text' className='border border-gray-500 rounded-md p-1' value={value} onChange={()=>{console.log("this is file")}}/>
    </>
  )
}
