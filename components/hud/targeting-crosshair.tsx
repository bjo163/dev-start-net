"use client"

import { useEffect, useState } from "react"

export function TargetingCrosshair() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Check if desktop on client side
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024)

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => setIsActive(false)

    // Always track mouse position on desktop
    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
      window.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDesktop])

  // Don't render on mobile
  if (!isDesktop) {
    return null
  }

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75"
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={`relative w-8 h-8 ${isActive ? "scale-110" : "scale-100"} transition-transform duration-75`}>
        {/* Crosshair */}
        <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-cyan-400 transform -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-cyan-400 transform -translate-x-1/2" />
        <div className="absolute left-0 top-1/2 w-2 h-0.5 bg-cyan-400 transform -translate-y-1/2" />
        <div className="absolute right-0 top-1/2 w-2 h-0.5 bg-cyan-400 transform -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

        {/* Glow effect */}
        <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}
