"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"

// Futuristic Button with Hover Effect
export function FuturisticButton({
  children,
  href,
  variant = "primary",
  size = "default",
  className = "",
}: {
  children: React.ReactNode
  href: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "xl"
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
      case "secondary":
        return "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
      case "outline":
        return "border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
      case "ghost":
        return "text-blue-600 hover:bg-blue-50"
      default:
        return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-sm px-4 py-2"
      case "lg":
        return "text-lg px-8 py-4"
      case "xl":
        return "text-xl px-10 py-5"
      default:
        return "text-base px-6 py-3"
    }
  }

  return (
    <Link href={href}>
      <motion.div
        className={`relative overflow-hidden rounded-lg font-medium transition-all duration-300 ${getVariantStyles()} ${getSizeStyles()} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative z-10 flex items-center justify-center">
          {children}
          <ArrowRight
            className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
          />
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: isHovered ? "0%" : "-100%", opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  )
}

// Animated Feature Card
export function AnimatedFeatureCard({
  icon,
  title,
  description,
  color = "blue",
}: {
  icon: React.ReactNode
  title: string
  description: string
  color?: "blue" | "purple" | "green" | "red"
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getColorStyles = () => {
    switch (color) {
      case "blue":
        return {
          bgGradient: "from-blue-500 to-blue-600",
          borderColor: "border-blue-200",
          hoverBg: "group-hover:from-blue-600 group-hover:to-blue-700",
          glowColor: "group-hover:shadow-blue-500/25",
        }
      case "purple":
        return {
          bgGradient: "from-purple-500 to-purple-600",
          borderColor: "border-purple-200",
          hoverBg: "group-hover:from-purple-600 group-hover:to-purple-700",
          glowColor: "group-hover:shadow-purple-500/25",
        }
      case "green":
        return {
          bgGradient: "from-green-500 to-green-600",
          borderColor: "border-green-200",
          hoverBg: "group-hover:from-green-600 group-hover:to-green-700",
          glowColor: "group-hover:shadow-green-500/25",
        }
      case "red":
        return {
          bgGradient: "from-red-500 to-red-600",
          borderColor: "border-red-200",
          hoverBg: "group-hover:from-red-600 group-hover:to-red-700",
          glowColor: "group-hover:shadow-red-500/25",
        }
      default:
        return {
          bgGradient: "from-blue-500 to-blue-600",
          borderColor: "border-blue-200",
          hoverBg: "group-hover:from-blue-600 group-hover:to-blue-700",
          glowColor: "group-hover:shadow-blue-500/25",
        }
    }
  }

  const colorStyles = getColorStyles()

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border ${colorStyles.borderColor} bg-white p-6 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl ${colorStyles.glowColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${colorStyles.bgGradient} ${colorStyles.hoverBg} transition-colors duration-300 text-white`}
        >
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${colorStyles.bgGradient} transform transition-transform duration-300 ${
          isHovered ? "scale-x-100" : "scale-x-0"
        } origin-left`}
      ></div>

      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br from-white/5 to-white/10 blur-xl transition-transform duration-500 group-hover:scale-150"></div>
    </motion.div>
  )
}

// Animated Counter
export function AnimatedCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let startTime: number
            let animationFrameId: number

            const startAnimation = (timestamp: number) => {
              if (!startTime) startTime = timestamp
              const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
              setCount(Math.floor(progress * value))

              if (progress < 1) {
                animationFrameId = requestAnimationFrame(startAnimation)
              }
            }

            animationFrameId = requestAnimationFrame(startAnimation)

            return () => cancelAnimationFrame(animationFrameId)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (nodeRef.current) {
      observer.observe(nodeRef.current)
    }

    return () => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current)
      }
    }
  }, [value, duration])

  return (
    <div ref={nodeRef} className="text-center">
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-gray-600">{label}</div>
    </div>
  )
}

// Futuristic Pricing Card
export function FuturisticPricingCard({
  title,
  price,
  description,
  features,
  cta,
  popular = false,
  color = "blue",
}: {
  title: string
  price: string
  description: string
  features: string[]
  cta: { text: string; href: string }
  popular?: boolean
  color?: "blue" | "purple" | "green" | "red"
}) {
  const getColorStyles = () => {
    switch (color) {
      case "blue":
        return {
          bgGradient: "from-blue-500 to-blue-600",
          lightBg: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-600",
          hoverBg: "hover:from-blue-600 hover:to-blue-700",
        }
      case "purple":
        return {
          bgGradient: "from-purple-500 to-purple-600",
          lightBg: "bg-purple-50",
          borderColor: "border-purple-200",
          textColor: "text-purple-600",
          hoverBg: "hover:from-purple-600 hover:to-purple-700",
        }
      case "green":
        return {
          bgGradient: "from-green-500 to-green-600",
          lightBg: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-600",
          hoverBg: "hover:from-green-600 hover:to-green-700",
        }
      case "red":
        return {
          bgGradient: "from-red-500 to-red-600",
          lightBg: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-600",
          hoverBg: "hover:from-red-600 hover:to-red-700",
        }
      default:
        return {
          bgGradient: "from-blue-500 to-blue-600",
          lightBg: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-600",
          hoverBg: "hover:from-blue-600 hover:to-blue-700",
        }
    }
  }

  const colorStyles = getColorStyles()

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border-2 ${
        popular ? `border-gradient-to-r ${colorStyles.bgGradient}` : colorStyles.borderColor
      } bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${popular ? "shadow-lg" : ""} group`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {popular && (
        <div
          className={`absolute -right-12 top-6 w-40 transform rotate-45 bg-gradient-to-r ${colorStyles.bgGradient} py-1 text-center text-xs font-semibold text-white shadow-md`}
        >
          Populer
        </div>
      )}

      <div className={`p-6 ${colorStyles.lightBg}`}>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Hubungi Kami" && <span className="ml-1 text-gray-500">/bulan</span>}
        </div>
      </div>

      <div className="p-6">
        <ul className="mb-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={`mr-3 rounded-full p-1 ${colorStyles.lightBg}`}>
                <Check className={`h-4 w-4 ${colorStyles.textColor}`} />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link href={cta.href}>
          <Button
            className={`w-full bg-gradient-to-r ${colorStyles.bgGradient} ${colorStyles.hoverBg} text-white transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            {cta.text}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${colorStyles.bgGradient} transform transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left`}
      ></div>
    </motion.div>
  )
}

