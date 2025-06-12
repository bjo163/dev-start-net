"use client"

import { useEffect, useState } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    const glitch = () => {
      if (Math.random() > 0.95) {
        const chars = text.split("")
        const randomIndex = Math.floor(Math.random() * chars.length)
        chars[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        setGlitchText(chars.join(""))

        setTimeout(() => setGlitchText(text), 100)
      }
    }

    const interval = setInterval(glitch, 100)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span
      className={`${className}`}
      style={{
        textShadow: Math.random() > 0.9 ? "2px 0 #ff0000, -2px 0 #00ffff" : "none",
      }}
    >
      {glitchText}
    </span>
  )
}
