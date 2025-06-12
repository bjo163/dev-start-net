"use client"

import { useEffect, useState } from "react"

export function ProgressIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-30">
      <div className="bg-black/80 border border-cyan-500/50 rounded-lg p-3 backdrop-blur-sm">
        <div className="text-cyan-400 text-xs font-mono mb-2 text-center">LOADING ASSETS</div>
        <div className="w-32 h-2 bg-gray-800 border border-cyan-500/30 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
        <div className="text-cyan-300 text-xs font-mono text-center mt-1">{progress}%</div>
      </div>
    </div>
  )
}
