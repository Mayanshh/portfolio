'use client'

import { useEffect, useRef } from 'react'

interface Props {
  videoSrc: string
  width?: number
  height?: number
}

export default function CursorVideoReveal({
  videoSrc,
  width = 260,
  height = 150
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const current = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    const rect = rectRef.current
    const video = videoRef.current
    if (!container || !rect || !video) return

    const enter = () => {
      rect.style.opacity = '1'
      video.play()
    }

    const leave = () => {
      rect.style.opacity = '0'
      video.pause()
    }

    const move = (e: MouseEvent) => {
      const bounds = container.getBoundingClientRect()
      target.current.x = e.clientX - bounds.left
      target.current.y = e.clientY - bounds.top
    }

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08
      current.current.y += (target.current.y - current.current.y) * 0.08

      rect.style.transform = `translate3d(
        ${current.current.x - width / 2}px,
        ${current.current.y - height / 2}px,
        0
      )`

      requestAnimationFrame(animate)
    }

    container.addEventListener('mouseenter', enter)
    container.addEventListener('mouseleave', leave)
    container.addEventListener('mousemove', move)

    animate()

    return () => {
      container.removeEventListener('mouseenter', enter)
      container.removeEventListener('mouseleave', leave)
      container.removeEventListener('mousemove', move)
    }
  }, [width, height])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        ref={rectRef}
        className="absolute opacity-0 pointer-events-none rounded-xl overflow-hidden will-change-transform transition-opacity duration-300"
        style={{ width, height }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}