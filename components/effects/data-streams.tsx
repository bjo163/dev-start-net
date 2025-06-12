"use client"

import { useEffect, useRef } from "react"

export function DataStreams() {
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

    interface DataPacket {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      trail: { x: number; y: number; opacity: number }[]
    }

    const packets: DataPacket[] = []
    const maxPackets = 15

    const createPacket = () => {
      const side = Math.floor(Math.random() * 4)
      let x, y, vx, vy

      switch (side) {
        case 0: // from left
          x = -10
          y = Math.random() * canvas.height
          vx = 1 + Math.random() * 2
          vy = (Math.random() - 0.5) * 0.5
          break
        case 1: // from right
          x = canvas.width + 10
          y = Math.random() * canvas.height
          vx = -(1 + Math.random() * 2)
          vy = (Math.random() - 0.5) * 0.5
          break
        case 2: // from top
          x = Math.random() * canvas.width
          y = -10
          vx = (Math.random() - 0.5) * 0.5
          vy = 1 + Math.random() * 2
          break
        default: // from bottom
          x = Math.random() * canvas.width
          y = canvas.height + 10
          vx = (Math.random() - 0.5) * 0.5
          vy = -(1 + Math.random() * 2)
          break
      }

      return {
        x,
        y,
        vx,
        vy,
        size: 2 + Math.random() * 3,
        opacity: 0.8,
        trail: [],
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create new packets
      if (packets.length < maxPackets && Math.random() < 0.02) {
        packets.push(createPacket())
      }

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i]

        // Add current position to trail
        packet.trail.push({ x: packet.x, y: packet.y, opacity: packet.opacity })
        if (packet.trail.length > 20) {
          packet.trail.shift()
        }

        // Update position
        packet.x += packet.vx
        packet.y += packet.vy

        // Fade out
        packet.opacity -= 0.003

        // Remove if out of bounds or faded
        if (
          packet.x < -50 ||
          packet.x > canvas.width + 50 ||
          packet.y < -50 ||
          packet.y > canvas.height + 50 ||
          packet.opacity <= 0
        ) {
          packets.splice(i, 1)
          continue
        }

        // Draw trail
        packet.trail.forEach((point, index) => {
          const trailOpacity = (point.opacity * index) / packet.trail.length
          if (trailOpacity > 0.01) {
            ctx.save()
            ctx.globalAlpha = trailOpacity * 0.5
            ctx.fillStyle = "#00ffff"
            ctx.beginPath()
            ctx.arc(point.x, point.y, packet.size * 0.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
        })

        // Draw packet
        ctx.save()
        ctx.globalAlpha = packet.opacity
        ctx.fillStyle = "#00ffff"
        ctx.shadowColor = "#00ffff"
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw packet core
        ctx.save()
        ctx.globalAlpha = packet.opacity
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, packet.size * 0.3, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-25" />
}
