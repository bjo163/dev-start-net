"use client"

import { useEffect, useState } from "react"
import { useIdleDetection } from "@/hooks/use-idle-detection"
import { useDesktopOnly } from "@/hooks/use-desktop-only"

export function StatusBars() {
  const [systemHealth, setSystemHealth] = useState(95)
  const [networkStatus, setNetworkStatus] = useState(87)
  const isIdle = useIdleDetection(10000) // 10 seconds
  const isDesktop = useDesktopOnly(1024) // Show on screens 1024px and above

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth((prev) => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 2)))
      setNetworkStatus((prev) => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 3)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const StatusBar = ({ label, value }: { label: string; value: number }) => (
    <div className="mb-2">
      <div className="flex justify-between text-xs font-mono text-cyan-400 mb-1">
        <span>{label}</span>
        <span>{value.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-800 h-1.5 border border-cyan-500/30">
        <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${value}%` }} />
      </div>
    </div>
  )

  // Don't render if not desktop
  if (!isDesktop) {
    return null
  }

  return (
    <div
      className={`fixed top-32 left-6 z-30 transition-all duration-500 ${
        isIdle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      }`}
    >
      <div className="bg-black/70 border border-cyan-500/40 rounded-lg p-3 backdrop-blur-sm w-40">
        <div className="text-cyan-400 text-xs font-mono mb-2 text-center">STATUS</div>
        <StatusBar label="SYSTEM" value={systemHealth} />
        <StatusBar label="NETWORK" value={networkStatus} />
      </div>
    </div>
  )
}
