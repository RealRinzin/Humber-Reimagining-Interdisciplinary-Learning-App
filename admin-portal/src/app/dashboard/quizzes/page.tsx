import { Suspense } from 'react'
import { serverFetch } from '@/hooks/server/useServer'

export default function QuizPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading topics...</div>}>
        <QuizList />
      </Suspense>
    </div>
  )
}

async function QuizList() {
  const res = await serverFetch('/quizees')
  console.log(res)
  return <div>page</div>
}