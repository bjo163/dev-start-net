"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ElectricBorderProps {
  children: React.ReactNode
  className?: string
}

export function ElectricBorder({ children, className = "" }: ElectricBorderProps) {
  const borderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = borderRef.current
    if (!element) return

    const createSpark = () => {
      const spark = document.createElement("div")
      spark.className = "absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"

      // Random position on border
      const side = Math.floor(Math.random() * 4)
      switch (side) {
        case 0: // top
          spark.style.left = Math.random() * 100 + "%"
          spark.style.top = "0"
          break
        case 1: // right
          spark.style.right = "0"
          spark.style.top = Math.random() * 100 + "%"
          break
        case 2: // bottom
          spark.style.left = Math.random() * 100 + "%"
          spark.style.bottom = "0"
          break
        case 3: // left
          spark.style.left = "0"
          spark.style.top = Math.random() * 100 + "%"
          break
      }

      element.appendChild(spark)

      // Remove spark after animation
      setTimeout(() => {
        if (spark.parentNode) {
          spark.parentNode.removeChild(spark)
        }
      }, 1000)
    }

    const interval = setInterval(createSpark, 500 + Math.random() * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={borderRef}
      className={`relative border-2 border-cyan-500/50 ${className}`}
      style={{
        boxShadow: "0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)",
      }}
    >
      {children}
    </div>
  )
}
