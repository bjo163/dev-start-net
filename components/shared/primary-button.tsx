"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface PrimaryButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  href?: string
}

export function PrimaryButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
}: PrimaryButtonProps) {
  const baseClasses = "hud-button relative overflow-hidden group transition-all duration-300 flex items-center"

  const variants = {
    primary: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500",
    secondary: "bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 hover:border-cyan-500",
    outline: "bg-transparent hover:bg-cyan-500/10 border-cyan-500/50 hover:border-cyan-500",
  }

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }

  const Component = href ? "a" : "button"

  return (
    <Component href={href} onClick={onClick} className={cn(baseClasses, variants[variant], sizes[size], className)}>
      {/* Corner indicators */}
      <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-cyan-400 opacity-60"></div>
      <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-cyan-400 opacity-60"></div>
      <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-cyan-400 opacity-60"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-cyan-400 opacity-60"></div>

      {/* Content */}
      <span className="relative z-10 hud-font-primary flex items-center justify-center w-full">{children}</span>
    </Component>
  )
}