// Animated Stats Section
export function AnimatedStats() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <AnimatedCounter value={99.9} label="Uptime Jaringan" suffix="%" />
      <AnimatedCounter value={1000} label="Mbps Kecepatan" />
      <AnimatedCounter value={10000} label="Pelanggan Puas" suffix="+" />
      <AnimatedCounter value={24} label="Jam Support" suffix="/7" />
    </div>
  )
}

// Futuristic Tabs
export function FuturisticTabs({
  tabs,
  defaultTab,
  onChange,
}: {
  tabs: { id: string; label: string }[]
  defaultTab: string
  onChange: (id: string) => void
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = (id: string) => {
    setActiveTab(id)
    onChange(id)
  }

  return (
    <div className="relative flex space-x-1 rounded-lg bg-gray-100/50 backdrop-blur-sm p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`relative flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ${
            activeTab === tab.id ? "text-white" : "text-gray-700 hover:text-gray-900"
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
              layoutId="activeTab"
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center">
            {activeTab === tab.id && <Zap className="mr-1 h-4 w-4" />}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  )
}

// Animated Notification Badge
export function AnimatedNotificationBadge({ count = 1 }: { count?: number }) {
  return (
    <div className="relative">
      <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </div>
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
          >
            {count}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Futuristic Loading Spinner
export function FuturisticLoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8"
      case "lg":
        return "h-16 w-16"
      default:
        return "h-12 w-12"
    }
  }

  return (
    <div className={`relative ${getSizeStyles()}`}>
      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
      <div
        className="absolute inset-0 rounded-full border-4 border-transparent border-b-purple-600 animate-spin"
        style={{ animationDuration: "1.5s" }}
      ></div>
      <div className="absolute inset-2 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-blue-600 animate-ping"></div>
      </div>
    </div>
  )
}
