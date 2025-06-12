"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Holographic Loading Effect
export function HolographicLoader({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <div className="relative">
            <div className="w-32 h-32 border-4 border-blue-500/30 rounded-full animate-spin">
              <div
                className="absolute inset-2 border-4 border-purple-500/30 rounded-full animate-spin"
                style={{ animationDirection: "reverse" }}
              >
                <div className="absolute inset-2 border-4 border-cyan-500/30 rounded-full animate-spin">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// AI Assistant Simulation
export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: "ai", text: "Halo! Saya AI Assistant MyCocoLink. Ada yang bisa saya bantu?" },
  ])

  const responses = [
    "Saya dapat membantu Anda memilih paket internet yang tepat.",
    "Apakah Anda ingin mengecek ketersediaan layanan di area Anda?",
    "Saya dapat menjelaskan tentang teknologi fiber optic kami.",
    "Tim teknis kami siap membantu 24/7 untuk instalasi.",
  ]

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, { type: "user", text: message }])

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { type: "ai", text: randomResponse }])
    }, 1000)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">AI Assistant</h3>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto max-h-64">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-3 rounded-lg max-w-xs ${
                      msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <button
                  onClick={() => handleSendMessage("Info paket internet")}
                  className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 p-2 rounded"
                >
                  Info Paket
                </button>
                <button
                  onClick={() => handleSendMessage("Cek area layanan")}
                  className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 p-2 rounded"
                >
                  Cek Area
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Quantum Network Visualization
export function QuantumNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"][Math.floor(Math.random() * 4)],
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 100})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full min-h-[300px] bg-gray-900 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-xl font-bold mb-2">Quantum Network</h3>
          <p className="text-sm opacity-80">Real-time data visualization</p>
        </div>
      </div>
    </div>
  )
}

// Futuristic Progress Bar
export function FuturisticProgress({
  value,
  max = 100,
  label,
  color = "blue",
}: {
  value: number
  max?: number
  label: string
  color?: "blue" | "green" | "purple" | "red"
}) {
  const percentage = (value / max) * 100

  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    red: "from-red-500 to-orange-500",
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-gray-500">
          {value}/{max}
        </span>
      </div>
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} relative`}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
          <div className="absolute right-0 top-0 w-2 h-full bg-white/40 animate-ping" />
        </motion.div>
      </div>
    </div>
  )
}

// Sound Effect Simulation
export function SoundEffectSimulator() {
  const [isPlaying, setIsPlaying] = useState(false)

  const playSound = (type: string) => {
    setIsPlaying(true)
    // Simulate sound effect
    setTimeout(() => setIsPlaying(false), 500)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => playSound("click")}
        className={`p-2 rounded-full transition-all ${
          isPlaying ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9a3 3 0 000 6h4a1 1 0 001-1v-4a1 1 0 00-1-1H9z"
          />
        </svg>
      </button>
      {isPlaying && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="text-xs text-blue-600 font-medium"
        >
          🔊 Sound Effect
        </motion.div>
      )}
    </div>
  )
}

// VR/AR Preview Simulation
export function VRPreview() {
  const [isVRMode, setIsVRMode] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsVRMode(!isVRMode)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        {isVRMode ? "Exit VR Mode" : "VR Preview"}
      </button>

      <AnimatePresence>
        {isVRMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-12 left-0 w-80 h-48 bg-black rounded-lg border-4 border-purple-500 overflow-hidden"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                  <h3 className="text-lg font-bold">VR Network Tour</h3>
                  <p className="text-sm opacity-80">Experience our infrastructure</p>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
