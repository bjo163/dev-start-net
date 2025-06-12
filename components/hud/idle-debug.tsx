"use client"

import { useIdleDetection } from "@/hooks/use-idle-detection"
import { useDesktopOnly } from "@/hooks/use-desktop-only"

export function IdleDebug() {
  const isIdle = useIdleDetection(10000)
  const isDesktop = useDesktopOnly(1024)

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 border border-cyan-500 rounded p-2 text-xs font-mono text-cyan-400">
      <div>Desktop: {isDesktop ? "✅" : "❌"}</div>
      <div>Idle: {isIdle ? "✅" : "❌"}</div>
      <div>Screen: {typeof window !== "undefined" ? window.innerWidth : "SSR"}px</div>
    </div>
  )
}
