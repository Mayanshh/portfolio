'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { CustomLinkBracket } from './CustomLink'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

function Model() {
  const { scene } = useGLTF('/models/3Dmodel.glb')
  return <primitive object={scene} scale={1} />
}

function CameraRig({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement> }) {
  const scrollGroup = useRef<THREE.Group>(null!)
  const mouseGroup = useRef<THREE.Group>(null!)
  const mouseTarget = useRef({ x: 0, y: 0 })

  // 1. SCROLL ROTATION (X-AXIS)
  useGSAP(() => {
    if (!scrollGroup.current) return

    // Starting position: Rotated 90 degrees on X (tilted away or down)
    gsap.set(scrollGroup.current.rotation, { x: Math.PI / 2 })

    gsap.to(scrollGroup.current.rotation, {
      x: 0, // Animates to flat/upright
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=800vh", // Adjusted for a tighter feel than 1600
        scrub: 1.5,     // Adding a number (1.5) makes the "catch up" smoother than 'true'
      }
    })
  }, { dependencies: [triggerRef] })

  // 2. MOUSE FOLLOW (PARALLAX)
  useFrame((state) => {
    const { mouse } = state
    
    // Smoothly interpolate mouse targets
    mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, mouse.x * 0.4, 0.1)
    mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, mouse.y * 0.4, 0.1)

    // Apply parallax to the INNER group
    // This allows the model to look at the cursor while the parent handles the scroll flip
    mouseGroup.current.rotation.y = mouseTarget.current.x
    mouseGroup.current.rotation.x = -mouseTarget.current.y
  })

  return (
    <group ref={scrollGroup}>
      <group ref={mouseGroup}>
        <Model />
      </group>
    </group>
  )
}

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const linkRef = useRef<HTMLDivElement>(null!)

  useGSAP(() => {
    // 3. PINNING
    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: "+=1200vh",
      pinSpacing: true,
    })

    // 4. LINK MOUSE FOLLOW (SMOOTH INTERPOLATION)
    gsap.set(linkRef.current, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(linkRef.current, "x", { duration: 0.6, ease: "power2.out" })
    const yTo = gsap.quickTo(linkRef.current, "y", { duration: 0.6, ease: "power2.out" })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      xTo(x * 0.1)
      yTo(y * 0.1)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative w-full h-svh bg-white overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <CameraRig triggerRef={containerRef} />
        </Suspense>
      </Canvas>

      <div ref={linkRef} className="absolute top-1/2 left-1/2 pointer-events-none z-10">
        <div className="pointer-events-auto">
          <CustomLinkBracket name="View 3D Works" url="/works/3d" />
        </div>
      </div>
    </div>
  )
}