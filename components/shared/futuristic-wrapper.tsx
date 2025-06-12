"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { HolographicLoader, AIAssistant } from "@/components/futuristic-effects"

interface FuturisticWrapperProps {
  children: React.ReactNode
  showLoader?: boolean
  showAI?: boolean
  className?: string
}

export function FuturisticWrapper({
  children,
  showLoader = true,
  showAI = true,
  className = "",
}: FuturisticWrapperProps) {
  const [isLoading, setIsLoading] = useState(showLoader)

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showLoader])

  return (
    <div className={`relative ${className}`}>
      {/* Futuristic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900" />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-tech-pattern animate-pulse" />
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Loading Effect */}
      <HolographicLoader isVisible={isLoading} />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* AI Assistant */}
      {showAI && <AIAssistant />}

      {/* Scan Line Effect */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-hologram-scan pointer-events-none z-50 opacity-30" />
    </div>
  )
}
