"use client"

import { useEffect, useState } from "react"
import { useIdleDetection } from "@/hooks/use-idle-detection"
import { useDesktopOnly } from "@/hooks/use-desktop-only"

const terminalMessages = ["SYSTEM READY", "NEURAL NET ACTIVE", "ALL SYSTEMS NOMINAL", "STANDBY MODE"]

export function TerminalOverlay() {
  const [logs, setLogs] = useState<string[]>([])
  const isIdle = useIdleDetection(10000) // 10 seconds
  const isDesktop = useDesktopOnly(1024) // Show on screens 1024px and above

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = terminalMessages[Math.floor(Math.random() * terminalMessages.length)]
      const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false })

      setLogs((prev) => {
        const newLogs = [...prev, `[${timestamp}] ${randomMessage}`]
        return newLogs.slice(-3) // Keep only last 3 messages
      })
    }, 5000) // Slower updates

    return () => clearInterval(interval)
  }, [])

  // Don't render if not desktop
  if (!isDesktop) {
    return null
  }

  return (
    <div
      className={`fixed bottom-6 left-6 z-30 transition-all duration-500 ${
        isIdle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      }`}
    >
      <div className="bg-black/70 border border-cyan-500/40 rounded-lg p-2 backdrop-blur-sm w-64">
        <div className="text-cyan-400 text-xs font-mono mb-1 flex items-center">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 animate-pulse" />
          TERMINAL
        </div>
        <div className="space-y-1 max-h-16 overflow-hidden">
          {logs.map((log, index) => (
            <div key={index} className="text-cyan-300 text-xs font-mono opacity-70">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
