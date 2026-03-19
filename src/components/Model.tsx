'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
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
  const [scale, setScale] = useState(1)

  // Adjust model scale based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(0.6) // Smaller scale for mobile
      } else if (window.innerWidth < 1024) {
        setScale(0.8) // Tablet
      } else {
        setScale(1)   // Desktop
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <primitive object={scene} scale={scale} />
}

function CameraRig({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement> }) {
  const scrollGroup = useRef<THREE.Group>(null!)
  const mouseGroup = useRef<THREE.Group>(null!)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const { camera } = useThree()

  // Adjust Camera Position for Mobile
  useEffect(() => {
    const updateCam = () => {
      if (window.innerWidth < 768) {
        camera.position.z = 7 // Move camera back on mobile to fit model
      } else {
        camera.position.z = 5
      }
      camera.updateProjectionMatrix()
    }
    updateCam()
    window.addEventListener('resize', updateCam)
    return () => window.removeEventListener('resize', updateCam)
  }, [camera])

  useGSAP(() => {
    if (!scrollGroup.current) return

    gsap.set(scrollGroup.current.rotation, { x: Math.PI / 2 })

    gsap.to(scrollGroup.current.rotation, {
      x: 0,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=800vh", 
        scrub: 1.5,
      }
    })
  }, { dependencies: [triggerRef] })

  useFrame((state) => {
    const { mouse } = state
    mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, mouse.x * 0.4, 0.1)
    mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, mouse.y * 0.4, 0.1)

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
    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: "+=1200vh",
      pinSpacing: true,
    })

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

      {/* Responsive Link Overlay */}
      <div ref={linkRef} className="absolute top-1/2 left-1/2 pointer-events-none z-10 w-full flex justify-center">
        <div className="pointer-events-auto scale-75 md:scale-100">
          <CustomLinkBracket name="View 3D Works" url="https://mayanshh.github.io/MayanshPortfolio/" />
        </div>
      </div>
    </div>
  )
}