"use client"

interface AudioVisualizerProps {
  isActive: boolean
  intensity?: number
}

export function AudioVisualizer({ isActive, intensity = 0.5 }: AudioVisualizerProps) {
  if (!isActive) return null

  // Predefined heights for consistency
  const baseHeights = [8, 12, 16, 10, 14]
  const baseDurations = [400, 450, 500, 420, 480]

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-1 bg-cyan-400 rounded-full data-stream-bar"
          style={{
            height: `${baseHeights[i] + (baseHeights[i] * intensity)}px`,
            animationDelay: `${i * 50}ms`,
            animationDuration: `${baseDurations[i]}ms`
          }}
        />
      ))}
    </div>
  )
}
