"use client"

import { useState, useCallback } from "react"

export function useSectionTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetSection, setTargetSection] = useState("")

  const navigateToSection = useCallback((sectionId: string, sectionName: string) => {
    // Start transition
    setTargetSection(sectionName)
    setIsTransitioning(true)

    // Complete transition after animation
    setTimeout(() => {
      // Smooth scroll to section
      const element = document.querySelector(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
      
      // End transition
      setTimeout(() => {
        setIsTransitioning(false)
        setTargetSection("")
      }, 500)
    }, 1500) // Total animation duration
  }, [])

  return {
    isTransitioning,
    targetSection,
    navigateToSection
  }
}
