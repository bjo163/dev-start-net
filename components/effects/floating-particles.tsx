"use client"

import { useEffect, useRef } from "react"

export function NeuralNetwork() {
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

    interface Neuron {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      connections: number[]
      activity: number
      color: string
    }

    const neurons: Neuron[] = []
    const numNeurons = 80
    const colors = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"]

    // Create neurons
    for (let i = 0; i < numNeurons; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 4 + 2,
        connections: [],
        activity: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Create connections
    neurons.forEach((neuron, i) => {
      const numConnections = Math.floor(Math.random() * 4) + 1
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * neurons.length)
        if (targetIndex !== i && !neuron.connections.includes(targetIndex)) {
          neuron.connections.push(targetIndex)
        }
      }
    })

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      neurons.forEach((neuron, i) => {
        // Update position
        neuron.x += neuron.vx
        neuron.y += neuron.vy

        // Bounce off edges
        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1

        // Update activity
        neuron.activity += (Math.random() - 0.5) * 0.1
        neuron.activity = Math.max(0, Math.min(1, neuron.activity))

        // Draw connections
        neuron.connections.forEach((connectionIndex) => {
          const target = neurons[connectionIndex]
          if (target) {
            const distance = Math.sqrt((neuron.x - target.x) ** 2 + (neuron.y - target.y) ** 2)
            if (distance < 150) {
              const opacity = (1 - distance / 150) * neuron.activity * 0.5
              ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(neuron.x, neuron.y)
              ctx.lineTo(target.x, target.y)
              ctx.stroke()

              // Draw signal pulse
              if (neuron.activity > 0.7) {
                const pulseX = neuron.x + (target.x - neuron.x) * (neuron.activity - 0.7) * 3.33
                const pulseY = neuron.y + (target.y - neuron.y) * (neuron.activity - 0.7) * 3.33

                ctx.save()
                ctx.globalAlpha = neuron.activity
                ctx.fillStyle = neuron.color
                ctx.shadowColor = neuron.color
                ctx.shadowBlur = 5
                ctx.beginPath()
                ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
              }
            }
          }
        })

        // Draw neuron
        ctx.save()
        ctx.globalAlpha = 0.8 + neuron.activity * 0.2
        ctx.fillStyle = neuron.color
        ctx.shadowColor = neuron.color
        ctx.shadowBlur = neuron.activity * 15
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.size * (0.8 + neuron.activity * 0.4), 0, Math.PI * 2)
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-25" />
}
