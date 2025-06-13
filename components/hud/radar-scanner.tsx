"use client"

import { useState, useEffect, useRef } from "react"
import { useIdleDetection } from "@/hooks/use-idle-detection"

export function RadarScanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const isIdle = useIdleDetection(10000) // 10 seconds
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = 100
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const maxRadius = 40
    let sweepAngle = 0
    let time = 0

    // Blip data
    const blips = [
      { angle: 0.5, radius: 25, intensity: 1 },
      { angle: 2.1, radius: 35, intensity: 0.8 },
      { angle: 4.2, radius: 15, intensity: 0.6 },
      { angle: 1.8, radius: 30, intensity: 0.9 },
    ]

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, size, size)

      time += 0.02

      // Draw radar circles
      ctx.strokeStyle = "rgba(0, 255, 255, 0.3)"
      ctx.lineWidth = 1
      for (let r = 10; r <= maxRadius; r += 10) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw crosshairs
      ctx.strokeStyle = "rgba(0, 255, 255, 0.4)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(centerX - maxRadius, centerY)
      ctx.lineTo(centerX + maxRadius, centerY)
      ctx.moveTo(centerX, centerY - maxRadius)
      ctx.lineTo(centerX, centerY + maxRadius)
      ctx.stroke()

      // Draw sweep line with gradient
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(sweepAngle)

      // Create sweep gradient
      const sweepGradient = ctx.createLinearGradient(0, 0, maxRadius, 0)
      sweepGradient.addColorStop(0, "rgba(0, 255, 255, 0.8)")
      sweepGradient.addColorStop(0.7, "rgba(0, 255, 255, 0.3)")
      sweepGradient.addColorStop(1, "rgba(0, 255, 255, 0)")

      ctx.fillStyle = sweepGradient
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, maxRadius, -Math.PI / 12, Math.PI / 12)
      ctx.closePath()
      ctx.fill()

      // Draw sweep line
      ctx.strokeStyle = "rgba(0, 255, 255, 1)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(maxRadius, 0)
      ctx.stroke()

      ctx.restore()

      // Draw blips with fade effect
      blips.forEach((blip) => {
        const blipAngle = blip.angle + time * 0.1
        const blipX = centerX + Math.cos(blipAngle) * blip.radius
        const blipY = centerY + Math.sin(blipAngle) * blip.radius

        // Calculate distance from sweep line
        const angleDiff = Math.abs(((sweepAngle - blipAngle) % (Math.PI * 2)) - Math.PI)
        const sweepDistance = Math.min(angleDiff, Math.PI * 2 - angleDiff)
        const fadeDistance = Math.PI / 6 // Fade distance

        let opacity = blip.intensity
        if (sweepDistance < fadeDistance) {
          opacity = blip.intensity * (1 - sweepDistance / fadeDistance)
        } else {
          opacity = blip.intensity * 0.2 // Dim when not recently swept
        }

        if (opacity > 0.1) {
          // Draw blip glow
          ctx.save()
          ctx.globalAlpha = opacity * 0.5
          ctx.fillStyle = "#00ffff"
          ctx.shadowColor = "#00ffff"
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(blipX, blipY, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          // Draw blip core
          ctx.save()
          ctx.globalAlpha = opacity
          ctx.fillStyle = "#ffffff"
          ctx.beginPath()
          ctx.arc(blipX, blipY, 1.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      })

      // Draw center dot
      ctx.fillStyle = "#00ffff"
      ctx.shadowColor = "#00ffff"
      ctx.shadowBlur = 5
      ctx.beginPath()
      ctx.arc(centerX, centerY, 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      sweepAngle += 0.04
      if (sweepAngle > Math.PI * 2) sweepAngle = 0

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Don't render if not desktop
  if (!isDesktop) {
    return null
  }

  return (
    <div
      className={`fixed top-32 right-6 z-30 transition-all duration-500 ${
        isIdle ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <div className="bg-black/90 border-2 border-cyan-500/50 rounded-lg p-3 backdrop-blur-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="font-mono text-xs text-cyan-400">RADAR_SYS</div>
          <div className="font-mono text-xs text-cyan-500 opacity-60">[R1]</div>
        </div>

        {/* Canvas */}
        <canvas ref={canvasRef} width={100} height={100} className="block border border-cyan-500/20 bg-black/50" />

        {/* Footer */}
        <div className="mt-2 flex justify-between items-center">
          <div className="font-mono text-xs text-cyan-300 opacity-80">SCAN_ACTIVE</div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
