"use client"

import { useEffect, useRef } from "react"

export function DigitalDNAHelix() {
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

    interface DNAPoint {
      x: number
      y: number
      angle: number
      radius: number
      speed: number
      color: string
      opacity: number
    }

    const helixPoints: DNAPoint[] = []
    const numHelixes = 3
    const pointsPerHelix = 50

    // Create DNA helix points
    for (let h = 0; h < numHelixes; h++) {
      for (let i = 0; i < pointsPerHelix; i++) {
        helixPoints.push({
          x: (canvas.width / numHelixes) * h + canvas.width / (numHelixes * 2),
          y: (canvas.height / pointsPerHelix) * i,
          angle: i * 0.3 + (h * Math.PI * 2) / numHelixes,
          radius: 30 + h * 10,
          speed: 0.02 + h * 0.01,
          color: h === 0 ? "#00ffff" : h === 1 ? "#ff00ff" : "#ffff00",
          opacity: 0.6 + Math.random() * 0.4,
        })
      }
    }

    let time = 0

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      helixPoints.forEach((point, index) => {
        // Update helix rotation
        point.angle += point.speed

        // Calculate helix position
        const helixX = point.x + Math.cos(point.angle + time) * point.radius
        const helixY = point.y + Math.sin(time * 0.5 + index * 0.1) * 10

        // Draw connection lines between nearby points
        helixPoints.forEach((otherPoint, otherIndex) => {
          if (otherIndex !== index && Math.abs(otherIndex - index) < 3) {
            const otherHelixX = otherPoint.x + Math.cos(otherPoint.angle + time) * otherPoint.radius
            const otherHelixY = otherPoint.y + Math.sin(time * 0.5 + otherIndex * 0.1) * 10

            const distance = Math.sqrt((helixX - otherHelixX) ** 2 + (helixY - otherHelixY) ** 2)
            if (distance < 100) {
              ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 * (1 - distance / 100)})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(helixX, helixY)
              ctx.lineTo(otherHelixX, otherHelixY)
              ctx.stroke()
            }
          }
        })

        // Draw the point
        ctx.save()
        ctx.globalAlpha = point.opacity
        ctx.fillStyle = point.color
        ctx.shadowColor = point.color
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(helixX, helixY, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />
}
