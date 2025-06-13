"use client"

import { useState, useEffect } from "react"

export function usePageLoader() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    let progress = 0
    const interval = setInterval(() => {
      // Simulate loading different aspects
      if (progress < 30) {
        // Initial DOM loading
        progress += Math.random() * 5 + 2
      } else if (progress < 60) {
        // Assets and images loading
        progress += Math.random() * 3 + 1
      } else if (progress < 90) {
        // Final rendering
        progress += Math.random() * 2 + 0.5
      } else {
        // Complete
        progress = 100
        clearInterval(interval)
        
        // Wait a bit before hiding loader
        setTimeout(() => {
          setIsPageLoading(false)
        }, 800)
      }
      
      setLoadProgress(Math.min(progress, 100))
    }, 50)

    // Also check for actual page load events
    const handleLoad = () => {
      // Ensure minimum loading time for UX
      setTimeout(() => {
        progress = Math.max(progress, 90)
      }, 1000)
    }

    const handleDOMContentLoaded = () => {
      progress = Math.max(progress, 70)
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
    }
  }, [])

  return { isPageLoading, loadProgress }
}
