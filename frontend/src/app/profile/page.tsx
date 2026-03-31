
import React from 'react'
export default function ProfilePage() {
  fetch('http://localhost:8000/api/v1/users/', {
    method: "GET",
    credentials: "include"
  }).then(res => res.json())
    .then(data => console.log(data))
  return (
    <div>
    </div>
  )
}
