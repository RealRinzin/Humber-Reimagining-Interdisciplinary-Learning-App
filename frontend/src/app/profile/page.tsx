'use client';
import React from 'react'
import dynamic from 'next/dynamic';
const PivotScene = dynamic(() => import('@/components/ui/PivotScene'), { ssr: false });
export default function ProfilePage() {
  return (
    <div>
      <PivotScene />

    </div>
  )
}
