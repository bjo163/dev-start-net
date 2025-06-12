"use client"

import { useIdleDetection } from "@/hooks/use-idle-detection"
import { useDesktopOnly } from "@/hooks/use-desktop-only"

export function HUDFrame() {
  const isIdle = useIdleDetection(10000) // 10 seconds
  const isDesktop = useDesktopOnly(1024) // Show on screens 1024px and above

  // Don't render if not desktop
  if (!isDesktop) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-10 transition-all duration-500 ${
        isIdle ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Simplified corner frames - hanya di pojok */}
      <div className="absolute top-6 left-6">
        <div className="w-12 h-12 border-l-2 border-t-2 border-cyan-500/40" />
      </div>

      <div className="absolute top-6 right-6">
        <div className="w-12 h-12 border-r-2 border-t-2 border-cyan-500/40" />
      </div>

      <div className="absolute bottom-6 left-6">
        <div className="w-12 h-12 border-l-2 border-b-2 border-cyan-500/40" />
      </div>

      <div className="absolute bottom-6 right-6">
        <div className="w-12 h-12 border-r-2 border-b-2 border-cyan-500/40" />
      </div>

      {/* Minimal info panel */}
      <div className="absolute bottom-6 right-20">
        <div className="bg-black/50 border border-cyan-500/30 rounded px-2 py-1 backdrop-blur-sm">
          <div className="text-cyan-400 text-xs font-mono">ONLINE</div>
        </div>
      </div>
    </div>
  )
}
