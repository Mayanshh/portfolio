// app/page.tsx or pages/index.tsx
'use client'

import Scene3D from '@/components/Model'

export default function Home() {
  return (
    <main className="relative w-full min-h-[200vh] bg-white">
      <Scene3D />
    </main>
  )
}