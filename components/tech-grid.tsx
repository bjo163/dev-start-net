"use client"

import { useEffect, useRef } from "react"

export function TechGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Grid properties
    const gridSize = 50
    const dotRadius = 2

    // Animation properties
    let animationFrameId: number

    // Draw the grid
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid dots
      ctx.fillStyle = "rgba(59, 130, 246, 0.3)"

      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          // Pulse effect
          const time = Date.now() / 1000
          const pulse = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5

          ctx.beginPath()
          ctx.arc(x, y, dotRadius * pulse, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw connecting lines for nearby dots
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          // Horizontal lines
          if (x + gridSize < canvas.width) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + gridSize, y)
            ctx.stroke()
          }

          // Vertical lines
          if (y + gridSize < canvas.height) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x, y + gridSize)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-30" />
}
