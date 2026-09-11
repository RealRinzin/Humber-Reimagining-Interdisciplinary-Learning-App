import { Suspense } from 'react'
import { serverFetch } from '@/hooks/server/useServer'

export default function CodePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading topics...</div>}>
        <CodeList />
      </Suspense>
    </div>
  )
}

async function CodeList() {
  const res = await serverFetch('/codes')
  console.log(res)
  return <div>page</div>
}