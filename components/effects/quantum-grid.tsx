"use client"

import { useEffect, useRef } from "react"

export function QuantumGrid() {
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

    interface GridNode {
      x: number
      y: number
      energy: number
      connections: { x: number; y: number; strength: number }[]
    }

    const gridSize = 80
    const nodes: GridNode[] = []

    // Create grid nodes
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        nodes.push({
          x,
          y,
          energy: Math.random() * 0.3,
          connections: [],
        })
      }
    }

    // Create connections between nearby nodes
    nodes.forEach((node) => {
      nodes.forEach((otherNode) => {
        const distance = Math.sqrt((node.x - otherNode.x) ** 2 + (node.y - otherNode.y) ** 2)
        if (distance < gridSize * 1.5 && distance > 0) {
          node.connections.push({
            x: otherNode.x,
            y: otherNode.y,
            strength: Math.random() * 0.2,
          })
        }
      })
    })

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.005

      nodes.forEach((node) => {
        // Update energy with wave pattern
        node.energy = 0.1 + Math.sin(time * 2 + node.x * 0.01 + node.y * 0.01) * 0.1

        // Draw connections
        node.connections.forEach((connection) => {
          const opacity = node.energy * connection.strength * 0.3
          if (opacity > 0.01) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connection.x, connection.y)
            ctx.stroke()
          }
        })

        // Draw node
        if (node.energy > 0.15) {
          ctx.save()
          ctx.globalAlpha = node.energy
          ctx.fillStyle = "#00ffff"
          ctx.shadowColor = "#00ffff"
          ctx.shadowBlur = 3
          ctx.beginPath()
          ctx.arc(node.x, node.y, 1, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-20" />
}
