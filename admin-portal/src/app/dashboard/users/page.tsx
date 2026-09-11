import { Suspense } from 'react'
import { serverFetch } from '@/hooks/server/useServer'

export default function UserPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading topics...</div>}>
        <UserList />
      </Suspense>
    </div>
  )
}

async function UserList() {
  const res = await serverFetch('/users')
  console.log(res)
  return <div>page</div>
}