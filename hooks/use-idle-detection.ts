"use client"

import { useState, useEffect } from "react"

export function useIdleDetection(idleTime = 10000) {
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    let idleTimer: NodeJS.Timeout | null = null

    // Function to reset the timer
    const resetTimer = () => {
      if (idleTimer) clearTimeout(idleTimer)

      setIsIdle(false)

      idleTimer = setTimeout(() => {
        setIsIdle(true)
        console.log("User is now idle")
      }, idleTime)
    }

    // Initial timer setup
    resetTimer()

    // Events that reset the timer
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click", "wheel"]

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer, { passive: true })
    })

    // Cleanup
    return () => {
      if (idleTimer) clearTimeout(idleTimer)
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer)
      })
    }
  }, [idleTime])

  return isIdle
}
