"use client"

import { useEffect, useRef } from "react"

export function GeometricField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    interface GeometricShape {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
      type: "triangle" | "square" | "hexagon"
    }

    const shapes: GeometricShape[] = []
    const maxShapes = 8

    // Create shapes
    for (let i = 0; i < maxShapes; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: 0.1 + Math.random() * 0.1,
        type: ["triangle", "square", "hexagon"][Math.floor(Math.random() * 3)] as "triangle" | "square" | "hexagon",
      })
    }

    const drawTriangle = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y - size)
      ctx.lineTo(x - size * 0.866, y + size * 0.5)
      ctx.lineTo(x + size * 0.866, y + size * 0.5)
      ctx.closePath()
    }

    const drawSquare = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.rect(x - size / 2, y - size / 2, size, size)
    }

    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed

        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.strokeStyle = `rgba(0, 255, 255, ${shape.opacity})`
        ctx.lineWidth = 1
        ctx.shadowColor = "#00ffff"
        ctx.shadowBlur = 2

        switch (shape.type) {
          case "triangle":
            drawTriangle(0, 0, shape.size)
            break
          case "square":
            drawSquare(0, 0, shape.size)
            break
          case "hexagon":
            drawHexagon(0, 0, shape.size)
            break
        }

        ctx.stroke()
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-15" />
}
