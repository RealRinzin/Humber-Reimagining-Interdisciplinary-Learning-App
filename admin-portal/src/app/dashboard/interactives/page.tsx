import { Suspense } from 'react'
import { serverFetch } from '@/hooks/server/useServer'

export default function InteractivePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading topics...</div>}>
        <InteractiveList />
      </Suspense>
    </div>
  )
}

async function InteractiveList() {
  const res = await serverFetch('/interactives')
  console.log(res)
  return <div>page</div>
}