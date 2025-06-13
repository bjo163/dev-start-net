"use client"

import { useEffect, useRef, useState } from "react"

// Holographic Scanner Effect
export function HolographicScanner({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-hologram-scan"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SCANNING NETWORK
          </div>
          <div className="flex space-x-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2 h-8 bg-blue-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <div className="text-sm text-gray-500">Analyzing connection quality...</div>
        </div>
      </div>
    </div>
  )
}

// Data Stream Visualization
export function DataStreamVisualization({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-data-stream"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-xl font-semibold mb-4">Data Transfer Rate</div>
          <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            1.2 GB/s
          </div>
          <div className="text-sm text-gray-500 mt-2">Real-time monitoring</div>
        </div>
      </div>
    </div>
  )
}

// Neural Network Pattern
export function NeuralNetworkPattern({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    const nodes = [
      { x: 50, y: 150, connections: [1, 2] },
      { x: 150, y: 100, connections: [3, 4] },
      { x: 150, y: 200, connections: [3, 4] },
      { x: 250, y: 75, connections: [5] },
      { x: 250, y: 125, connections: [5] },
      { x: 250, y: 175, connections: [5] },
      { x: 250, y: 225, connections: [5] },
      { x: 350, y: 150, connections: [] },
    ]

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "#3B82F6"
      ctx.lineWidth = 2
      nodes.forEach((node) => {
        node.connections.forEach((connectionIndex) => {
          const targetNode = nodes[connectionIndex]
          if (targetNode) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(targetNode.x, targetNode.y)
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node, index) => {
        const time = Date.now() * 0.001
        const pulse = Math.sin(time + index) * 0.5 + 0.5

        ctx.beginPath()
        ctx.arc(node.x, node.y, 8 + pulse * 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.7 + pulse * 0.3})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#FFFFFF"
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
    </div>
  )
}

// Glitch Effect Text
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <span className={`${isGlitching ? "animate-pulse" : ""}`}>{text}</span>
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-red-500 opacity-70"
            style={{ transform: "translate(-2px, -1px)" }}
          >
            {text}
          </span>
          <span className="absolute top-0 left-0 text-blue-500 opacity-70" style={{ transform: "translate(2px, 1px)" }}>
            {text}
          </span>
        </>
      )}
    </div>
  )
}

// Matrix Rain Effect (Lightweight)
export function MatrixRain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    const chars = "01"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    let animationFrame: number

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#3B82F6"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" />
      <div className="relative z-10 text-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          SECURE CONNECTION
        </div>
        <div className="text-sm text-gray-500 mt-2">256-bit encryption active</div>
      </div>
    </div>
  )
}

// Pulse Wave Effect
export function PulseWave({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      <div className="relative w-64 h-64">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-20 animate-ping"
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: "2s",
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-glow-pulse flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// Cyber Grid
export function CyberGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Grid Lines */}
          {[...Array(20)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 20}
              y1="0"
              x2={i * 20}
              y2="300"
              stroke="#3B82F6"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 20}
              x2="400"
              y2={i * 20}
              stroke="#3B82F6"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-xl font-bold mb-4">NETWORK GRID</div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 border border-blue-500 flex items-center justify-center animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
