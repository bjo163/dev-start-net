"use client"

import { useEffect, useState } from "react"

export function MovingLines() {
  const [lines, setLines] = useState<{ id: number; top: number; width: number; delay: number; speed: number }[]>([])

  useEffect(() => {
    // Create 15 random lines
    const newLines = []
    for (let i = 0; i < 15; i++) {
      newLines.push({
        id: i,
        top: Math.random() * 100, // Random vertical position (%)
        width: 30 + Math.random() * 70, // Random width (%)
        delay: Math.random() * 5, // Random delay (s)
        speed: 5 + Math.random() * 10, // Random speed (s)
      })
    }
    setLines(newLines)
  }, [])

  return (
    <div className="moving-lines">
      {lines.map((line) => (
        <div
          key={line.id}
          className="moving-line"
          style={{
            top: `${line.top}%`,
            width: `${line.width}%`,
            animationDelay: `${line.delay}s`,
            animationDuration: `${line.speed}s`,
          }}
        />
      ))}
    </div>
  )
}
