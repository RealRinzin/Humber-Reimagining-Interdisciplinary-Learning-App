import { Suspense } from 'react'
import { serverFetch } from '@/hooks/server/useServer'

export default function TopicsPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading topics...</div>}>
        <TopicsList />
      </Suspense>
    </div>
  )
}

async function TopicsList() {
  const res = await serverFetch('/topics')
  console.log(res)
  return <div>page</div>
}